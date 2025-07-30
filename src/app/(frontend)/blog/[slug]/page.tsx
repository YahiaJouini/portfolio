import { BlogService } from "@/services/blog"
import { getServerLocale } from "@/utils/server-locale"
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
   if (!data) {
      return (
         <div className="mx-auto w-full max-w-4xl">
            <h1 className="text-2xl font-bold">Blog Not Found</h1>
            <p className="text-text-secondary mt-2">
               The blog you are looking for does not exist.
            </p>
         </div>
      )
   }
   return <Content data={data} />
}
