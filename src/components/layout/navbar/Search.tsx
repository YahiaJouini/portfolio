import { NavBar } from "@/messages/types"
import { SearchIcon } from "lucide-react"
import React from "react"

export default function Search({ content }: { content: NavBar["search"] }) {
   return (
      <button className="btn-secondary icon border-border-default text-accent-icon hover:bg-hover-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border pr-3 pl-2 text-[13px] sm:w-[200px] sm:justify-start md:w-[260px]">
         <SearchIcon className="mr-1 h-4 w-4" />
         {content.placeholder}
      </button>
   )
}
