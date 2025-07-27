import { getServerLocale } from "@/utils/server-locale"
import { Suspense } from "react"
import About from "./_components/About"
import Pinned from "./_components/Pinned"
import PinnedLoader from "./_components/PinnedLoader"

export default async function Page() {
   const locale = await getServerLocale()
   return (
      <div className="w-full">
         <About locale={locale} />
         <Suspense fallback={<PinnedLoader />}>
            <Pinned locale={locale} />
         </Suspense>
      </div>
   )
}
