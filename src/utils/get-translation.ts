import { Translation } from "@/messages/types/shared"
import { Locale } from "@/types"

const translationCache = new Map<string, any>()

export async function getTranslation<T>(
   locale: Locale,
   translation: Translation,
): Promise<T> {
   console.log("fetched translation")
   const key = `${locale}/${translation}`
   if (translationCache.has(key)) return translationCache.get(key)

   const mod = await import(`@/messages/${key}.ts`)
   translationCache.set(key, mod.default)
   return mod.default
}
