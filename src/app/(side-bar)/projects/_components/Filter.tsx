import { Grid2x2, Rows2 } from "lucide-react"

export default function Filter() {
   return (
      <div>
         <div className="flex items-center gap-2">
            <p className="font-medium">Layout</p>
            <div className="grid grid-cols-2 gap-1">
               <button className="bg-hover-2 border-border-default flex items-center gap-1 rounded-md border px-2 py-1">
                  <Rows2 className="h-4 w-4" />
                  List
               </button>
               <button className="bg-hover-2 border-border-default flex items-center gap-1 rounded-md border px-2 py-1">
                  <Grid2x2 className="h-4 w-4" />
                  Grid
               </button>
            </div>
         </div>
      </div>
   )
}
