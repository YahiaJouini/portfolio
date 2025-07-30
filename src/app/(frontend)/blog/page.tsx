"use client"

import { useEffect, useRef, useState } from "react"
import Content from "./_components/Content"
import RightSection from "./_components/RightSection"
import TocMobile from "./_components/TocMobile"
import { blogExample } from "./example"

export default function BlogPage() {
   const [activeSection, setActiveSection] = useState<string | null>(null)
   const [isTocSticky, setIsTocSticky] = useState(false)
   const tocContainerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const tocObserver = new IntersectionObserver(
         ([entry]) => {
            setIsTocSticky(!entry.isIntersecting)
         },
         {
            threshold: 1,
            rootMargin: "-24px 0px 0px 0px",
         },
      )

      const sectionObserver = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  setActiveSection(entry.target.id)
               }
            })
         },
         {
            threshold: 0.3,
            rootMargin: "-20% 0px -70% 0px",
         },
      )

      if (tocContainerRef.current) {
         tocObserver.observe(tocContainerRef.current)
      }

      blogExample.sections.forEach((section) => {
         const element = document.getElementById(section.id)
         if (element) {
            sectionObserver.observe(element)
         }
      })

      return () => {
         tocObserver.disconnect()
         sectionObserver.disconnect()
      }
   }, [])

   return (
      <div className="flex w-full justify-center">
         <div className="flex w-full flex-col">
            <div className="blog-header mb-8 text-center md:mb-12">
               <h1 className="mb-4 text-3xl leading-tight font-bold md:text-5xl">
                  {blogExample.title}
               </h1>
               <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-300">
                  {blogExample.description}
               </p>
            </div>

            <div className="flex gap-10">
               <div className="w-full md:w-2/3">
                  <TocMobile activeSection={activeSection} />
                  <Content />

                  <div className="mt-8 flex w-full flex-col md:mt-12">
                     <h3 className="text-xl font-bold text-gray-900 md:text-3xl dark:text-white">
                        Written by
                     </h3>
                     <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                     <div className="mt-6 flex items-center gap-4">
                        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 md:h-[120px] md:w-[120px]">
                           <span className="text-2xl font-bold text-white md:text-4xl">
                              {blogExample.author.name
                                 .split(" ")
                                 .map((n) => n[0])
                                 .join("")}
                           </span>
                        </div>
                        <div className="flex flex-col">
                           <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {blogExample.author.name}
                           </h4>
                           <p className="text-sm text-gray-600 dark:text-gray-400">
                              {blogExample.author.role}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               <RightSection
                  ref={tocContainerRef}
                  isTocSticky={isTocSticky}
                  activeSection={activeSection}
               />
            </div>
         </div>
      </div>
   )
}
