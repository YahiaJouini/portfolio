import { ParagraphSkeleton, TitleSkeleton } from "@/components/global/Skeletons"
import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
   return (
      <div className="flex w-full flex-col gap-12">
         {/* Hero Section */}
         <div className="mb-8 flex flex-col gap-6 text-center md:mb-12">
            <div className="mx-auto w-full max-w-3xl space-y-4">
               {/* Title skeleton */}
               <div className="space-y-2">
                  <TitleSkeleton className="mx-auto h-7 w-full md:h-8" />
                  <TitleSkeleton className="mx-auto h-7 w-3/4 md:h-8" />
               </div>
               {/* Description skeleton */}
               <div className="mx-auto space-y-2 pt-2">
                  <ParagraphSkeleton lines={3} className="mx-auto" />
               </div>
            </div>
            {/* Thumbnail skeleton */}
            <div className="border-border-default relative aspect-video w-full overflow-hidden rounded-lg border">
               <Skeleton className="h-full w-full" />
            </div>
         </div>

         <div className="flex gap-10">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
               {/* Mobile TOC skeleton */}
               <div className="mb-6 block lg:hidden">
                  <Skeleton className="h-10 w-full rounded-lg" />
               </div>

               <div className="space-y-8">
                  {Array.from({ length: 4 }).map((_, index) => (
                     <div key={index} className="space-y-4">
                        <TitleSkeleton className="h-7 w-2/3 md:h-8" />

                        <div className="space-y-3">
                           <ParagraphSkeleton lines={4} />
                        </div>
                     </div>
                  ))}
               </div>

               <div className="mt-8 flex w-full flex-col md:mt-12">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="mt-3 h-[2px] w-full" />
                  <div className="mt-6 flex items-center gap-4">
                     <Skeleton className="h-[80px] w-[80px] rounded-full md:h-[120px] md:w-[120px]" />
                     <div className="flex flex-col space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-32" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Section */}
            <div className="hidden w-[350px] lg:block">
               <div className="space-y-6">
                  {/* TOC skeleton */}
                  <div className="space-y-4">
                     <TitleSkeleton className="h-6 w-32" />
                     <ParagraphSkeleton lines={5} />
                  </div>

                  {/* Tags skeleton */}
                  <div className="space-y-4">
                     <Skeleton className="h-6 w-20" />
                     <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                           <Skeleton
                              key={index}
                              className="h-6 w-16 rounded-full"
                           />
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Keep Reading section skeleton */}
         <div className="flex flex-col gap-6">
            <div className="border-border-default border-b pb-3">
               <Skeleton className="h-8 w-40" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
               {Array.from({ length: 4 }).map((_, index) => (
                  <div
                     key={index}
                     className="group bg-primary border-border-default overflow-hidden rounded-xl border"
                  >
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
               ))}
            </div>
         </div>
      </div>
   )
}
