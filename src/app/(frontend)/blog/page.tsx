import { BlogService } from "@/services/blogs"
import { getServerLocale } from "@/utils/server-locale"
import Link from "next/link"

export default async function page() {
   const locale = await getServerLocale()
   const data = await BlogService.getBlogList({ locale })
   if (!data || data.length === 0) {
      return (
         <div className="mx-auto w-full max-w-4xl">
            <h1 className="text-2xl font-bold">No Blogs Found</h1>
            <p className="text-text-secondary mt-2">
               There are currently no blogs available.
            </p>
         </div>
      )
   }
   return (
      <div>
         {data.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.id}>
               {blog.title}
            </Link>
         ))}
      </div>
   )
}
