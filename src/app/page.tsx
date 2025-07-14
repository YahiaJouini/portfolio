"use client"
import { useTranslation } from "@/hooks/useTranslation"
import { NavBar } from "@/messages/types/navbar"

export default function page() {
   const section = useTranslation<NavBar>("en", "navbar")
   return <div>{!section ? "loading ... " : JSON.stringify(section)}</div>
}
