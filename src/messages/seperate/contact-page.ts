import { ContactPage } from "../types"

export const contactPage = {
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
            title: "Email",
            placeholder: "Entrez votre email",
            type: "email",
            errorMessage: "Adresse email invalide",
         },
         message: {
            title: "Message",
            placeholder: "Tapez votre message ici...",
            type: "textarea",
            errorMessage: "Le message est requis",
         },
      },
      submitButton: "Envoyer le message",
      errorMessage: "Une erreur s'est produite lors de l'envoi du message.",
      successMessage:
         "Merci pour votre message ! Nous vous répondrons bientôt.",
      alternative: "Vous pouvez également me contacter sur mes réseaux sociaux",
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
            errorMessage: "عنوان البريد الإلكتروني غير صالح",
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
      successMessage: "شكرًا لرسالتك! سنعود إليك قريبًا.",
      alternative:
         "بدلاً من ذلك، يمكنك الاتصال بي على وسائل التواصل الاجتماعي الخاصة بي",
   },
} satisfies ContactPage
