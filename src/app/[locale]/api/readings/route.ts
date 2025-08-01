import { BlogService } from "@/services/blog"
import { getServerLocale } from "@/utils/server-locale"
import { NextRequest, NextResponse } from "next/server"

// already cached no need to use react-query or any other client-side data fetching library
export async function GET(req: NextRequest) {
   const locale = await getServerLocale()
   const searchParams = req.nextUrl.searchParams
   const slug = searchParams.get("slug")

   const blogs = await BlogService.getBlogList({ locale })
   if (!blogs || blogs.length === 0) {
      return NextResponse.json({ message: "No blogs found" }, { status: 404 })
   }
   if (slug) {
      const filteredBlogs = blogs.filter((blog) => blog.slug !== slug)
      return NextResponse.json(filteredBlogs)
   }

   return NextResponse.json(blogs)
}
