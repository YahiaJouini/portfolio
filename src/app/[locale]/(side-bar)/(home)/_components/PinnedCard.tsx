import ProjectVisibility from "@/components/global/ProjectVisibility"
import Repo from "@/components/icons/Repo"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Page } from "@/messages/types/shared"
import { Locale } from "@/types"
import React from "react"

type Props<T> = {
   page: "projects" | "blogs"
   data: T
   locale: Locale
}

const t = {
   en: {
      projects: "Projects",
      blogs: "Blogs",
   },
   ar: {
      projects: "المشاريع",
      blogs: "المدونات",
   },
   fr: {
      projects: "Projets",
      blogs: "Blogs",
   },
} satisfies Record<Locale, Partial<Record<Page, string>>>
export default function PinnedCard<
   T extends {
      slug: string
      title: string
      description: string
      public?: boolean | undefined | null
      pinned: boolean
   },
>({ page, data, locale }: Props<T>) {
   return (
      <div
         key={data.slug}
         className="border-border-default flex min-h-[125px] flex-col justify-between rounded-md border p-4"
      >
         <div className="flex items-center justify-start gap-1">
            <Repo />
            <Link
               title={data.title}
               aria-label={`View ${page} details`}
               className="line-clamp-1 w-auto overflow-hidden text-sm font-semibold not-rtl:mr-2 hover:underline rtl:ml-2"
               href={`/${page}/${data.slug}`}
            >
               {data.title}
            </Link>
            <ProjectVisibility locale={locale} isPublic={data.public} />
         </div>

         <p className="text-text-secondary my-2.5 line-clamp-3 w-full text-sm">
            {data.description}
         </p>

         <div className="flex items-center justify-start gap-2">
            <div
               className={cn("bg-accent-active h-3 w-3 rounded-full", {
                  "bg-[#0969da]": page === "projects",
               })}
            />
            <p className="text-text-secondary text-xs leading-none hover:underline">
               /{t[locale][page]}
            </p>
         </div>
      </div>
   )
}
