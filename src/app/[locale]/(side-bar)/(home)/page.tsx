import { LocaleParams } from "@/types"
import About from "./_components/About"
import Pinned from "./_components/Pinned"

export default async function page({ params }: LocaleParams) {
   const { locale } = await params
   return (
      <div className="w-full">
         <About locale={locale} />
         <Pinned locale={locale} />
      </div>
   )
}

export const revalidate = 3600 * 24 // 1 day
export const dynamic = "force-static"
