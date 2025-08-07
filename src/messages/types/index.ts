import { Locale } from "@/types"
import { Page } from "./shared"

export type About = {
   title: string
   description: string
   websiteDescription: string
   technologies: string
}

export type NavBar = {
   title: string
   search: {
      placeholder: {
         mainInput: string
         secondaryInput: string
      }
      jump: string
      notFound: string
   }
   items: Array<{
      title: string
      href: string
      id: Page
   }>
}

export type Footer = {
   contact: string
}

export type Profile = {
   fullName: string
   job: string
   description: string
}

export type Technology = {
   name: string
   background: string
   Icon: React.ComponentType<{ className?: string }>
}

export type ProjectRole =
   | "designed"
   | "developed"
   | "maintained"
   | "deployed"
   | "architected"

type Journey = {
   description?: string
   startDate: string
   endDate?: string
}
export type Education = Journey & {
   degree: string
   fieldOfStudy: string
   institution: string
   mention?: string
   certification?: {
      href: string
      title: string
   }
}

export type Experience = Journey & {
   jobTitle: string
   company: string
   location?: string
}

type FieldType = "email" | "text" | "textarea"
type FieldName = "name" | "email" | "message"
export type ContactFields = {
   title: string
   placeholder: string
   type: FieldType
   errorMessage: string
}

export type ContactPage = Record<
   Locale,
   {
      form: Record<FieldName, ContactFields>
      submitButton: string
      successMessage: string
      errorMessage: string
      alternative: string
   }
>
