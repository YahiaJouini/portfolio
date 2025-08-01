import { BlogService } from "@/services/blog"
import { Locale } from "@/types"
import { notFound } from "next/navigation"
import Content from "./_components/Content"

type Props = {
   params: Promise<{ slug: string; locale: Locale }>
}
export default async function page({ params }: Props) {
   const { slug, locale } = await params
   const data = await BlogService.getBlog({ slug, locale })
   if (!data) notFound()
   return <Content data={data} />
}
