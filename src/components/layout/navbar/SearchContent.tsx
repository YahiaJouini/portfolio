"use client"
import { RiGitRepositoryFill } from "react-icons/ri"

import InputField from "@/components/global/InputField"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchWebsiteSearch } from "@/graphql/website-search"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { fullName } from "@/messages/global"
import { iconMap } from "@/messages/seperate/page-icons"
import { NavBar } from "@/messages/types"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useMemo, useState } from "react"
import { FaBookOpenReader } from "react-icons/fa6"

type Props = {
   content: NavBar["search"]
   pages: NavBar["items"]
   handleItemlick: () => void
}
export default function SearchContent({
   pages,
   content,
   handleItemlick,
}: Props) {
   const [search, setSearch] = useState("")
   const { data, isLoading } = useQuery({
      queryFn: fetchWebsiteSearch,
      queryKey: ["website-search"],
      enabled: true,
   })

   const filteredResults = useMemo(() => {
      if (!data || !search.trim()) {
         return {
            blogs: data?.blogs.docs || [],
            projects: data?.projects.docs || [],
            pages,
         }
      }

      const searchLower = search.toLowerCase().trim()

      return {
         blogs: data.blogs.docs.filter((blog) =>
            blog.title.toLowerCase().includes(searchLower),
         ),
         projects: data.projects.docs.filter((project) =>
            project.title.toLowerCase().includes(searchLower),
         ),
         pages: pages.filter((page) =>
            page.title.toLowerCase().includes(searchLower),
         ),
      }
   }, [data, search, pages])

   const hasResults =
      filteredResults.blogs.length > 0 ||
      filteredResults.projects.length > 0 ||
      filteredResults.pages.length > 0

   const handleSearchChange = useCallback(
      (val: string) => {
         if (isLoading) return
         setSearch(val)
      },
      [isLoading],
   )

   return (
      <div className="overflow-y-auto">
         <div className="mx-2">
            <DialogHeader className="sr-only">
               <DialogTitle>Search</DialogTitle>
            </DialogHeader>
            <InputField
               onChange={handleSearchChange}
               type="text"
               placeholder={content.placeholder.mainInput}
               className="w-full bg-transparent text-sm"
               value={search}
               search
            />

            <div className="flex-1 overflow-y-auto">
               {isLoading && <SearchSkeleton />}

               {data && (
                  <>
                     {!hasResults && search.trim() && (
                        <div className="text-text-secondary py-8 text-center text-sm">
                           {content.notFound} {'"' + search + '"'}
                        </div>
                     )}

                     {filteredResults.projects.length > 0 && (
                        <SearchSection
                           title="Projects"
                           first
                           items={filteredResults.projects}
                           renderItem={(project) => (
                              <SearchItem
                                 key={project.slug}
                                 href={`/projects/${project.slug}`}
                                 icon={
                                    <RiGitRepositoryFill className="text-text-secondary -mr-1 h-4 w-4" />
                                 }
                                 title={project.title}
                                 prefix={`${fullName.en}/`}
                                 jumpText={content.jump}
                                 onCLick={handleItemlick}
                              />
                           )}
                        />
                     )}
                     {filteredResults.blogs.length > 0 && (
                        <SearchSection
                           title="Blog Posts"
                           first={
                              filteredResults.projects.length === 0 &&
                              filteredResults.pages.length === 0
                           }
                           items={filteredResults.blogs}
                           renderItem={(blog) => (
                              <SearchItem
                                 key={blog.slug}
                                 href={`/blogs/${blog.slug}`}
                                 prefix={`${blog.author.name}/`}
                                 icon={
                                    <FaBookOpenReader className="text-text-secondary h-4 w-4" />
                                 }
                                 title={blog.title}
                                 jumpText={content.jump}
                                 onCLick={handleItemlick}
                              />
                           )}
                        />
                     )}

                     {filteredResults.pages.length > 0 && (
                        <SearchSection
                           title="Pages"
                           first={
                              filteredResults.projects.length === 0 &&
                              filteredResults.blogs.length === 0
                           }
                           items={filteredResults.pages}
                           renderItem={(page) => {
                              const Icon = iconMap[page.id]
                              return (
                                 <SearchItem
                                    key={page.id}
                                    href={page.href}
                                    onCLick={handleItemlick}
                                    icon={
                                       <Icon className="text-text-secondary h-4 w-4" />
                                    }
                                    title={page.title}
                                    jumpText={content.jump}
                                 />
                              )
                           }}
                        />
                     )}
                  </>
               )}
            </div>
         </div>
      </div>
   )
}

const SearchSkeleton = () => (
   <div className="flex flex-col gap-3">
      {Array.from({ length: 12 }, (_, i) => (
         <Skeleton key={i} className="h-6 w-full" />
      ))}
   </div>
)

const SearchSection = <T,>({
   title,
   items,
   renderItem,
   first = false,
}: {
   title: string
   items: T[]
   first?: boolean
   renderItem: (item: T) => React.ReactNode
}) => (
   <div
      className={cn(
         "border-border-default mb-3 flex flex-col gap-1.5 border-t pt-3",
         first && "mt-4 border-none",
      )}
   >
      <p className="text-text-secondary px-2 text-xs font-medium">{title}</p>
      <div className="flex flex-col items-start gap-[3px]">
         {items.map(renderItem)}
      </div>
   </div>
)

const SearchItem = ({
   href,
   icon,
   title,
   onCLick,
   prefix,
   jumpText,
}: {
   href: string
   icon: React.ReactNode
   title: string
   prefix?: string
   jumpText: string
   onCLick: () => void
}) => (
   <Link
      aria-label={`Go to ${title}`}
      href={href}
      onClick={onCLick}
      className="hover:bg-hover-2 focus:bg-hover-2 relative flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-[5px] pr-3 text-sm transition-colors"
   >
      <div className="flex items-center gap-2">
         {icon}
         <p className="truncate text-sm">
            {prefix && (
               <span className="text-text-secondary mr-[1px] max-md:hidden">
                  {prefix}
               </span>
            )}
            <span className="text-text-primary">{title}</span>
         </p>
      </div>

      <span className="text-text-secondary ml-2 flex-shrink-0 text-xs max-md:hidden">
         {jumpText}
      </span>
   </Link>
)
