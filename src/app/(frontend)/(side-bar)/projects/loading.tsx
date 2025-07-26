import { Skeleton } from "@/components/ui/skeleton"
import { ListShowcaseSkeleton } from "./_components/ListShowcase"

export default function Loading() {
   return (
      <div className="w-full">
         <Skeleton className="h-7 w-[50%]" />
         <div className="mt-6">
            <div className="flex flex-col gap-4">
               {Array.from({ length: 6 }, (_, i) => (
                  <ListShowcaseSkeleton key={i} />
               ))}
            </div>
         </div>
      </div>
   )
}
