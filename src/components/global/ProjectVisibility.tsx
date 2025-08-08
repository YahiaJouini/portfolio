import { Project } from "@/payload-types"
import { Locale, MergedTranslations } from "@/types"

type Props = {
   isPublic: Project["public"]
   locale: Locale
}

const t = {
   en: {
      public: "Public",
      private: "Private",
   },
   fr: {
      public: "Public",
      private: "Privé",
   },
   ar: {
      public: "عام",
      private: "خاص",
   },
} satisfies MergedTranslations

export default async function ProjectVisibility({ isPublic, locale }: Props) {
   return (
      <div className="border-accent-border text-accent-icon rounded-full border px-[5px] py-[3px] text-xs leading-none font-semibold shrink-0">
         {isPublic ? t[locale].public : t[locale].private}
      </div>
   )
}
