import { ListedProject, Locale } from "@/types"
import { ITEMS_PER_PAGE, LOCALES_LENGTH } from "@/utils/constants"
import { PaginatedDocs } from "payload"
import { Project } from "../payload-types"
import { LRUCache } from "./cache"
import { Orm } from "./orm"

export type CacheFn = {
   locale?: Locale
   slug: string
}

type ProjectsOptions = {
   pinned: boolean
   locale: Locale
   page: number
}

type FetchProjectsParams = {
   page: number
   locale: Locale
   fields?: Partial<Record<keyof ListedProject, boolean>>
}

export class ProjectService {
   // 7 projects (accounting for different locales)
   private static projectCache = new LRUCache<string, Project>(
      7 * LOCALES_LENGTH,
      LRUCache.CACHE_TTL,
   )
   // 2 pages of 4 projects each (8 projects total for each locale)
   private static projectsListCache = new LRUCache<
      string,
      PaginatedDocs<ListedProject>
   >(2 * LOCALES_LENGTH, LRUCache.CACHE_TTL)

   private static generateProjectKey(slug: string, locale: Locale): string {
      return `Project:${locale}:${slug}`
   }

   private static generateProjectsListKey(
      page: number,
      locale: Locale,
   ): string {
      return `Projects:${locale}:${page}`
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
         locale,
      })

      return project
   }

   static async getProject({
      locale,
      slug,
   }: {
      locale: Locale
      slug: string
   }): Promise<Project | undefined> {
      const cacheKey = this.generateProjectKey(slug, locale)
      // check cache first
      const cachedProject = this.projectCache.get(cacheKey)
      if (cachedProject) return cachedProject
      try {
         const project = await this.fetchProject(slug, locale)

         if (!project) return undefined

         this.projectCache.set(cacheKey, project)
         return project
      } catch (err) {
         console.error("Error fetching project:", err)
         return undefined
      }
   }

   private static async fetchProjects({
      page,
      locale,
      fields = {
         id: true,
         slug: true,
         description: true,
         thumbnail: true,
         title: true,
         demoUrl: true,
         githubUrl: true,
         pinned: true,
         public: true,
         primaryLanguage: true,
         primaryLanguageColor: true,
      },
   }: FetchProjectsParams): Promise<PaginatedDocs<ListedProject>> {
      const payload = await Orm.getPayloadInstance()

      const data = await payload.find({
         collection: "projects",
         limit: ITEMS_PER_PAGE,
         page,
         locale,
         pagination: true,
         // use as any because select requires a different type
         // but we know it is safe to use this select
         select: fields as any,
         depth: 1,
         // sort by pinned so don't have to fetch homepage data while still caching all projects
         sort: ["pinned", "-createdAt"],
      })
      return data
   }

   static async getProjects({
      page = 1,
      pinned = false,
      locale,
   }: ProjectsOptions): Promise<PaginatedDocs<ListedProject> | null> {
      // check cache first
      const cacheKey = this.generateProjectsListKey(page, locale)
      let paginatedProjects = this.projectsListCache.get(cacheKey)

      if (!paginatedProjects) {
         try {
            paginatedProjects = await this.fetchProjects({ page, locale })
            this.projectsListCache.set(cacheKey, paginatedProjects)
         } catch (err) {
            console.error("Error fetching projects:", err)
            return null
         }
      }

      if (pinned) {
         const filteredDocs = paginatedProjects.docs.filter(
            (project) => project.pinned,
         )
         return {
            ...paginatedProjects,
            docs: filteredDocs,
            totalDocs: filteredDocs.length,
         }
      }

      return paginatedProjects
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
      console.log("cleared projects list cache")
      this.projectsListCache.clear()
   }

   static clearAllCache(): void {
      this.projectCache.clear()
      this.projectsListCache.clear()
      console.log("Cleared all cache")
   }
}
