import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { validLocale } from "./utils/validate-locale"

export function middleware(request: NextRequest) {
   const locale = request.cookies.get("locale")?.value
   const response = NextResponse.next()

   if (!validLocale(locale)) {
      response.cookies.set("locale", "en", {
         path: "/",
         httpOnly: false,
      })
   }

   return response
}
