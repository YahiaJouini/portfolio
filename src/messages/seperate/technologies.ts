import { Workflow } from "lucide-react"
import { DiMsqlServer } from "react-icons/di"
import { FaJava } from "react-icons/fa"
import {
   SiC,
   SiCmake,
   SiCplusplus,
   SiDocker,
   SiDart,
   SiExpress,
   SiFirebase,
   SiFlutter,
   SiGit,
   SiGo,
   SiGraphql,
   SiKotlin,
   SiMongodb,
   SiNextdotjs,
   SiNodedotjs,
   SiOracle,
   SiPayloadcms,
   SiPostgresql,
   SiPrisma,
   SiPython,
   SiReact,
   SiSqlite,
   SiStrapi,
   SiSupabase,
   SiTailwindcss,
   SiTypescript,
} from "react-icons/si"
import { VscTerminalLinux } from "react-icons/vsc"
import { Technology } from "../types"

export const technologies: Technology[] = [
   { name: "C", Icon: SiC, background: "#5C6BC0" },
   { name: "C++", Icon: SiCplusplus, background: "#2563EB" },
   { name: "Go", Icon: SiGo, background: "#00C2FF" },
   { name: "CMake", Icon: SiCmake, background: "#1D4ED8" },

   { name: "Kotlin", Icon: SiKotlin, background: "#8B5CF6" },
   { name: "Java", Icon: FaJava, background: "#EA580C" },
   { name: "Python", Icon: SiPython, background: "#3B82F6" },

   { name: "TypeScript", Icon: SiTypescript, background: "#2563EB" },
   { name: "Node.js", Icon: SiNodedotjs, background: "#22C55E" },
   { name: "Express.js", Icon: SiExpress, background: "#111827" },
   { name: "PostgreSQL", Icon: SiPostgresql, background: "#2563EB" },
   { name: "SQLite", Icon: SiSqlite, background: "#0284C7" },
   { name: "MongoDB", Icon: SiMongodb, background: "#16A34A" },

   { name: "React", Icon: SiReact, background: "#00D8FF" },
   { name: "Next.js", Icon: SiNextdotjs, background: "#000000" },
   { name: "Tailwind CSS", Icon: SiTailwindcss, background: "#06B6D4" },

   { name: "Flutter", Icon: SiFlutter, background: "#0EA5E9" },
   { name: "Dart", Icon: SiDart, background: "#0284C7" },

   { name: "Docker", Icon: SiDocker, background: "#0EA5E9" },
   { name: "Git", Icon: SiGit, background: "#F97316" },
   { name: "Linux", Icon: VscTerminalLinux, background: "#F59E0B" },

   { name: "Prisma", Icon: SiPrisma, background: "#334155" },
   { name: "GraphQL", Icon: SiGraphql, background: "#EC4899" },

   { name: "Payload CMS", Icon: SiPayloadcms, background: "#111111" },
   { name: "Strapi CMS", Icon: SiStrapi, background: "#6366F1" },

   { name: "Supabase", Icon: SiSupabase, background: "#22C55E" },
   { name: "Firebase", Icon: SiFirebase, background: "#F59E0B" },

   { name: "SQL Server", Icon: DiMsqlServer, background: "#EF4444" },
   { name: "Oracle SQL / PL-SQL", Icon: SiOracle, background: "#DC2626" },

   { name: "DevOps", Icon: Workflow, background: "#0F172A" },
] satisfies Technology[]
