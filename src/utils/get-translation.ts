import { Locale, Translation } from "@/messages/types/shared"

// no need for null or failed import check because this is a static import
// and the file will always exist in the build process
export async function getTranslation<T>(
   locale: Locale,
   translation: Translation,
): Promise<T> {
   const mod = await import(`@/messages/${locale}/${translation}.ts`)
   return mod.default
}
