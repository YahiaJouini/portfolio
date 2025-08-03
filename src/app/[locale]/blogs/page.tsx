import { BlogService } from "@/services/blog"
import { LocaleParams } from "@/types"
import { BlogCard } from "./_components/BlogCard"
import { t } from "./t"

export default async function page({ params }: LocaleParams) {
   const { locale } = await params
   const data = await BlogService.getBlogList({ locale })
   if (!data || data.length === 0) {
      return (
         <div className="w-full text-center">
            <h2 className="text-2xl font-bold">{t[locale].noBlogsFound}</h2>
            <p className="text-text-secondary mt-2">
               {t[locale].noBlogsFoundDescription}
            </p>
         </div>
      )
   }

   return (
      <div>
         <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1
               dangerouslySetInnerHTML={{ __html: t[locale].title }}
               className="text-text-primary mb-6 text-4xl leading-tight font-bold md:text-5xl"
            />
            <p className="text-text-secondary md:text-lg">
               {t[locale].description}
            </p>
         </div>

         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {data.map((blog) => (
               <BlogCard locale={locale} key={blog.id} data={blog} />
            ))}
         </div>
      </div>
   )
}
