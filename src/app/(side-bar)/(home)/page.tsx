import { getServerLocale } from "@/utils/server-locale"
import About from "./_components/About"
import Pinned from "./_components/Pinned"

export default async function Page() {
   const locale = await getServerLocale()
   return (
      <div className="w-full">
         <About locale={locale} />
         <Pinned locale={locale} />
      </div>
   )
}
