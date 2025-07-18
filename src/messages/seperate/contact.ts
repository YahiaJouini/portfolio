import { Email, Github, Linkedin } from "@/components/icons/connect"
import Home from "@/components/icons/home"
import { Contact as ContactType } from "../types/shared"

export const contacts: Array<ContactType> = [
   {
      title: "Tunis, Tunisia",
      Icon: Home,
   },
   {
      href: "https://www.linkedin.com/in/yahiajouini",
      title: "yahiajouini",
      Icon: Linkedin,
   },
   {
      href: "https://github.com/YahiaJouini",
      title: "YahiaJouini",
      Icon: Github,
   },
   {
      href: "mailto:jouiniyahya117@gmail.com",
      title: "jouiniyahya117@gmail.com",
      Icon: Email,
   },
]
