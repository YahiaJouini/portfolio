import { Skeleton } from "@/components/ui/skeleton"
import { Blog } from "@/payload-types"
import { BlogList, Locale, MergedTranslations } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { memo } from "react"
import { BlogCard, BlogCardSkeleton } from "../../_components/BlogCard"

type Props = {
   locale: Locale
   slug: Blog["slug"]
}

const t = {
   en: {
      keepReading: "Keep Reading",
   },
   fr: {
      keepReading: "Continuez à lire",
   },
   ar: {
      keepReading: "تابع القراءة",
   },
} satisfies MergedTranslations

const fetchKeepReading = async (slug: string) => {
   const res = await fetch("/api/readings?slug=" + slug)
   if (!res.ok) throw new Error("Failed to fetch related blogs")
   return res.json()
}

function KeepReading({ locale, slug }: Props) {
   const { data, isLoading } = useQuery<BlogList>({
      queryKey: ["keepReading", slug],
      queryFn: () => fetchKeepReading(slug),
   })

   if (isLoading) {
      return <KeepReadingSkeleton />
   }

   if (!data || data.length === 0) return null

   return (
      <div className="flex flex-col gap-6">
         <h2 className="border-border-default border-b pb-3 text-2xl font-bold">
            {t[locale].keepReading}
         </h2>
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.map((blog) => (
               <BlogCard key={blog.id} locale={locale} data={blog} />
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
