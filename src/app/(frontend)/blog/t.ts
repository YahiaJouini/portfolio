import { Locale } from "@/types"

export const t = {
   en: {
      title: `My <span class="text-accent-active">Tech</span> Corner`,
      description:
         "A personal log of what I build, break, and learn. I write about web dev, backend systems, performance, real-world architecture, and random experiments with tools like Next.js, TypeScript, Go, and whatever else I'm into. No filler—just the process, the wins, and the bugs.",
      notFound: "Blog Not Found",
      notFoundDescription: "The blog you are looking for does not exist.",
      noBlogsFound: "No Blogs Found",
      noBlogsFoundDescription: "There are currently no blogs available.",
      readMore: "Read more",
      tags: "Tags",
      tableOfContents: "Table of Contents",
      writtenBy: "Written by",
   },
   ar: {
      title: `زاويتي <span class="text-accent-active">التقنية</span>`,
      description:
         "سجل شخصي لما أبنيه وأكسره وأتعلمه. أكتب عن تطوير الويب، أنظمة الخلفية، الأداء، العمارة الواقعية، والتجارب العشوائية مع أدوات مثل Next.js وTypeScript وGo وغيرها. لا حشو—فقط العملية، والانتصارات، والأخطاء.",
      notFound: "المدونة غير موجودة",
      notFoundDescription: "المدونة التي تبحث عنها غير موجودة.",
      noBlogsFound: "لا توجد مدونات",
      noBlogsFoundDescription: "لا توجد مدونات متاحة حاليًا.",
      readMore: "اقرأ المزيد",
      tags: "الوسوم",
      tableOfContents: "جدول المحتويات",
      writtenBy: "كتب بواسطة",
   },
   fr: {
      title: `Mon coin <span class="text-accent-active">Tech</span>`,
      description:
         "Un journal personnel de ce que je construis, casse et apprends. J'écris sur le développement web, les systèmes backend, la performance, l'architecture réelle et des expériences aléatoires avec des outils comme Next.js, TypeScript, Go et tout ce qui m'intéresse. Pas de remplissage—juste le processus, les réussites et les bugs.",
      notFound: "Blog non trouvé",
      notFoundDescription: "Le blog que vous cherchez n'existe pas.",
      noBlogsFound: "Aucun blog trouvé",
      noBlogsFoundDescription: "Il n'y a actuellement aucun blog disponible.",
      readMore: "Lire la suite",
      tags: "Étiquettes",
      tableOfContents: "Table des matières",
      writtenBy: "Écrit par",
   },
} satisfies Record<Locale, Record<string, string>>
