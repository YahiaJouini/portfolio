import { generatePageMetadata } from "@/lib/metadata"
import { LocaleParams } from "@/types"
import About from "./_components/About"
import Pinned from "./_components/Pinned"

export async function generateMetadata({ params }: LocaleParams) {
   const { locale } = await params
   return generatePageMetadata({ locale, path: "home", namespace: "home" })
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
