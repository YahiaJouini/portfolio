import React from "react"

export default function Tag({ text }: { text: string }) {
   return (
      <div className="bg-tag-bg text-tag-color hover:bg-tag-hover-bg hover:text-tag-hover-text rounded-md px-2 py-1 text-[13px] font-semibold">
         {text}
      </div>
   )
}
