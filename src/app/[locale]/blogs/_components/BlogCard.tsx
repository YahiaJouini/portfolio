import ImageLoader from "@/components/global/ImageLoader"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "@/i18n/navigation"
import type { BlogList, Locale, MergedTranslations } from "@/types"
import { readableISO } from "@/utils/format-date"
import { Calendar } from "lucide-react"
import { FaLongArrowAltRight } from "react-icons/fa"

type Props = {
   locale: Locale
   data: BlogList[number]
}

const t = {
   en: {
      readMore: "Read more",
   },
   fr: {
      readMore: "Lire la suite",
   },
   ar: {
      readMore: "اقرأ أكثر",
   },
} satisfies MergedTranslations
export function BlogCard({ locale, data }: Props) {
   return (
      <Link
         href={`/blogs/${data.slug}`}
         className="group bg-primary border-border-default hover:border-accent-border overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg"
      >
         {typeof data.thumbnail !== "number" && (
            <div className="relative aspect-video w-full overflow-hidden">
               <ImageLoader
                  src={data.thumbnail.url}
                  alt={data.thumbnail.alt}
                  fill
                  className="w-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
         )}

         <div className="p-6">
            <div className="text-text-secondary mb-3 flex items-center gap-2 text-sm">
               <Calendar className="h-4 w-4" />
               {readableISO(data.createdAt)}
            </div>

            <h2 className="text-text-primary group-hover:text-text-link mb-3 line-clamp-2 text-xl font-semibold transition-colors duration-200">
               {data.title}
            </h2>

            <p className="text-text-secondary mb-4 line-clamp-3 text-sm leading-relaxed">
               {data.description}
            </p>

            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="bg-secondary flex h-8 w-8 items-center justify-center rounded-full">
                     <span className="text-text-primary text-xs font-medium">
                        {data.author.name.charAt(0).toUpperCase()}
                     </span>
                  </div>
                  <div>
                     <p className="text-text-primary text-sm font-medium">
                        {data.author.name}
                     </p>
                     <p className="text-text-secondary text-xs">
                        {data.author.role}
                     </p>
                  </div>
               </div>

               <span className="text-text-link group-hover:text-accent-active flex items-center gap-1 text-sm font-medium transition-colors duration-200">
                  {t[locale].readMore}{" "}
                  <FaLongArrowAltRight className="rtl:rotate-180" />
               </span>
            </div>
         </div>
      </Link>
   )
}

export function BlogCardSkeleton() {
   return (
      <div className="group bg-primary border-border-default overflow-hidden rounded-xl border">
         <div className="relative aspect-video w-full overflow-hidden">
            <Skeleton className="h-full w-full" />
         </div>

         <div className="p-6">
            <div className="mb-3 flex items-center gap-2">
               <Skeleton className="h-4 w-4" />
               <Skeleton className="h-4 w-24" />
            </div>

            <div className="mb-3 space-y-2">
               <Skeleton className="h-6 w-full" />
               <Skeleton className="h-6 w-3/4" />
            </div>

            <div className="mb-4 space-y-2">
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                     <Skeleton className="h-4 w-20" />
                     <Skeleton className="h-3 w-16" />
                  </div>
               </div>
               <Skeleton className="h-4 w-20" />
            </div>
         </div>
      </div>
   )
}
