import Blog from "@/components/icons/Blog"
import Contact from "@/components/icons/Contact"
import Education from "@/components/icons/Education"
import Home from "@/components/icons/Home"
import Projects from "@/components/icons/Projects"
import { Page } from "../types/shared"

//maps page to its corresponding icon component
export const iconMap: Record<
   Page,
   React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
   home: Home,
   blogs: Blog,
   projects: Projects,
   journey: Education,
   contact: Contact,
}
