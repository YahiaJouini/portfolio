import Seperator from "@/components/global/Seperator"
import {
   ParagraphSkeleton,
   TitleSkeleton,
   UnorderedListSkeleton,
} from "@/components/global/Skeletons"
import { Skeleton } from "@/components/ui/skeleton"

const RightSectionSkeleton = () => (
   <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-3">
         <div>
            <Skeleton className="mb-4 h-5 w-16" />
            <Skeleton className="mb-1.5 h-3.5 w-full" />
            <Skeleton className="mb-1.5 h-3.5 w-full" />
            <Skeleton className="mb-1.5 h-3.5 w-full" />
            <Skeleton className="h-3.5 w-3/4" />
         </div>

         {/* Topics/Tags */}
         <div className="flex flex-wrap items-center gap-2">
            {[...Array(8)].map((_, index) => (
               <Skeleton key={index} className="h-5 w-24 rounded-md" />
            ))}
         </div>

         {/* Roles */}
         <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
         </div>
      </div>

      {/* Separator */}
      <Seperator className="mb-4" />

      {/* Summary Section */}
      <div>
         <Skeleton className="mb-2 h-4 w-32" />
         <div className="flex flex-col items-start gap-2">
            {[1, 2, 3].map((item) => (
               <div key={item}>
                  <Skeleton className="mb-3 h-4 w-56" />
                  <div className="flex flex-wrap gap-1">
                     <Skeleton className="h-3 w-12" />
                     <Skeleton className="h-3 w-16" />
                     <Skeleton className="h-3 w-10" />
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Separator */}
      <Seperator className="mb-4" />

      {/* Languages Section */}
      <div>
         <Skeleton className="mb-2 h-4 w-36" />
         <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-full" />
            <div className="flex items-center justify-start gap-4 text-xs">
               <Skeleton className="h-3 flex-1" />
               <Skeleton className="h-3 flex-1" />
               <Skeleton className="h-3 flex-1" />
            </div>
         </div>
      </div>
   </div>
)

const DisplaySectionSkeleton = () => (
   <div className="border-border-default bg-tertiary border-b px-4 py-2">
      <div className="flex gap-4">
         <Skeleton className="h-8 w-24 rounded-md" />
         <Skeleton className="h-8 w-24 rounded-md" />
      </div>
   </div>
)

const ContentSkeleton = () => (
   <div className="space-y-6 p-6">
      <div className="space-y-3">
         <TitleSkeleton />
         <ParagraphSkeleton lines={6} />
      </div>

      <Seperator className="mb-4" />

      <div className="space-y-3">
         <Skeleton className="h-7 w-2/3" />
         <TitleSkeleton />
         <UnorderedListSkeleton items={6} />
      </div>

      <Seperator className="mb-4" />

      <div className="space-y-3">
         <TitleSkeleton />
         <ParagraphSkeleton lines={6} />
      </div>
      <Seperator className="mb-4" />

      <div className="space-y-3">
         <TitleSkeleton />
         <UnorderedListSkeleton items={6} />
      </div>
   </div>
)

// Main Project Page Skeleton
const ProjectPageSkeleton = () => {
   return (
      <div className="mx-auto w-full">
         {/* Header Section */}
         <div className="border-border-default mb-6 flex flex-col gap-4 border-b pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
               <div className="flex items-center gap-3">
                  <div className="ring-accent-border relative h-10 w-10 flex-shrink-0 rounded-full ring-2">
                     <Skeleton className="h-full w-full rounded-full" />
                  </div>
                  <div className="flex flex-col">
                     <Skeleton className="mb-1 h-7 w-64 sm:h-8" />
                     <div className="mt-1 flex items-center gap-3">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <div className="flex items-center gap-0.5">
                           <span className="text-text-secondary">•</span>
                           <Skeleton className="h-4 w-20" />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Desktop visit button */}
               <Skeleton className="hidden h-10 w-24 rounded-md sm:flex" />
            </div>

            {/* Mobile visit button */}
            <Skeleton className="h-10 w-full rounded-md sm:hidden" />
         </div>

         {/* Main Content Area - Responsive Layout */}
         <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="order-2 w-full lg:order-1 lg:flex-1">
               <div className="border-border-default rounded-lg border shadow-sm">
                  <DisplaySectionSkeleton />
                  <ContentSkeleton />
               </div>
            </div>

            <div className="order-1 w-full lg:order-2 lg:w-80 lg:flex-shrink-0">
               <div className="sticky top-4">
                  <RightSectionSkeleton />
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProjectPageSkeleton
