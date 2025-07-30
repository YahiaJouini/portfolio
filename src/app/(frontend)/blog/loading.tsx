import { ParagraphSkeleton, TitleSkeleton } from "@/components/global/Skeletons"
import { BlogCardSkeleton } from "./_components/BlogCard"

export default function loading() {
   return (
      <div>
         <div className="mx-auto mb-12 max-w-3xl text-center">
            <TitleSkeleton className="mx-auto mb-8 h-9 w-3/4" />

            <ParagraphSkeleton lines={4} className="mx-auto" />
         </div>

         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[...new Array(8)].map((_, index) => (
               <BlogCardSkeleton key={index} />
            ))}
         </div>
      </div>
   )
}
