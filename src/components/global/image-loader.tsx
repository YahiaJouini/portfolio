"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import { Skeleton } from "../ui/skeleton"

type Props = (
   | {
        fill: true
     }
   | {
        width: number
        height: number
        fill?: false
     }
) & {
   className?: string
   src: string | undefined | null
   alt: string
   sizes?: string
   priority?: boolean
}

export default function ImageLoader(props: Props) {
   const { src, alt, fill, className, sizes, priority } = props
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)

   const handleError = () => {
      setLoading(false)
      setError(true)
   }

   const SkeletonTemplate = (
      <Skeleton
         className={cn("rounded-none", className, {
            "absolute inset-0": fill,
         })}
         style={{
            ...(!fill ? { width: props.width, height: props.height } : {}),
         }}
      />
   )

   if (!src) {
      return SkeletonTemplate
   }

   return (
      <>
         {(loading || error) && SkeletonTemplate}
         <Image
            src={src}
            alt={alt}
            {...(fill
               ? { fill }
               : { width: props.width, height: props.height })}
            className={cn(
               className,
               loading ? "opacity-0" : "opacity-100 transition-opacity",
            )}
            onLoadingComplete={() => setLoading(false)}
            onError={handleError}
            sizes={sizes}
            priority={priority}
         />
      </>
   )
}
