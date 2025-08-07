"use client"
import { Project } from "@/payload-types"
import { ViewportSize } from "@/types"
import { lazy, useEffect, useState } from "react"

const ScreenShotPopup = lazy(() => import("./ScreenShotPopup"))
export default function ScreenShots({ images }: { images: Project["images"] }) {
   const [viewportSize, setViewportSize] = useState<ViewportSize>({
      width: 0,
      height: 0,
   })

   useEffect(() => {
      if (typeof window === "undefined") return
      setViewportSize({
         width: window.innerWidth,
         height: window.innerHeight,
      })
   }, [])

   if (!images || images.length === 0) {
      return null
   }
   return (
      <div className="w-full space-y-6">
         {images.map((image) => (
            <ScreenShotPopup
               viewportSize={viewportSize}
               media={image}
               key={image.id}
            />
         ))}
      </div>
   )
}
