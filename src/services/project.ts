import { getRepoMeta } from "@/graphql/github-repo"
import { Locale } from "@/types"
import { ProjectDetail, ProjectList } from "@/types"
import { Project } from "../payload-types"
import { LRUCache } from "./cache"
import { Orm } from "./orm"
import { LOCALES_LENGTH } from "@/utils/constants"

export type CacheFn = {
   locale?: Locale
   slug: string
}

type ProjectsOptions = {
   pinned: boolean
   locale: Locale
   page: number
}

export class ProjectService {
   // 7 projects (accounting for different locales)
   private static projectCache = new LRUCache<string, ProjectDetail>(
      7 * LOCALES_LENGTH,
      LRUCache.CACHE_TTL,
   )
   // 2 pages of 6 projects each (12 projects total for each locale)
   private static projectsListCache = new LRUCache<string, ProjectList[]>(
      2 * LOCALES_LENGTH,
      LRUCache.CACHE_TTL,
   )

   private static generateProjectKey(slug: string, locale: Locale): string {
      return `${locale}:${slug}`
   }

   private static generateProjectsListKey(
      page: number,
      pinned: boolean,
      locale: Locale,
   ): string {
      return `${locale}:${pinned ? "pinned" : "all"}:${page}`
   }

   private static async fetchProject(
      slug: string,
      locale: Locale,
   ): Promise<Project | undefined> {
      const payload = await Orm.getPayloadInstance()
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

   static async getProject({
      locale,
      slug,
   }: {
      locale: Locale
      slug: string
   }): Promise<ProjectDetail | undefined> {
      const cacheKey = this.generateProjectKey(slug, locale)
      // check cache first
      const cachedProject = this.projectCache.get(cacheKey)
      if (cachedProject) return cachedProject
      try {
         const [projectResult, repoMetaResult] = await Promise.allSettled([
            this.fetchProject(slug, locale),
            getRepoMeta(slug),
         ])
         const project =
            projectResult.status === "fulfilled" ? projectResult.value : null
         const repoMeta =
            repoMetaResult.status === "fulfilled" ? repoMetaResult.value : null

         if (!project) return undefined

         const detailedProject: ProjectDetail = { ...project }
         if (repoMeta) {
            detailedProject.repoMeta = repoMeta
         }

         this.projectCache.set(cacheKey, detailedProject)
         return detailedProject
      } catch (err) {
         console.error("Error fetching project:", err)
         return undefined
      }
   }

   // depth 1 to speed up queries since we don't need nested data
   private static async fetchProjects(
      page: number,
      pinned = false,
      locale: Locale,
   ): Promise<ProjectList[]> {
      const payload = await Orm.getPayloadInstance()

      const values: Record<keyof ProjectList, boolean> = {
         id: true,
         slug: true,
         description: true,
         thumbnail: true,
         title: true,
         demoUrl: true,
         githubUrl: true,
         pinned: true,
         public: true,
         type: true,
      }

      const { docs: projects } = await payload.find({
         collection: "projects",
         limit: 6,
         page,
         locale,
         where: pinned ? { pinned: { equals: true } } : {},
         // use as any because select requires a different type
         // but we know it is safe to use this select
         select: values as any,
         depth: 1,
         sort: "-createdAt",
      })
      return projects
   }

   static async getProjects({
      page = 1,
      pinned = false,
      locale,
   }: ProjectsOptions): Promise<ProjectList[]> {
      const cacheKey = this.generateProjectsListKey(page, pinned, locale)

      // check cache first
      const cachedProjects = this.projectsListCache.get(cacheKey)
      if (cachedProjects) return cachedProjects

      try {
         const projects = await this.fetchProjects(page, pinned, locale)
         this.projectsListCache.set(cacheKey, projects)
         return projects
      } catch (err) {
         console.error("Error fetching projects:", err)
         return []
      }
   }

   // cache clearing
   static clearProjectCache({ slug, locale }: CacheFn): void {
      if (locale) {
         const key = this.generateProjectKey(slug, locale)
         this.projectCache.delete(key)
      } else {
         this.projectCache.clear()
         console.log(`Cleared all project cache`)
      }
   }

   static clearProjectsListCache(): void {
      this.projectsListCache.clear()
   }

   static clearAllCache(): void {
      this.projectCache.clear()
      this.projectsListCache.clear()
      console.log("Cleared all cache")
   }
}
