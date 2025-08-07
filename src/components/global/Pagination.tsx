"use client"

import {
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
   Pagination as PaginationWrapper,
} from "@/components/ui/pagination"
import { generatePaginationNumbers } from "@/utils/pagination"
import { parseAsInteger, useQueryState } from "nuqs"

type Props = {
   hasNextPage: boolean
   hasPrevPage: boolean
   totalPages: number
}
export default function Pagination({
   totalPages,
   hasNextPage,
   hasPrevPage,
}: Props) {
   const [currentPage, setCurrentPage] = useQueryState("page", {
      ...parseAsInteger.withDefault(1),
      shallow: false,
      scroll: true,
   })

   const paginationNumbers = generatePaginationNumbers(currentPage, totalPages)

   const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
         setCurrentPage(page === 1 ? null : page)
      }
   }

   if (totalPages <= 1) return null

   return (
      <div className={`mt-8 flex justify-center`}>
         <PaginationWrapper>
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious
                     onClick={() => handlePageChange(currentPage - 1)}
                     className={
                        !hasPrevPage
                           ? "pointer-events-none opacity-50"
                           : "cursor-pointer"
                     }
                  />
               </PaginationItem>

               {paginationNumbers.map((pageNumber, index) => (
                  <PaginationItem key={index}>
                     {pageNumber === "..." ? (
                        <PaginationEllipsis />
                     ) : (
                        <PaginationLink
                           onClick={() =>
                              handlePageChange(pageNumber as number)
                           }
                           isActive={pageNumber === currentPage}
                           className="cursor-pointer"
                        >
                           {pageNumber}
                        </PaginationLink>
                     )}
                  </PaginationItem>
               ))}

               <PaginationItem>
                  <PaginationNext
                     onClick={() => handlePageChange(currentPage + 1)}
                     className={
                        !hasNextPage
                           ? "pointer-events-none opacity-50"
                           : "cursor-pointer"
                     }
                  />
               </PaginationItem>
            </PaginationContent>
         </PaginationWrapper>
      </div>
   )
}
