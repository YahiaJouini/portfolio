import { Project } from "@/messages/types"
import { GITHUB_TOKEN } from "@/utils/constants"
import axios from "axios"

const GITHUB_API = "https://api.github.com/graphql"

export async function projectsWithLang(projects: Array<Project>) {
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
      const { data } = await axios.post(
         GITHUB_API,
         { query },
         {
            headers: {
               Authorization: `Bearer ${GITHUB_TOKEN}`,
               "Content-Type": "application/json",
            },
            timeout: 10000,
         },
      )

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
export async function getRepoMeta(name: string) {
   const query = `
    query GetRepoMeta($name: String!) {
      repository(owner: "YahiaJouini", name: $name) {
        name
        createdAt
        updatedAt
        isPrivate
        primaryLanguage {
          name
          color
        }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
    }
  `

   const { data } = await axios.post(
      GITHUB_API,
      {
         query,
         variables: { name },
      },
      {
         headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
         },
      },
   )

   if (data.errors) {
      throw new Error(JSON.stringify(data.errors))
   }

   return data.data.repository
}
