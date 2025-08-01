import { Blog } from "@/payload-types";

export type ActiveBlogSection = Blog["sections"][number]["id"] | null
