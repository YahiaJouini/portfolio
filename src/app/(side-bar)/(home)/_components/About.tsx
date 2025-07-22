import { fullName } from "@/messages/global"
import { technologies } from "@/messages/seperate/technologies"
import type { About } from "@/messages/types"
import { Locale } from "@/messages/types/shared"
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
         </p>

         <div className="border-border-default border-b pb-3 text-center text-[33px] font-semibold">
            {data.title}
         </div>
         <div
            className="flex flex-col gap-2 text-[17px] leading-[26px] font-medium tracking-wide"
            dangerouslySetInnerHTML={{ __html: data.description }}
         />

         <Link
            href="/contact"
            className="w-fit rounded-sm bg-[#238636] px-3 py-1 font-medium text-white"
         >
            Get in touch
         </Link>

         <div className="border-border-default border-b pb-3 text-2xl font-semibold">
            {data.technologies}
         </div>

         <div className="flex flex-wrap items-center gap-2 text-white">
            {technologies.map((tech) => (
               <div
                  key={tech.name}
                  style={{
                     backgroundColor: tech.background,
                  }}
                  className="bg-accent-border border-border-default flex items-center gap-1 rounded-sm border px-[9px] py-[5px] text-[15px] font-medium"
               >
                  {<tech.Icon className="h-[19px] w-[19px]" />}
                  {tech.name}
               </div>
            ))}
         </div>
      </div>
   )
}
