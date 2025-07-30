import Contacts from "@/components/global/Contacts"
import { Divider } from "@/components/global/Divider"
import ImageLoader from "@/components/global/ImageLoader"
import { profileImage } from "@/messages/global"
import { layout as layoutMessages } from "@/messages/seperate/layout"
import { Profile } from "@/messages/types"
import { getTranslation } from "@/utils/get-translation"
import { getServerLocale } from "@/utils/server-locale"

export default function layout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div className="mx-auto flex items-start justify-between gap-8">
         <SideBar />
         {children}
      </div>
   )
}

async function SideBar() {
   const locale = await getServerLocale()
   const data = await getTranslation<Profile>(locale, "profile")

   return (
      <div className="flex w-[320px] shrink-0 flex-col justify-center gap-6">
         <div>
            <div className="border-accent-border relative z-10 -mr-1 mb-3 aspect-square w-[80%] overflow-hidden rounded-full border object-cover object-center">
               <ImageLoader
                  fill
                  className="h-full w-full object-cover object-center"
                  src={profileImage.src}
                  priority
                  alt={profileImage.alt[locale]}
               />
            </div>
            <h2 className="text-2xl font-medium">{data.fullName}</h2>
            <h4 className="text-text-trinary text-lg">{data.job}</h4>
            <p className="mt-2">{data.description}</p>
         </div>
         <Divider title={layoutMessages[locale].connect}>
            <Contacts />
         </Divider>
      </div>
   )
}
