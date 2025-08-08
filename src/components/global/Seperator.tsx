import { cn } from "@/lib/utils"
import React from "react"

export default function Seperator({ className }: { className?: string }) {
   return <div className={cn("bg-border-default h-[2px] w-full", className)} />
}
