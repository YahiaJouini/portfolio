import { Workflow } from "lucide-react"
import { DiMsqlServer } from "react-icons/di"
import { FaJava } from "react-icons/fa"
import {
   SiDocker,
   SiExpress,
   SiFirebase,
   SiGit,
   SiGnubash,
   SiGo,
   SiGraphql,
   SiMongodb,
   SiNextdotjs,
   SiNodedotjs,
   SiOracle,
   SiPayloadcms,
   SiPhp,
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
   { name: "TypeScript", Icon: SiTypescript, background: "#3178C6" },
   { name: "React", Icon: SiReact, background: "#0088CC" },
   { name: "Next.js", Icon: SiNextdotjs, background: "#000000" },
   { name: "Node.js", Icon: SiNodedotjs, background: "#339933" },
   { name: "Express.js", Icon: SiExpress, background: "#000000" },

   { name: "Tailwind", Icon: SiTailwindcss, background: "#0369A1" },

   { name: "PostgreSQL", Icon: SiPostgresql, background: "#336791" },
   { name: "SQLite", Icon: SiSqlite, background: "#003B57" },
   { name: "Drizzle ORM", Icon: SiPrisma, background: "#4bb74b" },
   { name: "Prisma", Icon: SiPrisma, background: "#2D3748" },
   { name: "MongoDB", Icon: SiMongodb, background: "#47A248" },

   { name: "Supabase", Icon: SiSupabase, background: "#3ECF8E" },
   { name: "Firebase", Icon: SiFirebase, background: "#f58654" },

   { name: "Python", Icon: SiPython, background: "#3776AB" },
   { name: "Java", Icon: FaJava, background: "#007396" },
   { name: "Golang", Icon: SiGo, background: "#007D9C" },
   { name: "GORM", Icon: SiGo, background: "#007D9C" },
   { name: "PHP", Icon: SiPhp, background: "#777BB4" },
   { name: "Docker", Icon: SiDocker, background: "#2496ED" },
   { name: "Git", Icon: SiGit, background: "#F05032" },
   { name: "DevOps", Icon: Workflow, background: "#0A0A0A" },

   { name: "GraphQL", Icon: SiGraphql, background: "#E10098" },

   { name: "Strapi CMS", Icon: SiStrapi, background: "#4945FF" },
   { name: "Payload CMS", Icon: SiPayloadcms, background: "#302c2c" },

   { name: "SQL Server", Icon: DiMsqlServer, background: "#CC2927" },
   { name: "Oracle SQL / PL-SQL", Icon: SiOracle, background: "#F80000" },

   { name: "Linux", Icon: VscTerminalLinux, background: "#ff9831" },
   { name: "Zsh", Icon: SiGnubash, background: "#4EAA25" },
]
