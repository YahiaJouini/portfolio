import { getRepoMeta, RepoMeta } from "@/graphql/github-repo"
import { Project } from "@/messages/types"
import { Locale } from "@/messages/types/shared"
import { getTranslation } from "@/utils/get-translation"
import fs from "fs/promises"
import path from "path"

export class ProjectService {
   private static readmeCache = new Map<string, string>()
   private static projectCache = new Map<string, Project>()

   static async getReadMe(
      name: Project["id"],
      locale: Locale,
   ): Promise<string> {
      const key = `${name}-${locale}`

      if (this.readmeCache.has(key)) {
         return this.readmeCache.get(key)!
      }

      const filePath = path.join(
         process.cwd(),
         "src/messages/markdown",
         name,
         `${locale}.md`,
      )

      try {
         const content = await fs.readFile(filePath, "utf-8")
         this.readmeCache.set(key, content)
         return content
      } catch {
         return `# ${name}\n\nNo documentation available.`
      }
   }

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

      const projects = await getTranslation<Array<Project>>(locale, "projects")

      projects.forEach((project) => {
         this.projectCache.set(`${locale}/${project.id}`, project)
      })

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

         const readme = await this.getReadMe(project.id, locale)

         const result: DetailedProject = {
            ...project,
            readme,
         }
         if (repoMeta) {
            console.log(repoMeta)
            result.repoMeta = repoMeta
         }
         return result
      } catch {
         return null
      }
   }
}

export type DetailedProject = Project & {
   readme: string
   repoMeta?: RepoMeta
}
