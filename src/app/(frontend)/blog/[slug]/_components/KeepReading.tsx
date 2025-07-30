import { BlogList } from "@/types"
import { memo, useEffect, useState } from "react"
import { BlogCard } from "../../_components/BlogCard"
import { Blog } from "@/payload-types"

function KeepReading({ slug }: { slug: Blog["slug"] }) {
   console.log("rendered")
   const [data, setData] = useState<BlogList | null>(null)
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      const fetchReading = async () => {
         setLoading(true)
         const response = await fetch("/api/readings")
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
   }, [])

   if (loading) {
      return (
         <div className="flex h-64 items-center justify-center">
            <p className="text-text-secondary">Loading...</p>
         </div>
      )
   }
   const filteredData = data?.filter((blog) => blog.slug !== slug)

   if (!filteredData || filteredData.length === 0) return null
   return (
      <div className="flex flex-col gap-6">
         <h2 className="border-border-default border-b pb-3 text-2xl font-bold">
            Keep Reading
         </h2>
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredData.map((blog) => (
               <BlogCard key={blog.id} blog={blog} />
            ))}
         </div>
      </div>
   )
}

export default memo(KeepReading)
