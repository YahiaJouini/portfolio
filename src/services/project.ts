import { getRepoMeta, RepoMeta } from "@/graphql/github-repo"
import { Locale } from "@/messages/types/shared"
import { ProjectList } from "@/types"
import config from "@payload-config"
import { getPayload, Payload } from "payload"
import { Project } from "../../payload-types"
import { LRUCache } from "./cache"

export type DetailedProject = Project & {
   repoMeta?: RepoMeta
}

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
   // 20 projects
   private static projectCache = new LRUCache<string, DetailedProject>(
      20,
      LRUCache.CACHE_TTL,
   )
   // 30 projects (5 pages of 6 projects each)
   private static projectsListCache = new LRUCache<string, ProjectList[]>(
      5,
      LRUCache.CACHE_TTL,
   )

   private static payloadInstance: Payload | null = null

   private static async getPayloadInstance(): Promise<Payload> {
      if (!this.payloadInstance) {
         this.payloadInstance = await getPayload({ config })
      }
      return this.payloadInstance
   }

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
      const payload = await this.getPayloadInstance()
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
   }): Promise<DetailedProject | undefined> {
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

         const detailedProject: DetailedProject = { ...project }
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
      const payload = await this.getPayloadInstance()
      const { docs: projects } = await payload.find({
         collection: "projects",
         limit: 6,
         page,
         locale,
         where: pinned ? { pinned: { equals: true } } : {},
         select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            demoUrl: true,
            githubUrl: true,
            pinned: true,
            public: true,
            type: true,
         },
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
