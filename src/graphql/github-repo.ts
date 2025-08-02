import { PopulatedProject, RepoMeta } from "@/types"
import { GITHUB_API } from "@/utils/constants"
import { GITHUB_TOKEN } from "@/utils/env"

export async function populateFromRepoMeta(
   name: string,
): Promise<PopulatedProject | null> {
   const query = `
    query FetchRepoPrimaryLanguage($name: String!) {
      repository(owner: "YahiaJouini", name: $name) {
         createdAt
         isPrivate
         primaryLanguage {
            name
            color
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

   if (!response.ok) return null

   const json = await response.json()

   const repo = json?.data?.repository
   return repo ?? null
}

export async function fetchRepoMeta(name: string): Promise<RepoMeta | null> {
   const query = `
    query FetchRepoMeta($name: String!) {
      repository(owner: "YahiaJouini", name: $name) {
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

   try {
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
   } catch (error) {
      console.error(`Error fetching repo meta for ${name}:`, error)
      return null
   }
}
