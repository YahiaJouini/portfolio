import { blogExample } from "../example"

export default function Content() {
   return blogExample.sections.map((section) => (
      <div key={section.id} id={section.id} className="mb-8 md:mb-12">
         <h2 className="mb-4 text-2xl leading-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {section.title}
         </h2>
         <p className="text-base leading-relaxed tracking-wide text-gray-700 md:text-lg dark:text-gray-300">
            {section.body}
         </p>
      </div>
   ))
}
