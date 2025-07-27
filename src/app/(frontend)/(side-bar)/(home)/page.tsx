import { getServerLocale } from "@/utils/server-locale"
import About from "./_components/About"
import Pinned from "./_components/Pinned"
import { Suspense } from "react"

export default async function Page() {
   const locale = await getServerLocale()
   return (
      <div className="w-full">
         <About locale={locale} />
         <Suspense fallback={<div>loading...</div>}>
            <Pinned locale={locale} />
         </Suspense>
      </div>
   )
}
