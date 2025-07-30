"use client"

import ImageLoader from "@/components/global/ImageLoader"
import { Blog } from "@/payload-types"
import { customConverters } from "@/utils/richtext"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { useEffect, useRef, useState } from "react"
import { ActiveBlogSection } from "../types"
import RightSection from "./RightSection"
import TocMobile from "./TocMobile"

export default function Content({ data }: { data: Blog }) {
   const [activeSection, setActiveSection] = useState<ActiveBlogSection>(null)
   const [isTocSticky, setIsTocSticky] = useState(false)
   const [isHeroInView, setIsHeroInView] = useState(true)
   const tocContainerRef = useRef<HTMLDivElement>(null)
   const heroRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const heroObserver = new IntersectionObserver(
         ([entry]) => {
            setIsHeroInView(entry.isIntersecting)
         },
         {
            threshold: 0,
            rootMargin: "0px 0px 0px 0px",
         },
      )
      const tocObserver = new IntersectionObserver(
         ([entry]) => {
            setIsTocSticky(!entry.isIntersecting && !isHeroInView)
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
            rootMargin: "0px 0px -70% 0px",
         },
      )

      // Set up observers
      if (heroRef.current) {
         heroObserver.observe(heroRef.current)
      }

      if (tocContainerRef.current) {
         tocObserver.observe(tocContainerRef.current)
      }

      data.sections.forEach((section) => {
         const element = document.getElementById(section.id)
         if (element) {
            sectionObserver.observe(element)
         }
      })

      return () => {
         heroObserver.disconnect()
         tocObserver.disconnect()
         sectionObserver.disconnect()
      }
   }, [data, isHeroInView])

   return (
      <div className="flex w-full justify-center">
         <div className="flex w-full flex-col">
            <div
               ref={heroRef}
               id="hero"
               className="mb-8 flex flex-col gap-6 text-center md:mb-12"
            >
               <div className="mx-auto max-w-3xl space-y-2">
                  <h1 className="text-3xl leading-tight font-bold md:text-4xl">
                     {data.title}
                  </h1>
                  <p className="text-text-secondary mx-auto text-base leading-relaxed md:text-lg">
                     {data.description}
                  </p>
               </div>
               {typeof data.thumbnail !== "number" && (
                  <div className="border-default relative mb-6 aspect-video w-full border">
                     <ImageLoader
                        src={data.thumbnail.url}
                        alt={data.thumbnail.alt}
                        fill
                        className="mt-6 rounded-lg object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                     />
                  </div>
               )}
            </div>

            <div className="flex gap-10">
               <div className="w-full lg:w-2/3">
                  <TocMobile
                     sections={data.sections}
                     activeSection={activeSection}
                  />
                  {data.sections.map((section) => (
                     <div id={section.id} key={section.id}>
                        <RichText
                           converters={customConverters}
                           data={section.body}
                        />
                     </div>
                  ))}

                  <div className="mt-8 flex w-full flex-col md:mt-12">
                     <h3 className="text-xl font-bold">Written by</h3>
                     <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                     <div className="mt-6 flex items-center gap-4">
                        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 md:h-[120px] md:w-[120px]">
                           <span className="text-2xl font-bold text-white md:text-4xl">
                              {data.author.name
                                 .split(" ")
                                 .map((n) => n[0])
                                 .join("")}
                           </span>
                        </div>
                        <div className="flex flex-col">
                           <h4 className="text-xl font-semibold">
                              {data.author.name}
                           </h4>
                           <p className="text-text-secondary text-sm">
                              {data.author.role}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               <RightSection
                  ref={tocContainerRef}
                  sections={data.sections}
                  tags={data.tags}
                  isTocSticky={isTocSticky}
                  activeSection={activeSection}
               />
            </div>
         </div>
      </div>
   )
}
