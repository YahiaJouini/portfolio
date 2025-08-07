import ImageLoader from "@/components/global/ImageLoader"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Project } from "@/payload-types"
import { ViewportSize } from "@/types"

export default function ScreenShotPopup({
   media,
   viewportSize,
}: {
   media: Project["images"][number]
   viewportSize: ViewportSize
}) {
   const { image, title, description } = media
   if (typeof image === "number" || !image.url) {
      return null
   }

   const isMobile = viewportSize.width < 768

   const getDesktopDimensions = () => {
      if (!image.width || !image.height || viewportSize.width === 0) {
         return {}
      }

      const aspectRatio = image.width / image.height
      const maxWidth = Math.min(viewportSize.width * 0.7, 1200)
      const maxHeight = Math.min(viewportSize.height * 0.65, 800)

      let width = Math.min(image.width, maxWidth)
      let height = width / aspectRatio

      if (height > maxHeight) {
         height = maxHeight
         width = height * aspectRatio
      }

      return { width, height }
   }

   return (
      <Dialog>
         <DialogTrigger className="relative aspect-video w-full overflow-hidden rounded-lg">
            <ImageLoader
               src={image.url}
               alt={image.alt}
               fill
               className="object-cover"
               sizes="100vw"
            />
         </DialogTrigger>
         <DialogContent
            style={isMobile ? undefined : getDesktopDimensions()}
            showCloseButton={false}
            className={cn(
               "flex max-h-[85vh] flex-col border-none",
               isMobile
                  ? "max-h-none w-[95vw] max-w-none"
                  : "w-full sm:max-w-none",
               !title && "p-0",
            )}
         >
            <DialogHeader className={cn(!title && "hidden", "flex-shrink-0")}>
               <DialogTitle>{title}</DialogTitle>
               {description && (
                  <DialogDescription className="text-text-secondary">
                     {description}
                  </DialogDescription>
               )}
            </DialogHeader>
            <div
               className="relative w-full flex-1 overflow-hidden rounded-lg"
               style={{
                  aspectRatio:
                     image.width && image.height
                        ? `${image.width}/${image.height}`
                        : "16/9",
               }}
            >
               <ImageLoader
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
               />
            </div>
         </DialogContent>
      </Dialog>
   )
}
