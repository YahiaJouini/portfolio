export interface PaginationData<T> {
   items: T[]
   totalPages: number
   totalItems: number
   currentPage: number
   hasNextPage: boolean
   hasPreviousPage: boolean
   itemsPerPage: number
}

export function getPaginatedData<T>(
   data: T[],
   page: number,
   itemsPerPage = 4,
): PaginationData<T> {
   const currentPage = Math.max(1, page)
   const startIndex = (currentPage - 1) * itemsPerPage
   const endIndex = startIndex + itemsPerPage
   const items = data.slice(startIndex, endIndex)
   const totalPages = Math.ceil(data.length / itemsPerPage)

   return {
      items,
      totalPages,
      totalItems: data.length,
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
      itemsPerPage,
   }
}

export function generatePaginationNumbers(
   currentPage: number,
   totalPages: number,
): (number | "...")[] {
   const delta = 2
   const range: (number | "...")[] = []

   if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
         range.push(i)
      }
   } else {
      range.push(1)

      if (currentPage > 4) {
         range.push("...")
      }

      const start = Math.max(2, currentPage - delta)
      const end = Math.min(totalPages - 1, currentPage + delta)

      for (let i = start; i <= end; i++) {
         range.push(i)
      }

      if (currentPage < totalPages - 3) {
         range.push("...")
      }

      if (totalPages > 1) {
         range.push(totalPages)
      }
   }

   return range
}
