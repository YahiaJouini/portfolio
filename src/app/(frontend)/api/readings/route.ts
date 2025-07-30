import { BlogService } from "@/services/blog"
import { getServerLocale } from "@/utils/server-locale"
import { NextResponse } from "next/server"

// already cached no need to use react-query or any other client-side data fetching library
export async function GET() {
   const locale = await getServerLocale()

   const blogs = await BlogService.getBlogList({ locale })
   if (!blogs || blogs.length === 0) {
      return NextResponse.json({ message: "No blogs found" }, { status: 404 })
   }

   return NextResponse.json(blogs)
}
