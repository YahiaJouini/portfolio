import Blog from "@/components/icons/blog"
import Contact from "@/components/icons/contact"
import Discussions from "@/components/icons/discussions"
import Education from "@/components/icons/education"
import Home from "@/components/icons/home"
import Projects from "@/components/icons/projects"
import { Page } from "../types/shared"

//maps page to its corresponding icon component
export const iconMap: Record<
   Page,
   React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
   home: Home,
   blog: Blog,
   projects: Projects,
   education: Education,
   contact: Contact,
   discussions: Discussions,
}
