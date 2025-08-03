import { ContactPage } from "@/messages/types";

export const t = {
   en: {
      form: {
         name: {
            title: "Name",
            placeholder: "Enter your name",
            errorMessage: "Name is required",
            type: "text",
         },
         email: {
            title: "Email",
            placeholder: "Enter your email",
            type: "email",
            errorMessage: "Invalid email address",
         },
         message: {
            title: "Message",
            placeholder: "Type your message here...",
            type: "textarea",
            errorMessage: "Message is required",
         },
      },
      submitButton: "Send Message",
      errorMessage: "An error occurred while sending the message.",
      successMessage:
         "Thank you for your message! We will get back to you soon.",
      alternative: "Alternatively, you can contact me on my socials",
   },
   fr: {
      form: {
         name: {
            title: "Nom",
            placeholder: "Entrez votre nom",
            errorMessage: "Le nom est requis",
            type: "text",
         },
         email: {
            title: "Adresse e-mail",
            placeholder: "Entrez votre adresse e-mail",
            type: "email",
            errorMessage: "Adresse e-mail invalide",
         },
         message: {
            title: "Message",
            placeholder: "Écrivez votre message ici...",
            type: "textarea",
            errorMessage: "Le message est requis",
         },
      },
      submitButton: "Envoyer le message",
      errorMessage: "Une erreur est survenue lors de l'envoi du message.",
      successMessage:
         "Merci pour votre message ! Je vous répondrai dans les plus brefs délais.",
      alternative: "Vous pouvez aussi me contacter via les réseaux sociaux",
   },
   ar: {
      form: {
         name: {
            title: "الاسم",
            placeholder: "أدخل اسمك",
            errorMessage: "الاسم مطلوب",
            type: "text",
         },
         email: {
            title: "البريد الإلكتروني",
            placeholder: "أدخل بريدك الإلكتروني",
            type: "email",
            errorMessage: "البريد الإلكتروني غير صالح",
         },
         message: {
            title: "الرسالة",
            placeholder: "اكتب رسالتك هنا...",
            type: "textarea",
            errorMessage: "الرسالة مطلوبة",
         },
      },
      submitButton: "إرسال الرسالة",
      errorMessage: "حدث خطأ أثناء إرسال الرسالة.",
      successMessage: "شكرًا على رسالتك! سأرد عليك في أقرب وقت ممكن.",
      alternative: "أو يمكنك التواصل معي عبر مواقع التواصل الاجتماعي",
   },
} satisfies ContactPage
