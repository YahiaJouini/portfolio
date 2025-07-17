import { Profile } from "@/messages/types/profile"
import { getTranslation } from "@/utils/get-translation"
import { getServerLocale } from "@/utils/server-locale"
import React from "react"

export default function layout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-12">
         <SideBar />
         {children}
      </div>
   )
}

async function SideBar() {
   const locale = await getServerLocale()
   const data = await getTranslation<Profile>(locale, "profile")

   return (
      <div className="flex w-[292px] flex-col items-center justify-center">
         <h1 className="mt-4 text-xl font-bold">{data.fullName}</h1>
         <p className="text-gray-600">{data.description}</p>
      </div>
   )
}
