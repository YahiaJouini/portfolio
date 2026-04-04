import { Education } from "../types"

export default [
   {
      degree: "شهادة تقني سامي (قيد الدراسة)",
      fieldOfStudy: "تكنولوجيا المعلومات",
      institution: "المعهد العالي للدراسات التكنولوجية برادس (ISET رادس)",
      institutionUrl: "https://www.isetr.rnu.tn",
      startDate: "2023-09",
      description:
         "أتابع تكويناً جامعياً يمتد على ثلاث سنوات يركّز على الشبكات، وقواعد البيانات، وهندسة البرمجيات. من المتوقع التخرّج في جويلية 2026.",
   },
   {
      degree: "شهادة",
      fieldOfStudy: "تطوير البرمجيات (معسكر تدريبي مكثف)",
      institution: "Coding Dojo",
      institutionUrl: "https://www.codingdojo.com",
      startDate: "2023-09",
      endDate: "2024-01",
      description:
         "أتممت برنامجاً تدريبياً مكثفاً عبر الإنترنت في تطوير البرمجيات يركّز على تقنيات الويب الشاملة، ومبادئ كتابة الكود النظيف، وأساليب العمل الرشيق (Agile). اكتسبت من خلاله خبرة عملية في بناء تطبيقات حقيقية ضمن مهل زمنية ضيّقة.",
      certification: {
         href: "https://app.diplomasafe.com/en-US/diploma/d1202b62c0d64a1d0f78d4c5814d6ed87f1b5e6f5",
         title: "عرض الشهادة",
      },
   },
   {
      degree: "البكالوريا",
      fieldOfStudy: "علوم الإعلامية",
      institution: "المعهد الثانوي طريق الشاطئ بسليمان",
      startDate: "2022-09",
      endDate: "2023-06",
      mention: "امتياز",
      description:
         "تحصلت على شهادة البكالوريا بتقدير ممتاز في علوم الإعلامية، مع قاعدة قوية في الرياضيات، الفيزياء، الخوارزميات، والبرمجة.",
   },
] satisfies Array<Education>
