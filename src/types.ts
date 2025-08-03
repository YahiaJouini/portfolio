import { Blog, Project } from "./payload-types"
import { SUPPORTED_LOCALES } from "./utils/constants"

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
      | "primaryLanguage"
      | "primaryLanguageColor"
   >
>

export type RepoMeta = {
   createdAt: string
   isPrivate: boolean
   primaryLanguage: {
      name: string
      color: string
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
