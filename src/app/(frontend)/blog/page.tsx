import { BlogService } from "@/services/blog"
import { getServerLocale } from "@/utils/server-locale"
import { BlogCard } from "./_components/BlogCard"

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
         <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="text-text-primary mb-6 text-5xl leading-tight font-bold">
               My <span className="text-accent-active">Tech</span> Corner
            </h1>
            <p className="text-text-secondary text-lg">
               A personal log of what I build, break, and learn. I write about
               web dev, backend systems, performance, real-world architecture,
               and random experiments with tools like Next.js, TypeScript, Go,
               and whatever else I&apos;m into. No filler—just the process, the
               wins, and the bugs.
            </p>
         </div>

         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.map((blog) => (
               <BlogCard key={blog.id} blog={blog} />
            ))}
         </div>
      </div>
   )
}
