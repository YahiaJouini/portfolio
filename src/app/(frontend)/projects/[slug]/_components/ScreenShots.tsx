"use client"
import ImageLoader from "@/components/global/ImageLoader"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Media } from "@/payload-types"
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
            return <Popup media={media} key={media.id} />
         })}
      </div>
   )
}

export function Popup({ media }: { media: Media }) {
   return (
      <Dialog>
         <DialogTrigger className="relative aspect-video w-full overflow-hidden rounded-lg">
            <ImageLoader
               src={media.url}
               alt={media.alt}
               fill
               className="object-cover"
               sizes="100vw"
            />
         </DialogTrigger>
         <DialogContent className="w-auto !max-w-none">
            <DialogHeader>
               <DialogTitle>Are you absolutely sure?</DialogTitle>
               <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
               </DialogDescription>
            </DialogHeader>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
               <ImageLoader
                  src={media.url}
                  alt={media.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
               />
            </div>
         </DialogContent>
      </Dialog>
   )
}
