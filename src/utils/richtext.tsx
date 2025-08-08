import ImageLoader from "@/components/global/ImageLoader"
import { Link } from "@/i18n/navigation"
import { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react"

export const customConverters: JSXConvertersFunction = ({
   defaultConverters,
}) => ({
   ...defaultConverters,
   heading: ({ node, nodesToJSX }) => {
      const Tag = node.tag
      const children = nodesToJSX({ nodes: node.children })

      switch (Tag) {
         case "h1":
            return (
               <h1 className="mb-2 text-2xl leading-8 font-bold sm:mb-3 sm:text-3xl sm:leading-9 lg:text-[28px] lg:leading-10 2xl:mb-3 2xl:text-[34px] 2xl:leading-11">
                  {children}
               </h1>
            )
         case "h2":
            return (
               <h2 className="mb-2 text-xl leading-7 font-semibold sm:mb-3 sm:text-2xl sm:leading-8 lg:text-[22px] lg:leading-9 2xl:mb-3 2xl:text-2xl 2xl:leading-11">
                  {children}
               </h2>
            )
         case "h3":
            return (
               <h3 className="mb-2 text-lg leading-6 font-semibold sm:mb-3 sm:text-xl sm:leading-7 lg:text-[20px] lg:leading-8 2xl:mb-3 2xl:text-xl 2xl:leading-11">
                  {children}
               </h3>
            )
         case "h4":
            return (
               <h4 className="mb-2 text-base leading-6 font-semibold sm:mb-3 sm:text-lg sm:leading-7 lg:text-[18px] lg:leading-7 2xl:mb-3 2xl:text-lg 2xl:leading-11">
                  {children}
               </h4>
            )
         case "h5":
            return (
               <h5 className="mb-2 text-sm leading-5 font-semibold sm:mb-3 sm:text-base sm:leading-6 lg:text-[16px] lg:leading-6 2xl:mb-3 2xl:text-base 2xl:leading-11">
                  {children}
               </h5>
            )
         case "h6":
            return (
               <h6 className="mb-2 text-xs leading-4 font-semibold sm:mb-3 sm:text-sm sm:leading-5 lg:text-[14px] lg:leading-5 2xl:mb-3 2xl:text-sm 2xl:leading-11">
                  {children}
               </h6>
            )
         default:
            return (
               <h1 className="mb-2 text-2xl leading-8 font-bold sm:mb-3 sm:text-3xl sm:leading-9 lg:text-[28px] lg:leading-10 2xl:mb-3 2xl:text-[34px] 2xl:leading-11">
                  {children}
               </h1>
            )
      }
   },

   paragraph: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return (
         <p className="mb-2 text-sm leading-relaxed sm:mb-3 sm:text-base lg:text-[15px] 2xl:mb-3 2xl:text-base 2xl:leading-relaxed">
            {children}
         </p>
      )
   },
   link: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const href = node.fields.url
      return (
         <Link
            href={href ?? ""}
            className="text-text-link hover:underline"
            target="_blank"
            rel="noopener noreferrer"
         >
            {children}
         </Link>
      )
   },
   list: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      if (node.listType === "number") {
         return (
            <ol className="mb-4 ml-3 list-inside list-decimal space-y-1 sm:mb-6 sm:ml-4 sm:space-y-2 lg:mb-5 lg:space-y-1.5 2xl:mb-6 2xl:ml-4 2xl:space-y-2">
               {children}
            </ol>
         )
      }
      return (
         <ul className="mb-4 ml-3 list-inside list-disc space-y-1 sm:mb-6 sm:ml-4 sm:space-y-2 lg:mb-5 lg:space-y-1.5 2xl:mb-6 2xl:ml-4 2xl:space-y-2">
            {children}
         </ul>
      )
   },

   listitem: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return (
         <li className="text-sm leading-relaxed sm:text-base lg:text-[15px] 2xl:text-base 2xl:leading-relaxed">
            {children}
         </li>
      )
   },

   quote: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return (
         <blockquote className="my-4 pl-3 text-sm italic sm:my-6 sm:pl-4 sm:text-base lg:my-5 lg:text-[15px] 2xl:my-6 2xl:pl-4 2xl:text-base">
            {children}
         </blockquote>
      )
   },

   horizontalrule: () => (
      <hr className="border-border-default my-6 border-t sm:my-8 lg:my-7 2xl:my-8" />
   ),

   code: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const language = node.language
      return (
         <pre className="bg-hover-2 mb-4 overflow-x-auto rounded-lg border p-3 sm:mb-6 sm:p-4 lg:mb-5 2xl:mb-6 2xl:p-4">
            {language}
            <code
               className={`${language ? `language-${language}` : ""} bg-hover-2 block overflow-x-auto rounded-lg font-mono text-xs sm:text-sm lg:text-[13px] 2xl:text-sm`}
            >
               {children}
            </code>
         </pre>
      )
   },

   text: ({ node }) => {
      let content: React.ReactNode = node.text

      if (node.format) {
         // Bold
         if (node.format & 1) {
            content = <strong className="font-semibold">{content}</strong>
         }
         // Italic
         if (node.format & 2) {
            content = <em>{content}</em>
         }
         // Inline code
         if (node.format & 16) {
            content = (
               <code className="bg-secondary mx-1 rounded px-1.5 py-0.5 font-mono text-xs text-pink-400 sm:px-2 sm:py-1 sm:text-sm lg:text-[13px] 2xl:mx-1 2xl:px-2 2xl:py-1 2xl:text-sm dark:text-pink-600">
                  {content}
               </code>
            )
         }
         // Strikethrough
         if (node.format & 4) {
            content = <s>{content}</s>
         }
         // Underline
         if (node.format & 8) {
            content = <u>{content}</u>
         }
      }

      return content
   },
   upload: ({ node }) => {
      const url = (node.value as any)?.url as string | undefined
      const alt = (node.value as any)?.alt || "Uploaded image"
      if (!url) return null
      return (
         <div className="relative my-4 aspect-video w-full">
            <ImageLoader
               src={url}
               alt={alt}
               fill
               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
         </div>
      )
   },
})
