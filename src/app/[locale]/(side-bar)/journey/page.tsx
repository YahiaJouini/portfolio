import { Education, Experience } from "@/messages/types"
import { LocaleParams } from "@/types"
import { SUPPORTED_LOCALES } from "@/utils/constants"
import { getTranslation } from "@/utils/get-translation"
import Journey from "./_components/Journey"

export async function generateStaticParams() {
   return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default async function page({ params }: LocaleParams) {
   const { locale } = await params
   // load all because it's a small dataset
   const [education, experience] = await Promise.all([
      getTranslation<Education[]>(locale, "education"),
      getTranslation<Experience[]>(locale, "experience"),
   ])
   return (
      <div className="bg-primary min-h-screen">
         <Journey education={education} experience={experience} />
      </div>
   )
}
