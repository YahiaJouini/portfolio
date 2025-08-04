import { Blog, Media, Project } from "./payload-types"
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
      | "pinned"
   >
>

export type Locale = (typeof SUPPORTED_LOCALES)[number]
export type LocaleParams = { params: Promise<{ locale: Locale }> }

export type MergedTranslations = Record<Locale, Record<string, string>>

export type WebsiteSearch = {
   blogs: {
      docs: Pick<Blog, "title" | "slug" | "author">[]
   }
   projects: {
      docs: Pick<Project, "title" | "slug">[]
   }
}

export type DynamicMetaData = {
   title: string
   description: string
   image: Media | number | null | undefined
   author: string
   tags: string[]
   publishedTime: string
}
