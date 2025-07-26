import { getRepoMeta, RepoMeta } from "@/graphql/github-repo"
import { Locale } from "@/messages/types/shared"
import { payload } from "@payload-config"
import { Project } from "../../payload-types"

export class ProjectService {
   private static readmeCache = new Map<string, string>()
   private static projectCache = new Map<string, Project>()

   // optimized function to get a project by slug
   // it caches the projects to avoid multiple calls to getTranslation or filtering large arrays
   static async getProject(
      locale: Locale,
      slug: string,
   ): Promise<Project | undefined> {
      const key = `${locale}/${slug}`

      if (this.projectCache.has(key)) {
         return this.projectCache.get(key)
      }

      const project = await payload.findByID({
         collection: "projects",
         id: slug,
      })
      this.projectCache.set(`${locale}/${project.id}`, project)

      return this.projectCache.get(key)
   }

   // gets repository info + static info
   static async getProjectWithMeta(
      locale: Locale,
      slug: string,
   ): Promise<DetailedProject | null> {
      try {
         const [projectResult, repoMetaResult] = await Promise.allSettled([
            this.getProject(locale, slug),
            getRepoMeta(slug),
         ])

         const project =
            projectResult.status === "fulfilled" ? projectResult.value : null
         const repoMeta =
            repoMetaResult.status === "fulfilled" ? repoMetaResult.value : null

         if (!project) return null

         const result: DetailedProject = {
            ...project,
         }
         if (repoMeta) {
            result.repoMeta = repoMeta
         }
         return result
      } catch {
         return null
      }
   }
}

export type DetailedProject = Project & {
   repoMeta?: RepoMeta
}
