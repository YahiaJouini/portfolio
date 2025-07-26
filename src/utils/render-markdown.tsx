import Link from "next/link"
import ReactMarkdown from "react-markdown"

export default function RenderMarkdown({ content }: { content: string }) {
   return (
      <ReactMarkdown
         components={{
            h1: ({ children }) => (
               <h1 className="mb-3 text-[34px] leading-11 font-bold">
                  {children}
               </h1>
            ),
            h2: ({ children }) => (
               <h2 className="mb-3 text-2xl leading-11 font-semibold">
                  {children}
               </h2>
            ),
            h3: ({ children }) => (
               <h3 className="mb-3 text-xl leading-11 font-semibold">
                  {children}
               </h3>
            ),
            p: ({ children }) => (
               <p className="mb-3 text-base leading-relaxed">{children}</p>
            ),
            strong: ({ children }) => (
               <strong className="font-semibold">{children}</strong>
            ),
            ul: ({ children }) => (
               <ul className="mb-6 ml-4 list-inside list-disc space-y-2">
                  {children}
               </ul>
            ),
            li: ({ children }) => (
               <li className="leading-relaxed">{children}</li>
            ),
            code: ({ children, className }) => {
               const isInline = !className
               if (isInline) {
                  return (
                     <code className="mx-1 rounded bg-gray-200 px-2 py-1 font-mono text-sm text-pink-600">
                        {children}
                     </code>
                  )
               }
               return (
                  <code
                     className={`${className} bg-hover-2 block overflow-x-auto rounded-lg p-4 font-mono text-sm`}
                  >
                     {children}
                  </code>
               )
            },
            pre: ({ children }) => (
               <pre className="bg-hover-2 mb-6 overflow-x-auto rounded-lg border p-4">
                  {children}
               </pre>
            ),
            hr: () => <hr className="border-border-default my-8 border-t" />,
            blockquote: ({ children }) => (
               <blockquote className="my-6 pl-4 italic">{children}</blockquote>
            ),
            a: ({ children, href }) => (
               <Link
                  href={href ? href : "#"}
                  className="hover:text-text-link underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {children}
               </Link>
            ),
         }}
      >
         {content}
      </ReactMarkdown>
   )
}
