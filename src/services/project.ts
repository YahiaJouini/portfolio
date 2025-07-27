import { getRepoMeta, RepoMeta } from "@/graphql/github-repo"
import { Locale } from "@/messages/types/shared"
import { Project } from "../../payload-types"
import config from "@payload-config"
import { getPayload } from "payload"

type CacheEntry<T> = {
   data: T
   timestamp: number
}

export class ProjectService {
   private static projectCache = new Map<string, CacheEntry<DetailedProject>>()

   // 24 hours in milliseconds
   private static readonly CACHE_TTL = 24 * 60 * 60 * 1000

   private static isCacheValid<T>(entry: CacheEntry<T>): boolean {
      return Date.now() - entry.timestamp < this.CACHE_TTL
   }

   private static getCachedProject(
      locale: Locale,
      slug: string,
   ): DetailedProject | undefined {
      const key = `${locale}/${slug}`
      const entry = this.projectCache.get(key)

      if (entry && this.isCacheValid(entry)) {
         return entry.data
      }

      // Remove expired entry
      if (entry) {
         this.projectCache.delete(key)
      }

      return undefined
   }

   private static setCachedProject(
      locale: Locale,
      slug: string,
      project: DetailedProject,
   ): DetailedProject {
      const key = `${locale}/${slug}`
      this.projectCache.set(key, {
         data: project,
         timestamp: Date.now(),
      })
      return project
   }

   private static async fetchProject(
      locale: Locale,
      slug: string,
   ): Promise<Project | undefined> {
      const payload = await getPayload({ config })
      const {
         docs: [project],
      } = await payload.find({
         collection: "projects",
         where: {
            slug: {
               equals: slug,
            },
         },
         limit: 1,
         locale: locale,
      })

      return project
   }

   static async getProject(
      locale: Locale,
      slug: string,
   ): Promise<DetailedProject | undefined> {
      // Check cache first
      const cachedProject = this.getCachedProject(locale, slug)
      if (cachedProject) {
         console.log("cache hit for", slug)
         return cachedProject
      }

      try {
         const [projectResult, repoMetaResult] = await Promise.allSettled([
            this.fetchProject(locale, slug),
            getRepoMeta(slug),
         ])
         const project =
            projectResult.status === "fulfilled" ? projectResult.value : null
         const repoMeta =
            repoMetaResult.status === "fulfilled" ? repoMetaResult.value : null

         if (!project) return undefined

         const result: DetailedProject = project
         if (repoMeta) {
            result.repoMeta = repoMeta
         }

         return this.setCachedProject(locale, slug, result)
      } catch (err) {
         console.error("Error fetching project:", err)
         return undefined
      }
   }

   static clearExpiredCache(): void {
      const now = Date.now()
      for (const [key, entry] of this.projectCache.entries()) {
         if (now - entry.timestamp >= this.CACHE_TTL) {
            this.projectCache.delete(key)
         }
      }
   }

   static clearCacheBySlug(slug: string): void {
      for (const key of this.projectCache.keys()) {
         if (key.endsWith(`/${slug}`)) {
            this.projectCache.delete(key)
         }
      }
   }
   static clearCacheBySlugAndLocale(locale: Locale, slug: string): void {
      const key = `${locale}/${slug}`
      this.projectCache.delete(key)
   }

   static clearSpecificCache({
      locale,
      slug,
   }: {
      locale?: Locale
      slug: string
   }): void {
      console.log("cache cleared for", slug, "locale:", locale)
      if (locale) {
         this.clearCacheBySlugAndLocale(locale, slug)
      } else {
         this.clearCacheBySlug(slug)
      }
   }
}

export type DetailedProject = Project & {
   repoMeta?: RepoMeta
}

export type CacheFn = {
   locale?: Locale
   slug: string
}
