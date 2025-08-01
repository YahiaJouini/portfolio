import { Skeleton } from "@/components/ui/skeleton"
import { Blog } from "@/payload-types"
import { BlogList } from "@/types"
import { memo, useEffect, useState } from "react"
import { BlogCard, BlogCardSkeleton } from "../../_components/BlogCard"

function KeepReading({ slug }: { slug: Blog["slug"] }) {
   const [data, setData] = useState<BlogList | null>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchReading = async () => {
         const response = await fetch("/api/readings?slug=" + slug)
         const data = await response.json()
         return data
      }

      fetchReading()
         .then((data) => {
            if (data && data.length > 0) {
               setData(data)
            }
         })
         .finally(() => {
            setLoading(false)
         })
   }, [slug])

   if (loading) {
      return <KeepReadingSkeleton />
   }

   if (!data || data.length === 0) return null

   return (
      <div className="flex flex-col gap-6">
         <h2 className="border-border-default border-b pb-3 text-2xl font-bold">
            Keep Reading
         </h2>
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.map((blog) => (
               <BlogCard key={blog.id} blog={blog} />
            ))}
         </div>
      </div>
   )
}

export default memo(KeepReading)

function KeepReadingSkeleton() {
   return (
      <div className="flex flex-col gap-6">
         <div className="border-border-default border-b pb-3">
            <Skeleton className="h-8 w-40" />
         </div>

         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
               <BlogCardSkeleton key={index} />
            ))}
         </div>
      </div>
   )
}
