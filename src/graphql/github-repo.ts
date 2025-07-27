import { LRUCache } from "@/services/cache"
import { ProjectList, ProjectListWithLang, RepoMeta } from "@/types"
import { GITHUB_API, GITHUB_TOKEN } from "@/utils/constants"

export async function projectsWithLang(
   projects: Array<ProjectList>,
): Promise<Array<ProjectListWithLang>> {
   // sort so if the order changes the cache is still valid
   const cacheKey = projects
      .map((project) => project.slug)
      .sort()
      .join("-")

   const query = `
      query {
         ${projects
            .map(
               (project, index) => `
            repo${index}: repository(owner: "YahiaJouini", name: "${project.slug}") {
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
            revalidate: LRUCache.CACHE_TTL / 1000, // divide by 1000 to convert to seconds
            tags: ["github-repos", `projects-${cacheKey}`],
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

export async function getRepoMeta(name: string): Promise<RepoMeta> {
   const query = `
    query GetRepoMeta($name: String!) {
      repository(owner: "YahiaJouini", name: $name) {
         createdAt
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
         tags: ["github-repos", `repo-${name}`],
      },
   })

   const data = await response.json()

   if (data.errors) {
      throw new Error(JSON.stringify(data.errors))
   }

   if (!data.data?.repository) {
      throw new Error(`Repository "${name}" not found`)
   }

   return data.data.repository
}
