import ImageLoader from "@/components/global/ImageLoader"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Project } from "@/payload-types"

export default function ScreenShots({ images }: { images: Project["images"] }) {
   if (!images || images.length === 0) {
      return null
   }
   return (
      <div className="w-full space-y-6">
         {images.map((image) => (
            <Popup media={image} key={image.id} />
         ))}
      </div>
   )
}

export function Popup({ media }: { media: Project["images"][number] }) {
   const { image, title, description } = media
   if (typeof image === "number" || !image.url) {
      return null
   }
   const renderedImage = (
      <ImageLoader
         src={image.url}
         alt={image.alt}
         fill
         className="object-cover"
         sizes="100vw"
      />
   )
   return (
      <Dialog>
         <DialogTrigger className="relative aspect-video w-full overflow-hidden rounded-lg">
            {renderedImage}
         </DialogTrigger>
         <DialogContent className="w-[50%] !max-w-none">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               {description && (
                  <DialogDescription className="text-text-secondary">
                     {description}
                  </DialogDescription>
               )}
            </DialogHeader>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
               {renderedImage}
            </div>
         </DialogContent>
      </Dialog>
   )
}
