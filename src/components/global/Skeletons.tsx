import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

type Props = {
   className?: string
}
export const TitleSkeleton = ({ className }: Props) => (
   <Skeleton className={cn("h-7 w-2/3", className)} />
)

export const ParagraphSkeleton = ({
   lines,
   className,
}: Props & { lines: number }) => (
   <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => {
         const isLast = index === lines - 1
         return (
            <Skeleton
               key={index}
               className={cn(
                  "h-4 w-full",
                  {
                     "w-full": !isLast,
                     "w-3/4": isLast,
                  },
                  className,
               )}
            />
         )
      })}
   </div>
)

export const UnorderedListSkeleton = ({
   items,
   className,
}: {
   items: number
   className?: string
}) => (
   <div className={cn("space-y-2", className)}>
      {Array.from({ length: items }).map((_, index) => (
         <div key={index} className="flex items-start gap-3">
            <Skeleton className="mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
         </div>
      ))}
   </div>
)
