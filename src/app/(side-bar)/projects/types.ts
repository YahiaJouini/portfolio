import { ProjectWithLang } from "@/graphql/github-repo"
import { Locale } from "@/messages/types/shared"

export type Props = {
   locale: Locale
   project: ProjectWithLang
}
