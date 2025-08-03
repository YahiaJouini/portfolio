import { RepoMeta } from "@/types"
import { GITHUB_API } from "@/utils/constants"
import { GITHUB_TOKEN } from "@/utils/env"

export async function fetchRepoMeta(name: string): Promise<RepoMeta | null> {
   const query = `
    query FetchRepoMeta($name: String!) {
      repository(owner: "YahiaJouini", name: $name) {
         createdAt
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
   })

   const data = await response.json()

   if (data.errors || !data.data?.repository) {
      console.warn(`Failed to fetch repo meta for ${name}:`, data.errors)
      return null
   }
   return data.data.repository
}
