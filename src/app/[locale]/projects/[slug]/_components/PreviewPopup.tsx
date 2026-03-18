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

export default function PreviewPopup({
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

   const isVideo = image.mimeType?.startsWith("video/")
   const isMobile = viewportSize.width < 768

   const mediaWidth = image.width || (isVideo ? 1920 : 0)
   const mediaHeight = image.height || (isVideo ? 1080 : 0)
   const isPortrait =
      mediaWidth > 0 && mediaHeight > 0 && mediaHeight > mediaWidth

   const getDesktopDimensions = () => {
      if (!mediaWidth || !mediaHeight || viewportSize.width === 0) {
         return {}
      }

      const aspectRatio = mediaWidth / mediaHeight
      const maxWidth = Math.min(viewportSize.width * 0.7, 1200)
      const maxHeight = Math.min(viewportSize.height * 0.65, 800)

      let width = Math.min(mediaWidth, maxWidth)
      let height = width / aspectRatio

      if (height > maxHeight) {
         height = maxHeight
         width = height * aspectRatio
      }

      return { width, height }
   }

   if (isVideo) {
      return (
         <Dialog>
            <DialogTrigger className="bg-tertiary relative aspect-video w-full overflow-hidden rounded-lg">
               <video
                  src={image.url}
                  muted
                  playsInline
                  preload="metadata"
                  className={cn(
                     "h-full w-full",
                     isPortrait ? "object-contain" : "object-cover",
                  )}
               />
               <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                     <svg
                        className="ml-1 h-5 w-5 text-black"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path d="M8 5v14l11-7z" />
                     </svg>
                  </div>
               </div>
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
               <DialogHeader
                  className={cn(!title && "hidden", "flex-shrink-0")}
               >
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
                        mediaWidth && mediaHeight
                           ? `${mediaWidth}/${mediaHeight}`
                           : "16/9",
                  }}
               >
                  <video
                     src={image.url}
                     controls
                     playsInline
                     className="h-full w-full object-contain"
                  />
               </div>
            </DialogContent>
         </Dialog>
      )
   }

   return (
      <Dialog>
         <DialogTrigger className="bg-tertiary relative aspect-video w-full overflow-hidden rounded-lg">
            <ImageLoader
               src={image.url}
               alt={image.alt}
               fill
               className={isPortrait ? "object-contain" : "object-cover"}
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  sizes="(max-width: 768px) 95vw, 70vw"
               />
            </div>
         </DialogContent>
      </Dialog>
   )
}
