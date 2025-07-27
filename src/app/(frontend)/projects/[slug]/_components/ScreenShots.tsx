"use client"
import ImageLoader from "@/components/global/ImageLoader"
import { ProjectDetail } from "@/types"

export default function ScreenShots({
   images,
}: {
   images: ProjectDetail["images"]
}) {
   if (!images || images.length === 0) {
      return null
   }
   return (
      <div className="w-full space-y-6">
         {images.map(({ image: media }) => {
            if (typeof media === "number" || !media.url) {
               return null
            }

            return (
               <div
                  key={media.id}
                  className="relative aspect-video w-full overflow-hidden rounded-lg"
               >
                  <ImageLoader
                     src={media.url}
                     alt={media.alt}
                     fill
                     className="object-cover"
                     sizes="100vw"
                  />
               </div>
            )
         })}
      </div>
   )
}
