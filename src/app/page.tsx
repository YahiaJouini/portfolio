"use client"
import { NavBar } from "@/messages/types/navbar"
import { getSection } from "@/messages/utils"
import { useLayoutEffect, useState } from "react"

export default function page() {
   const [section, useSection] = useState<NavBar | null>(null)
   useLayoutEffect(() => {
      getSection<NavBar>("en", "navbar").then((data) => {
         useSection(data)
      })
   }, [])
   return <div>{JSON.stringify(section)}</div>
}
