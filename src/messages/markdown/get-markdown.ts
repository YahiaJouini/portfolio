import fs from "fs"
import path from "path"
import { ProjectName } from "../types"
import { Locale, SUPPORTED_LOCALES } from "../types/shared"

const MARKDOWN_DIR = process.cwd()

export function loadProjectMarkdown(
   projectName: ProjectName,
): Record<Locale, string> {
   const result = {} as Record<Locale, string>

   for (const lang of SUPPORTED_LOCALES) {
      const filePath = path.join(MARKDOWN_DIR, projectName, `${lang}.md`)
      result[lang] = fs.readFileSync(filePath, "utf-8")
   }

   return result
}
