import { Skeleton } from "@/components/ui/skeleton"

export default function PinnedLoader() {
   return (
      <div>
         <Skeleton className="mt-8 mb-2 h-5 w-24" />
         <div className="mt-2 grid w-full grid-cols-2 gap-4 max-md:hidden">
            {[...Array(6)].map((_,index) => (
               <div
                  key={index}
                  className="border-border-default flex min-h-[125px] flex-col justify-between rounded-md border p-4"
               >
                  <Skeleton className="h-4.5 w-24 rounded-full" />

                  <div className="my-2.5 space-y-1">
                     <Skeleton className="h-3.5 w-full" />
                     <Skeleton className="h-3.5 w-full" />
                     <Skeleton className="h-3.5 w-3/4" />
                  </div>

                  {/* Footer with type indicator */}
                  <div className="flex items-center justify-start gap-2">
                     <Skeleton className="h-4 w-4 rounded-full" />
                     <Skeleton className="h-3 w-16" />
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
