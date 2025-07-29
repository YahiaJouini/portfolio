import { Project } from "./payload-types"

// for details page
export type ProjectDetail = Project & {
   repoMeta?: RepoMeta
}

// for listing projects
export type ProjectList = Pick<
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

export type ProjectListWithLang = ProjectList & {
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
