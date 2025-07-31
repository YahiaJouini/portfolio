import type React from "react"
import Contacts from "@/components/global/Contacts"
import { Divider } from "@/components/global/Divider"
import ImageLoader from "@/components/global/ImageLoader"
import { profileImage } from "@/messages/global"
import { layout as layoutMessages } from "@/messages/seperate/layout"
import type { Profile } from "@/messages/types"
import { getTranslation } from "@/utils/get-translation"
import { getServerLocale } from "@/utils/server-locale"

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div className="mx-auto flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:p-0">
         <SideBar />
         <div className="flex-1">{children}</div>
      </div>
   )
}

async function SideBar() {
   const locale = await getServerLocale()
   const data = await getTranslation<Profile>(locale, "profile")

   return (
      <div className="flex w-full shrink-0 flex-col justify-center gap-4 sm:gap-6 lg:w-[280px] xl:w-[320px]">
         <div className="text-center lg:text-left">
            <div className="border-accent-border relative z-10 mx-auto mb-3 aspect-square w-24 overflow-hidden rounded-full border object-cover object-center sm:mb-4 sm:w-32 md:w-40 lg:mx-0 lg:w-[70%] xl:w-[80%]">
               <ImageLoader
                  fill
                  className="h-full w-full object-cover object-center"
                  src={profileImage.src || "/placeholder.svg"}
                  priority
                  alt={profileImage.alt[locale]}
               />
            </div>
            <h2 className="text-xl font-medium sm:text-2xl lg:text-2xl">
               {data.fullName}
            </h2>
            <h4 className="text-text-trinary text-base sm:text-lg lg:text-lg">
               {data.job}
            </h4>
            <p className="mt-2 text-sm max-sm:hidden sm:text-base lg:text-base">
               {data.description}
            </p>
         </div>

         <Divider
            className="max-sm:hidden"
            title={layoutMessages[locale].connect}
         >
            <Contacts />
         </Divider>
      </div>
   )
}
