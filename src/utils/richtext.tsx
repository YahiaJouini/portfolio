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
               <h1 className="mb-3 text-[34px] leading-11 font-bold">
                  {children}
               </h1>
            )
         case "h2":
            return (
               <h2 className="mb-3 text-2xl leading-11 font-semibold">
                  {children}
               </h2>
            )
         case "h3":
            return (
               <h3 className="mb-3 text-xl leading-11 font-semibold">
                  {children}
               </h3>
            )
         case "h4":
            return (
               <h4 className="mb-3 text-lg leading-11 font-semibold">
                  {children}
               </h4>
            )
         case "h5":
            return (
               <h5 className="mb-3 text-base leading-11 font-semibold">
                  {children}
               </h5>
            )
         case "h6":
            return (
               <h6 className="mb-3 text-sm leading-11 font-semibold">
                  {children}
               </h6>
            )
         default:
            return (
               <h1 className="mb-3 text-[34px] leading-11 font-bold">
                  {children}
               </h1>
            )
      }
   },

   paragraph: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return <p className="mb-3 text-base leading-relaxed">{children}</p>
   },

   list: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      if (node.listType === "number") {
         return (
            <ol className="mb-6 ml-4 list-inside list-decimal space-y-2">
               {children}
            </ol>
         )
      }
      return (
         <ul className="mb-6 ml-4 list-inside list-disc space-y-2">
            {children}
         </ul>
      )
   },

   listitem: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return <li className="leading-relaxed">{children}</li>
   },

   quote: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return <blockquote className="my-6 pl-4 italic">{children}</blockquote>
   },

   horizontalrule: () => <hr className="border-border-default my-8 border-t" />,

   code: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const language = node.language
      return (
         <pre className="bg-hover-2 mb-6 overflow-x-auto rounded-lg border p-4">
            {language}
            <code
               className={`${language ? `language-${language}` : ""} bg-hover-2 block overflow-x-auto rounded-lg font-mono text-sm`}
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
               <code className="mx-1 rounded bg-gray-200 px-2 py-1 font-mono text-sm text-pink-600">
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
})
