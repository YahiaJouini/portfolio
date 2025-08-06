import Contacts from "@/components/global/Contacts"
import { Divider } from "@/components/global/Divider"
import ImageLoader from "@/components/global/ImageLoader"
import { profileImage } from "@/messages/global"
import { layout as layoutMessages } from "@/messages/seperate/layout"
import type { Profile } from "@/messages/types"
import { Locale, LocaleParams } from "@/types"
import { getTranslation } from "@/utils/get-translation"
import type React from "react"

export default async function Layout({
   children,
   params,
}: Readonly<{
   children: React.ReactNode
   params: LocaleParams["params"]
}>) {
   const { locale } = await params
   return (
      <div className="mx-auto flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start md:justify-between md:gap-8">
         <SideBar locale={locale} />
         <div className="flex-1">{children}</div>
      </div>
   )
}

async function SideBar({ locale }: { locale: Locale }) {
   const data = await getTranslation<Profile>(locale, "profile")

   return (
      <div className="w-full shrink-0 flex-col justify-center gap-4 max-sm:my-3 sm:gap-6 md:flex md:w-[280px] xl:w-[320px]">
         <div className="flex items-start gap-4 text-left md:flex-col md:items-center md:text-center lg:items-start lg:text-left">
            <div className="border-accent-border ring-accent-border relative z-10 aspect-square w-20 shrink-0 overflow-hidden rounded-full border object-cover object-center ring-1 sm:w-24 md:mx-auto md:mb-3 md:w-[70%] lg:mx-0 xl:w-[80%]">
               <ImageLoader
                  fill
                  className="h-full w-full object-cover object-center"
                  src={profileImage.src}
                  priority
                  sizes="(max-width: 640px) 80vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, (max-width: 1280px) 50vw, (max-width: 1536px) 40vw, 320px"
                  alt={profileImage.alt[locale]}
               />
            </div>
            <div className="flex-1 md:flex-none">
               <h2 className="text-lg font-medium sm:text-xl md:text-2xl">
                  {data.fullName}
               </h2>
               <h3 className="text-text-trinary text-base sm:text-lg md:text-lg">
                  {data.job}
               </h3>
               <p className="text-sm max-sm:hidden sm:mt-2 sm:text-base md:text-base">
                  {data.description}
               </p>
            </div>
         </div>
         <Divider
            className="max-md:hidden"
            title={layoutMessages[locale].connect}
         >
            <Contacts />
         </Divider>
      </div>
   )
}
