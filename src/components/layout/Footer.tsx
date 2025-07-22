import { fullName } from "@/messages/global"
import { getServerLocale } from "@/utils/server-locale"
import Link from "next/link"
import Logo from "../global/Logo"
import { linkedin } from "@/messages/seperate/contact"

export default async function Footer() {
   const locale = await getServerLocale()
   return (
      <footer className="mt-auto w-full px-10 pt-16 pb-16 sm:pb-12">
         <div className="center w-full flex-col gap-4 md:flex-row-reverse">
            <div className="center flex-wrap gap-4">
               <Link
                  className="text-text-secondary hover:text-accent-extra text-center text-xs"
                  href="/contact"
               >
                  Contact
               </Link>
               <Link
                  className="text-text-secondary hover:text-accent-extra text-center text-xs"
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  LinkedIn
               </Link>
               <Link
                  target="_blank"
                  className="text-text-secondary hover:text-accent-extra text-center text-xs"
                  href="https://github.com/YahiaJouini/portfolio"
                  rel="noopener noreferrer"
               >
                  Give it a star
               </Link>
            </div>
            <div className="center flex-wrap gap-2">
               <Logo withName={false} />
               <p className="text-text-secondary text-center text-xs">
                  © {new Date().getFullYear()}{" "}
                  <span className="font-semibold">{fullName[locale]}</span>
               </p>
            </div>
         </div>
      </footer>
   )
}
