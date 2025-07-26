import { Project } from "@/messages/types"
import { GITHUB_TOKEN } from "@/utils/constants"

const GITHUB_API = "https://api.github.com/graphql"

export type ProjectWithLang = Project & {
   primaryLanguage: {
      name: string | null
      color: string | null
   }
}

export async function projectsWithLang(
   projects: Array<Project>,
): Promise<Array<ProjectWithLang>> {
   const query = `
      query {
         ${projects
            .map(
               (project, index) => `
            repo${index}: repository(owner: "YahiaJouini", name: "${project.id}") {
               primaryLanguage {
                  name
                  color
               }
            }
         `,
            )
            .join("\n")}
      }
 `

   try {
      const response = await fetch(GITHUB_API, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ query }),
         next: {
            revalidate: 3600,
            tags: ["github-repos"],
         },
      })

      const data = await response.json()

      if (data.errors) {
         return projects.map((project) => ({
            ...project,
            primaryLanguage: {
               name: null,
               color: null,
            },
         }))
      }

      return projects.map((project, index) => {
         const repoData = data?.data[`repo${index}`]
         return {
            ...project,
            primaryLanguage: {
               name: repoData?.primaryLanguage?.name || null,
               color: repoData?.primaryLanguage?.color || null,
            },
         }
      })
   } catch (error) {
      console.error("Failed to fetch GitHub languages:", error)

      return projects.map((project) => ({
         ...project,
         primaryLanguage: {
            name: null,
            color: null,
         },
      }))
   }
}

export type RepoMeta = {
   createdAt: string
   updatedAt: string
   isPrivate: boolean
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
export async function getRepoMeta(name: string): Promise<RepoMeta> {
   const query = `
    query GetRepoMeta($name: String!) {
      repository(owner: "YahiaJouini", name: $name) {
         createdAt
         updatedAt
         isPrivate
         primaryLanguage {
            name
            color
         }
         languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
            size
            node {
               name
               color
            }
            }
         }
         topics: repositoryTopics(first: 10) {
            nodes {
               topic {
                  name
               }
            }
         }
      }
    }
  `

   const response = await fetch(GITHUB_API, {
      method: "POST",
      headers: {
         Authorization: `Bearer ${GITHUB_TOKEN}`,
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         query,
         variables: { name },
      }),
      next: {
         revalidate: 3600,
         tags: ["github-repo", `repo-${name}`],
      },
   })

   const data = await response.json()

   if (data.errors) {
      throw new Error(JSON.stringify(data.errors))
   }

   return data.data.repository
}
