import { Locale } from "@/types"

export const t = {
   en: {
      title: `My <span class="text-accent-active">Tech</span> Corner`,
      description:
         "A personal log of what I build, break, and learn. I write about web dev, backend systems, performance, real-world architecture, and random experiments with tools like Next.js, TypeScript, Go, and whatever else I'm into. No filler—just the process, the wins, and the bugs.",
      noBlogsFound: "No Blogs Found",
      noBlogsFoundDescription: "There are currently no blogs available.",
      readMore: "Read more",
      tags: "Tags",
      tableOfContents: "Table of Contents",
      writtenBy: "Written by",
   },
   ar: {
      title: `ركني <span class="text-accent-active">التقني</span>`,
      description:
         "سجل شخصي لما أبنيه، أو أعبث به، أو أتعلمه. أكتب عن تطوير الويب، الأنظمة الخلفية، الأداء، بنية المشاريع الواقعية، وتجارب عشوائية مع أدوات مثل Next.js، TypeScript، Go وغيرها. بدون حشو—فقط التجربة، النجاحات، والأخطاء.",
      noBlogsFound: "لا توجد مدونات",
      noBlogsFoundDescription: "لا توجد أي مدونات متاحة حاليًا.",
      readMore: "اقرأ المزيد",
      tags: "الوسوم",
      tableOfContents: "فهرس المحتوى",
      writtenBy: "بقلم",
   },
   fr: {
      title: `Mon coin <span class="text-accent-active">Tech</span>`,
      description:
         "Un journal personnel de ce que je crée, casse et apprends. J’écris sur le développement web, les systèmes backend, la performance, l’architecture concrète et des expérimentations avec des outils comme Next.js, TypeScript, Go, et tout ce qui m'inspire. Pas de blabla — juste le processus, les réussites et les bugs.",
      noBlogsFound: "Aucun blog trouvé",
      noBlogsFoundDescription: "Aucun article n’est disponible pour le moment.",
      readMore: "Lire la suite",
      tags: "Tags",
      tableOfContents: "Table des matières",
      writtenBy: "Écrit par",
   },
} satisfies Record<Locale, Record<string, string>>
