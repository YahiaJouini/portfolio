import { getProject } from "@/utils/get-translation"
import { getServerLocale } from "@/utils/server-locale"

export default async function page({
   params,
}: {
   params: Promise<{ slug: string }>
}) {
   const slug = (await params).slug
   const locale = await getServerLocale()
   const project = await getProject(locale, slug)
   return <div className="w-full">{project?.title}</div>
}
