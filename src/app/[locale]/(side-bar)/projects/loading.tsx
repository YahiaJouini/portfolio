"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { ListShowcaseSkeleton } from "./_components/ListShowcase"
import { useEffect, useState } from "react"

// show loader after 50ms
// this is to prevent loader flashing when the page loads data quickly from cache
export default function Loading() {
   const [show, setShow] = useState(false)

   useEffect(() => {
      const timer = setTimeout(() => setShow(true), 50)
      return () => clearTimeout(timer)
   }, [])

   if (!show) return null
   return (
      <div className="w-full">
         <Skeleton className="h-7 w-[50%]" />
         <div className="mt-6">
            <div className="flex flex-col gap-4">
               {Array.from({ length: 6 }, (_, i) => (
                  <ListShowcaseSkeleton key={i} />
               ))}
            </div>
         </div>
      </div>
   )
}
