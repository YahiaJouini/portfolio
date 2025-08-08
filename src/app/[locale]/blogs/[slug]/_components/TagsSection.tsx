import Seperator from "@/components/global/Seperator"
import React from "react"
import { t } from "../../t"
import { Locale } from "@/types"
import Tag from "@/components/global/Tag"
import { Blog } from "@/payload-types"

type Props = {
   locale: Locale
   tags: Blog["tags"]
}
export default function TagsSection({ locale, tags }: Props) {
   return (
      <div className="mb-3 w-full md:mb-4 lg:mb-6">
         <h4 className="mb-2 text-sm font-semibold md:text-base lg:text-lg">
            {t[locale].tags}
         </h4>
         <Seperator className="mb-3" />
         <div className="flex flex-wrap gap-1 md:gap-1.5 lg:gap-2">
            {tags.map(({ tag, id }) => (
               <Tag text={tag} key={id} />
            ))}
         </div>
      </div>
   )
}
