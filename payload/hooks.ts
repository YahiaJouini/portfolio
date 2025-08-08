import { fetchRepoMeta } from "@/graphql/github-repo"
import { Project } from "@/payload-types"
import { CollectionBeforeChangeHook } from "payload"

export const populateProjectHook: CollectionBeforeChangeHook<Project> = async ({
   data,
   operation,
}) => {
   if ((operation === "create" || operation === "update") && data?.slug) {
      try {
         const repoMeta = await fetchRepoMeta(data.slug)
         if (!repoMeta) {
            console.log("github repo meta is null")
            return data
         }
         if (repoMeta.primaryLanguage) {
            data.primaryLanguage = repoMeta.primaryLanguage.name
            data.primaryLanguageColor = repoMeta.primaryLanguage.color
         }
         if (repoMeta.languages?.edges) {
            data.languages = repoMeta.languages.edges.map((edge) => ({
               name: edge.node.name,
               color: edge.node.color,
               size: edge.size,
            }))
         }
         if (repoMeta.topics?.nodes) {
            data.topics = repoMeta.topics.nodes.map((node) => ({
               name: node.topic.name,
            }))
         }
         data.public = !repoMeta.isPrivate
         data.createdAt = repoMeta.createdAt
      } catch (err) {
         console.error(`failed to repo meta project ${data.slug}:`, err)
         return data
      }
   }
   return data
}
