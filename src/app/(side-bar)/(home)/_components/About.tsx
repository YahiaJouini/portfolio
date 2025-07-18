import { fullName } from "@/messages/global"
import type { About } from "@/messages/types/about"
import { Locale } from "@/messages/types/common"
import { getTranslation } from "@/utils/get-translation"
import Link from "next/link"

export default async function About({ locale }: { locale: Locale }) {
   const data = await getTranslation<About>(locale, "about")
   return (
      <div className="border-border-default flex flex-col gap-6 rounded-md border p-6">
         <p className="font-mono text-xs">
            <span className="text-text-primary">
               {fullName.en.replace(" ", "")}
            </span>
            <span className="text-accent-icon mx-[2px]">/</span>
            <span className="text-text-primary">README</span>
            <span className="text-accent-icon false">.md</span>
            <span className="text-text-primary"></span>
         </p>

         <div className="border-border-default border-b pb-3 text-center text-[33px] font-medium">
            {data.title}
         </div>
         <div
            className="flex flex-col gap-2 text-[17px] leading-7 font-medium tracking-wide"
            dangerouslySetInnerHTML={{ __html: data.description }}
         />

         <Link
            href="/contact"
            className="bg-[#238636] px-3 py-1 font-medium text-white w-fit rounded-sm"
         >
            Get in touch
         </Link>
      </div>
   )
}
