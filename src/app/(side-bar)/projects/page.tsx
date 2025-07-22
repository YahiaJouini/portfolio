import { loadSearchParams } from "@/utils/project-filters"
import type { SearchParams } from "nuqs/server"
import Filter from "./_components/Filter"

type Props = {
   searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: Props) {
   const { layout, tags } = await loadSearchParams(searchParams)
   return (
      <div className="w-full">
         <Filter />
      </div>
   )
}
