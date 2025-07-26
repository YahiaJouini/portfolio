import { messages } from "@/messages/seperate/messages"
import { getServerLocale } from "@/utils/server-locale"

export default async function NotFound() {
   const locale = await getServerLocale()
   return (
      <div className="mt-20 w-full text-center text-3xl font-bold">
         {messages[locale].pageNotFound}
      </div>
   )
}
