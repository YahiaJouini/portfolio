import { LocaleParams } from "@/types"
import { SUPPORTED_LOCALES } from "@/utils/constants"
import { Suspense } from "react"
import About from "./_components/About"
import Pinned from "./_components/Pinned"
import PinnedLoader from "./_components/PinnedLoader"

export async function generateStaticParams() {
   return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}
export default async function page({ params }: LocaleParams) {
   const { locale } = await params
   return (
      <div className="w-full">
         <About locale={locale} />
         <Suspense fallback={<PinnedLoader />}>
            <Pinned locale={locale} />
         </Suspense>
      </div>
   )
}

export const revalidate = 3600
export const dynamic = "force-static"
