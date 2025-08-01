import { Locale } from "@/types"

declare module "next-intl" {
   export default function useLocale(): Locale
}
