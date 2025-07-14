"use client"
import { useTranslation } from "@/hooks/useTranslation"
import { NavBar } from "@/messages/types/navbar"

export default function Page() {
   const section = useTranslation<NavBar>("navbar")
   return <div>{!section ? "loading ... " : JSON.stringify(section)}</div>
}
