import Resume from "@/components/global/Resume"
import { fullName } from "@/messages/global"
import { technologies } from "@/messages/seperate/technologies"
import type { About } from "@/messages/types"
import { Locale } from "@/types"
import { getTranslation } from "@/utils/get-translation"
import { Link } from "@/i18n/navigation"
import { t } from "../t"

export default async function About({ locale }: { locale: Locale }) {
   const data = await getTranslation<About>(locale, "about")
   return (
      <div className="border-border-default flex flex-col gap-6 rounded-md border p-4 lg:p-6">
         <p className="font-mono text-xs">
            <span className="text-text-primary">
               {fullName.en.replace(" ", "")}
            </span>
            <span className="text-accent-icon mx-[2px]">/</span>
            <span className="text-text-primary">README</span>
            <span className="text-accent-icon false">.md</span>
         </p>

         <div className="border-border-default border-b pb-3 text-center text-2xl font-semibold sm:text-3xl lg:text-[33px]">
            {data.title}
         </div>
         <div
            className="text-text-primary flex flex-col gap-2 leading-[26px] font-medium tracking-[0.01em] sm:text-base lg:text-[17px]"
            dangerouslySetInnerHTML={{ __html: data.description }}
         />

         <div className="flex items-center gap-2">
            <Resume />
            <Link
               href="/contact"
               className="border-border-default bg-btn-green hover:bg-btn-green-hover w-fit gap-1 rounded-sm border px-3 py-1 font-medium text-white"
            >
               {t[locale].getInTouch}
            </Link>
         </div>

         <div className="border-border-default border-b pb-3 text-lg font-semibold sm:text-2xl">
            {data.technologies}
         </div>

         <div className="flex flex-wrap items-center gap-2 text-white">
            {technologies.map(({ name, Icon, background }) => (
               <div
                  key={name}
                  style={{
                     backgroundColor: background,
                  }}
                  className="bg-accent-border border-border-default flex items-center gap-1 rounded-sm border px-[7px] py-[5px] text-sm font-medium sm:px-[9px] sm:text-[15px]"
               >
                  <Icon className="h-4 w-4 lg:h-[17px] lg:w-[17px]" />
                  {name}
               </div>
            ))}
         </div>
      </div>
   )
}
