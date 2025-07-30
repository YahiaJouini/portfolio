import { Blog } from "@/payload-types"
import { Orm } from "./orm"
import { LRUCache } from "./cache"
import { BlogList, Locale } from "@/types"
import { LOCALES_LENGTH } from "@/utils/constants"

export class BlogService {
   private static blogCache = new LRUCache<string, Blog>(
      5 * LOCALES_LENGTH,
      LRUCache.CACHE_TTL,
   )
   // 1 blog list because no need for pagination since it is a small collection
   // accounting for different locales
   private static blogListCache = new LRUCache<string, BlogList[]>(
      1 * LOCALES_LENGTH,
      LRUCache.CACHE_TTL,
   )

   private static generateBlogKey(slug: string, locale: Locale): string {
      return `Blog:${locale}:${slug}`
   }

   private static generateBlogListKey(locale: Locale): string {
      return `BlogList:${locale}`
   }

   private static async fetchBlog(
      slug: string,
      locale: Locale,
   ): Promise<Blog | undefined> {
      const payload = await Orm.getPayloadInstance()
      const {
         docs: [blog],
      } = await payload.find({
         collection: "blog",
         where: {
            slug: {
               equals: slug,
            },
         },
         limit: 1,
         locale,
      })

      return blog
   }

   public static async getBlog({
      slug,
      locale,
   }: {
      slug: string
      locale: Locale
   }) {
      const cacheKey = this.generateBlogKey(slug, locale)
      const cachedBlog = this.blogCache.get(cacheKey)
      if (cachedBlog) {
         return cachedBlog
      }
      try {
         const blog = await this.fetchBlog(slug, locale)
         if (blog) {
            this.blogCache.set(cacheKey, blog)
         }
         return blog
      } catch (err) {
         console.log(err)
         return undefined
      }
   }

   public static async getBlogList({
      locale,
   }: {
      locale: Locale
   }): Promise<BlogList[] | undefined> {
      const cacheKey = this.generateBlogListKey(locale)
      const cachedBlogList = this.blogListCache.get(cacheKey)
      if (cachedBlogList) {
         return cachedBlogList
      }
      try {
         const payload = await Orm.getPayloadInstance()

         const values: Record<keyof BlogList, boolean> = {
            author: true,
            createdAt: true,
            id: true,
            slug: true,
            description: true,
            thumbnail: true,
            title: true,
         }
         const { docs: blogList } = await payload.find({
            collection: "blog",
            limit: 100,
            depth: 1,
            // use as any because select requires a different type
            // but we know it is safe to use this select
            select: values as any,
            sort: "-createdAt",
            locale,
         })

         this.blogListCache.set(cacheKey, blogList)
         return blogList
      } catch (err) {
         console.log(err)
         return undefined
      }
   }
}
