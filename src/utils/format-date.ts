export const readableISO = (isoString: string): string => {
   const date = new Date(isoString)
   return date.toLocaleString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
   })
}

export const shortNumericDate = (dateStr: string): string => {
   const date = new Date(dateStr)
   return date.toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
   })
}

export function formatDateRange(startDate: string, endDate?: string): string {
   const start = shortNumericDate(startDate)
   const end = endDate ? shortNumericDate(endDate) : "Present"
   return `${start} - ${end}`
}
