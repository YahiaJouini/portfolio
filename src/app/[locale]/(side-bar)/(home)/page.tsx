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

export const revalidate = 86400 // 1 day in seconds
export const dynamic = "force-static"
