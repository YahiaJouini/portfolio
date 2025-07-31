import { cn } from "@/lib/utils"

type Props = {
   title: string
   children: React.ReactNode
   className?: string
}
export function Divider({ title, children, className }: Props) {
   return (
      <div className={cn("space-y-1.5", className)}>
         <div className="border-border-default border-b pb-1">
            <h3 className="text-text-trinary text-[13px]">{title}</h3>
         </div>
         {children}
      </div>
   )
}
