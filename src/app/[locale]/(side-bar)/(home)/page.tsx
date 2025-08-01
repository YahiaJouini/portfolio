import { LocaleParams } from "@/types"
import { SUPPORTED_LOCALES } from "@/utils/constants"
import About from "./_components/About"
import Pinned from "./_components/Pinned"

export async function generateStaticParams() {
   return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default async function page({ params }: LocaleParams) {
   const { locale } = await params
   return (
      <div className="w-full">
         <About locale={locale} />
         <Pinned locale={locale} />
      </div>
   )
}

export const revalidate = 3600
export const dynamic = "force-static"
