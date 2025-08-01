import { RepoMeta } from "@/types"

export function LanguageBar({
   languages,
}: {
   languages: RepoMeta["languages"]
}) {
   const totalSize = languages.edges.reduce((sum, lang) => sum + lang.size, 0)

   const parsedLanguages = languages.edges
      .map(({ size, node }) => ({
         name: node.name,
         color: node.color || "#ccc",
         size,
         percentage: totalSize > 0 ? (size / totalSize) * 100 : 0,
      }))
      .filter((lang) => lang.percentage > 0)

   return (
      <div className="flex flex-col gap-2">
         <div className="flex h-2.5 w-full overflow-hidden rounded">
            {parsedLanguages.map((lang) => (
               <span
                  key={lang.name}
                  className="h-full shrink-0"
                  style={{
                     backgroundColor: lang.color,
                     flexGrow: lang.percentage,
                     minWidth: "4px",
                  }}
               />
            ))}
         </div>

         <div className="text-text-secondary flex flex-wrap items-center gap-4 text-xs">
            {parsedLanguages.map((lang) => (
               <div key={lang.name} className="flex items-center gap-1">
                  <span
                     className="h-3 w-3 rounded-full"
                     style={{ backgroundColor: lang.color }}
                  />
                  <span>{lang.name}</span>
                  <span className="text-text-trinary">
                     {lang.percentage.toFixed(1)}%
                  </span>
               </div>
            ))}
         </div>
      </div>
   )
}
