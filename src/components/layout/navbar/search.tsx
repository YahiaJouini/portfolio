import { NavBar } from "@/messages/types/navbar"
import { SearchIcon } from "lucide-react"
import React from "react"

export default function Search({ data }: { data: NavBar["search"] }) {
   return (
      <button className="btn-secondary icon border-border-default flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border pr-3 pl-2 text-[13px] hover:bg-transparent sm:w-[200px] sm:justify-start md:w-[260px]">
         <SearchIcon className="mr-1 h-4 w-4" />
         {data.placeholder}
      </button>
   )
}
