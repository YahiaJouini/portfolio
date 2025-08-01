import { Blog, Project } from "./payload-types"
import { SUPPORTED_LOCALES } from "./utils/constants"

// for details page
export type ProjectDetail = Project & {
   repoMeta?: RepoMeta
}

// for listing projects
export type ProjectList = Array<
   Pick<
      Project,
      | "id"
      | "title"
      | "slug"
      | "description"
      | "demoUrl"
      | "githubUrl"
      | "pinned"
      | "public"
      | "type"
      | "thumbnail"
   >
>

export type ProjectListWithLang = ProjectList[number] & {
   primaryLanguage: {
      name: string | null
      color: string | null
   }
}

export type RepoMeta = {
   createdAt: string
   primaryLanguage: {
      name: string | null
      color: string | null
   }
   languages: {
      edges: Array<{
         size: number
         node: {
            name: string
            color: string | null
         }
      }>
   }
   topics: {
      nodes: Array<{
         topic: {
            name: string
         }
      }>
   }
}

export type BlogList = Array<
   Pick<
      Blog,
      | "id"
      | "title"
      | "slug"
      | "description"
      | "thumbnail"
      | "author"
      | "createdAt"
   >
>

export type Locale = (typeof SUPPORTED_LOCALES)[number]
export type LocaleParams = { params: Promise<{ locale: Locale }> }

export type MergedTranslations = Record<Locale, Record<string, string>>
