import { fetchRepoMeta } from "@/graphql/github-repo"
import { Blog, Project } from "@/payload-types"
import { BlogService } from "@/services/blog"
import { ProjectService } from "@/services/project"
import { validLocale } from "@/utils/validate-locale"
import { revalidatePath } from "next/cache"
import {
   CollectionAfterChangeHook,
   CollectionAfterDeleteHook,
   CollectionBeforeChangeHook,
} from "payload"

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

export const clearCacheHook: CollectionAfterChangeHook<
   Project | Blog
> = async ({ doc, operation, req, collection }) => {
   if ((operation === "create" || operation === "update") && doc?.slug) {
      const collectionSlug = collection.slug
      const locale = req.locale
      try {
         if (collectionSlug === "projects") {
            ProjectService.clearProjectsListCache()
            ProjectService.clearProjectCache({
               slug: doc.slug,
               locale:
                  validLocale(locale) && locale !== "all" ? locale : undefined,
            })
            revalidatePath("/projects", "page")
         } else if (collectionSlug === "blog") {
            BlogService.clearCache()
            revalidatePath("/blogs", "page")
         }
         // because blogs and services both are displayed on home page
         revalidatePath("/", "page")
         console.log(`✅ ${collectionSlug} caches cleared successfully`)
      } catch (err) {
         console.error(`Failed to clear ${collectionSlug} caches:`, err)
      }
   }
}

export const clearCacheOnDeleteHook: CollectionAfterDeleteHook<
   Project | Blog
> = async ({ collection }) => {
   const collectionSlug = collection.slug
   try {
      if (collectionSlug === "projects") {
         ProjectService.clearProjectsListCache()
         revalidatePath("/projects", "page")
      } else if (collectionSlug === "blog") {
         BlogService.clearCache()
         revalidatePath("/blogs", "page")
      }
      revalidatePath("/", "page")
      console.log(`✅ ${collectionSlug} caches cleared successfully`)
   } catch (err) {
      console.error(`Failed to clear ${collectionSlug} caches:`, err)
   }
}
