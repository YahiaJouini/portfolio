import { getServerLocale } from "@/utils/server-locale"
import About from "./_components/About"

export default async function Page() {
   const locale = await getServerLocale()
   return (
      <div className="w-full">
         <About locale={locale} />
      </div>
   )
}
