import ImageLoader from "@/components/global/ImageLoader"
import { Locale } from "@/types"
import { getServerLocale } from "@/utils/server-locale"

const t = {
   en: "The page you are looking for does not exist.",
   fr: "La page que vous recherchez n'existe pas.",
   ar: "الصفحة التي تبحث عنها غير موجودة.",
} as Record<Locale, string>

export default async function NotFound() {
   const locale = await getServerLocale()
   return (
      <div className="center w-full flex-col gap-4">
         <div className="center border-accent-border relative h-[180px] w-[180px] overflow-hidden rounded-full border-2 md:h-[250px] md:w-[250px]">
            <ImageLoader
               src={"/not-found.webp"}
               alt="not found image"
               fill
               className="animate-pulse"
            />
         </div>
         <div className="center flex-col gap-2">
            <h1 className="text-center text-[80px] font-black">404</h1>
            <p className="rounded-full text-center font-semibold md:text-xl">
               {t[locale]}
            </p>
         </div>
      </div>
   )
}
