"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
   const time = 1000 * 60 * 60 // 1 hour
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  staleTime: time,
                  gcTime: time,
                  refetchInterval: time,
                  retry: 2,
                  refetchOnWindowFocus: false,
               },
            },
         }),
   )
   return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   )
}

export default QueryProvider
