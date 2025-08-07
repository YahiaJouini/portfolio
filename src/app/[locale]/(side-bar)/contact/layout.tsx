import { generatePageMetadata } from "@/lib/metadata"
import { LocaleParams } from "@/types"
import React from "react"

export async function generateMetadata({ params }: LocaleParams) {
   const { locale } = await params
   return generatePageMetadata({
      locale,
      path: "contact",
      namespace: "contact",
   })
}

export default function layout({ children }: { children: React.ReactNode }) {
   return children
}
