import { cn } from "@/lib/utils"
import { Locale } from "@/types"
import { getServerLocale } from "@/utils/server-locale"
import { Link } from "@/i18n/navigation"
import ImageLoader from "./ImageLoader"

const t = {
   en: {
      description: "The page you are looking for does not exist.",
      button: "Go back to homepage",
   },
   fr: {
      description: "La page que vous recherchez n'existe pas.",
      button: "Retourner à la page d'accueil",
   },
   ar: {
      description: "الصفحة التي تبحث عنها غير موجودة.",
      button: "العودة إلى الصفحة الرئيسية",
   },
} as Record<Locale, { description: string; button: string }>

type Props = {
   global?: boolean
}
export default async function NotFound({ global = false }: Props) {
   const locale = await getServerLocale()

   return (
      <div
         className={cn(
            "center dark bg-primary w-full flex-col gap-6 px-4 py-12 text-center",
            {
               "h-screen px-0 py-0": global,
            },
         )}
      >
         <div className="center border-accent-border relative h-[180px] w-[180px] overflow-hidden rounded-full border-2 md:h-[250px] md:w-[250px]">
            <ImageLoader
               src="/not-found.webp"
               alt="not found image"
               fill
               className="animate-pulse object-cover"
            />
         </div>

         <div className="flex flex-col items-center gap-3">
            <h1 className="text-text-primary text-[64px] leading-none font-black md:text-[80px]">
               404
            </h1>
            <p className="text-text-secondary max-w-md text-lg font-medium md:text-xl">
               {t[locale].description}
            </p>

            <Link
               href="/"
               className="bg-accent mt-4 rounded-full px-6 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
               {t[locale].button}
            </Link>
         </div>
      </div>
   )
}
