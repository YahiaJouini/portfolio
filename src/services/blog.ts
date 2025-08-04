import { Blog } from "@/payload-types"
import { BlogList, Locale } from "@/types"
import { LOCALES_LENGTH } from "@/utils/constants"
import { LRUCache } from "./cache"
import { Orm } from "./orm"

export class BlogService {
   private static blogCache = new LRUCache<string, Blog>(
      5 * LOCALES_LENGTH,
      LRUCache.CACHE_TTL,
   )
   // 1 blog list because no need for pagination since it is a small dataset
   // accounting for different locales
   private static blogListCache = new LRUCache<string, BlogList>(
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

   private static async fetchBlogs(locale: Locale): Promise<BlogList> {
      const payload = await Orm.getPayloadInstance()

      const { docs: blogs } = await payload.find({
         collection: "blog",
         limit: 100,
         depth: 1,
         select: {
            author: true,
            createdAt: true,
            id: true,
            slug: true,
            description: true,
            thumbnail: true,
            title: true,
         },
         sort: ["pinned", "-createdAt"],
         locale,
      })
      return blogs
   }

   public static async getBlogs({
      locale,
      pinned = false,
   }: {
      locale: Locale
      pinned?: boolean
   }): Promise<BlogList> {
      const cacheKey = this.generateBlogListKey(locale)
      let blogs = this.blogListCache.get(cacheKey)
      if (!blogs) {
         try {
            blogs = await this.fetchBlogs(locale)
            this.blogListCache.set(cacheKey, blogs)
         } catch (err) {
            console.log(err)
            return []
         }
      }
      return pinned ? blogs.filter((blog) => blog.pinned) : blogs
   }

   // clear all cause it's a small dataset
   public static clearCache() {
      this.blogCache.clear()
      this.blogListCache.clear()
   }
}
