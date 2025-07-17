type Props = {
   title: string
   children: React.ReactNode
}
export function Divider({ title, children }: Props) {
   return (
      <div className="space-y-1.5">
         <div className="border-border-default border-b pb-1">
            <h3 className="text-text-trinary text-[13px]">{title}</h3>
         </div>
         {children}
      </div>
   )
}
