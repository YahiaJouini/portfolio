import { Locale, Translation } from "@/messages/types/common"

export async function getSection<T>(
   locale: Locale,
   translation: Translation,
): Promise<T> {
   const mod = await import(`@/messages/${locale}/${translation}.ts`)
   return mod.default
}
