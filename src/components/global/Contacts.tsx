import { contacts } from "@/messages/seperate/contact"
import { Contact } from "@/messages/types/shared"
import { Link } from "@/i18n/navigation"

export default function Contacts() {
   return (
      <div className="flex flex-col gap-1">
         {contacts.map((contact) => (
            <Item {...contact} key={contact.href ?? contact.title} />
         ))}
      </div>
   )
}

const Item = ({ href, title, Icon }: Contact) => {
   if (href) {
      return (
         <Link
            href={href}
            className="hover:text-text-primary hover:bg-hover-2 flex w-full items-center gap-1.5 rounded-md px-1.5 py-[6px] text-sm"
         >
            <Icon />
            {title}
         </Link>
      )
   }
   return (
      <div
         className={
            "flex w-full items-center gap-1.5 rounded-md px-1.5 py-[7px] text-sm"
         }
      >
         <Icon />
         {title}
      </div>
   )
}
