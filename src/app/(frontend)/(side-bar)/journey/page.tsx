import { Education, Experience } from "@/messages/types"
import { getTranslation } from "@/utils/get-translation"
import { getServerLocale } from "@/utils/server-locale"
import Journey from "./_components/Journey"

export default async function JourneyPage() {
   const locale = await getServerLocale()
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
