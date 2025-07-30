"use client"

import ImageLoader from "@/components/global/ImageLoader"
import { Blog } from "@/payload-types"
import { customConverters } from "@/utils/richtext"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { lazy, useEffect, useRef, useState } from "react"
import { t } from "../../t"
import { ActiveBlogSection } from "../types"
import RightSection from "./RightSection"
import TocMobile from "./TocMobile"
import { useLocale } from "@/providers/Locale"

const KeepReading = lazy(() => import("./KeepReading"))

type Props = {
   data: Blog
}
export default function Content({ data }: Props) {
   const [activeSection, setActiveSection] = useState<ActiveBlogSection>(null)
   const [isTocSticky, setIsTocSticky] = useState(false)
   const [isHeroInView, setIsHeroInView] = useState(true)
   const [isWriterInView, setIsWriterInView] = useState(false)
   const tocContainerRef = useRef<HTMLDivElement>(null)
   const heroRef = useRef<HTMLDivElement>(null)
   const writerRef = useRef<HTMLDivElement>(null)
   const { locale } = useLocale()

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
            setIsTocSticky(
               !entry.isIntersecting && !isHeroInView && !isWriterInView,
            )
         },
         {
            threshold: 1,
            rootMargin: "-24px 0px 0px 0px",
         },
      )
      const writerObserver = new IntersectionObserver(
         ([entry]) => {
            setIsWriterInView(entry.isIntersecting)
         },
         {
            threshold: 0,
            rootMargin: "100% 0px -60% 0px",
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

      if (heroRef.current) {
         heroObserver.observe(heroRef.current)
      }

      if (tocContainerRef.current) {
         tocObserver.observe(tocContainerRef.current)
      }

      if (writerRef.current) {
         writerObserver.observe(writerRef.current)
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
         writerObserver.disconnect()
      }
   }, [data, isHeroInView, isWriterInView])

   return (
      <div className="flex w-full flex-col gap-12">
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
               <div className="border-border-default relative aspect-video w-full overflow-hidden rounded-lg border">
                  <ImageLoader
                     src={data.thumbnail.url}
                     alt={data.thumbnail.alt}
                     fill
                     className="object-cover"
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

               <div
                  ref={writerRef}
                  className="mt-8 flex w-full flex-col md:mt-12"
               >
                  <h3 className="text-xl font-bold">{t[locale].writtenBy}</h3>
                  <div className="bg-accent-active mt-3 h-[2px] w-full"></div>
                  <div className="mt-6 flex items-center gap-4">
                     <div className="bg-accent-active flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gradient-to-br md:h-[120px] md:w-[120px]">
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
               hideToc={isWriterInView}
               activeSection={activeSection}
            />
         </div>
         <KeepReading slug={data.slug} />
      </div>
   )
}
