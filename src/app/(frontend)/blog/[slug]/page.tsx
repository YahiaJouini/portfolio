import { BlogService } from "@/services/blog"
import { getServerLocale } from "@/utils/server-locale"
import { notFound } from "next/navigation"
import Content from "./_components/Content"

type Props = {
   params: Promise<{ slug: string }>
}
export default async function page({ params }: Props) {
   const [slug, locale] = await Promise.all([
      params.then((p) => p.slug),
      getServerLocale(),
   ])
   const data = await BlogService.getBlog({ slug, locale })
   if (!data) notFound()
   return <Content data={data} />
}
