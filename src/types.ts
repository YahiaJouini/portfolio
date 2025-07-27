import { Project } from "../payload-types"
import { RepoMeta } from "./graphql/github-repo"

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
>

export type ProjectListWithLang = ProjectList & {
   primaryLanguage: {
      name: string | null
      color: string | null
   }
}
