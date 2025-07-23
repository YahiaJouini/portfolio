import { Project } from "@/messages/types"
import { Locale, Translation } from "@/messages/types/shared"

const translationCache = new Map<string, any>()
const projectCache = new Map<string, Project>()

export async function getTranslation<T>(
   locale: Locale,
   translation: Translation,
): Promise<T> {
   const key = `${locale}/${translation}`
   if (translationCache.has(key)) return translationCache.get(key)

   const mod = await import(`@/messages/${key}.ts`)
   translationCache.set(key, mod.default)
   return mod.default
}

// optimized function to get a project by slug
// it caches the projects to avoid multiple calls to getTranslation or filtering large arrays
export async function getProject(
   locale: Locale,
   slug: string,
): Promise<Project | undefined> {
   const projectKey = `${locale}/${slug}`

   if (projectCache.has(projectKey)) {
      return projectCache.get(projectKey)
   }

   const projects = await getTranslation<Array<Project>>(locale, "projects")

   projects.forEach((project) => {
      projectCache.set(`${locale}/${project.id}`, project)
   })

   return projectCache.get(projectKey)
}
