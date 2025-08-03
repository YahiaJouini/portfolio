import { generateDynamicMetadata } from "@/lib/dynamic-metadata"
import { BlogService } from "@/services/blog"
import { Locale } from "@/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Content from "./_components/Content"

type Props = {
   params: Promise<{ slug: string; locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { slug, locale } = await params
   const data = await BlogService.getBlog({ slug, locale })
   if (!data) {
      return {
         title: "Blog Post Not Found",
         description: "The requested blog post could not be found.",
         robots: { index: false, follow: false },
      }
   }
   const { thumbnail, tags, author, createdAt, ...rest } = data

   return generateDynamicMetadata({
      locale,
      path: `blogs/${slug}`,
      type: "article",
      data: {
         ...rest,
         image: thumbnail,
         tags: tags.map(({ tag }) => tag),
         author: author.name,
         publishedTime: createdAt,
      },
   })
}

export default async function page({ params }: Props) {
   const { slug, locale } = await params
   const data = await BlogService.getBlog({ slug, locale })
   if (!data) notFound()
   return <Content data={data} />
}
