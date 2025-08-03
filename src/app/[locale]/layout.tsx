import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/navbar/Navbar"
import { routing } from "@/i18n/routing"
import { inter } from "@/lib/fonts"
import { generateRootMetadata } from "@/lib/metadata"
import { cn } from "@/lib/utils"
import QueryProvider from "@/providers/ReactQuery"
import ThemeProvider from "@/providers/Theme"
import { LocaleParams } from "@/types"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import NextTopLoader from "nextjs-toploader"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Toaster } from "sonner"
import "./globals.css"
import { SUPPORTED_LOCALES } from "@/utils/constants"

export async function generateStaticParams() {
   return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocaleParams) {
   const { locale } = await params
   return generateRootMetadata(locale)
}

export default async function RootLayout({
   children,
   params,
}: {
   children: React.ReactNode
   params: LocaleParams["params"]
}) {
   const { locale } = await params
   if (!hasLocale(routing.locales, locale)) notFound()

   return (
      <html
         lang={locale}
         dir={locale === "ar" ? "rtl" : "ltr"}
         key={locale}
         suppressHydrationWarning
      >
         <body
            className={cn(
               `text-text-primary bg-primary relative flex min-h-screen flex-col overflow-x-hidden antialiased`,
               inter.className,
            )}
         >
            <NextIntlClientProvider>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="dark"
                  themes={["light", "dark"] as const}
               >
                  <NuqsAdapter>
                     <NextTopLoader
                        color="#fd8c73"
                        shadow={false}
                        showSpinner={false}
                        height={2}
                     />
                     <QueryProvider>
                        <Navbar locale={locale} />
                        <main className="mx-auto w-[90%] flex-1 flex-grow overflow-x-hidden md:w-[95%] xl:max-w-[1250px]">
                           {children}
                        </main>
                        <Footer />
                     </QueryProvider>

                     <Toaster position="bottom-right" richColors />
                  </NuqsAdapter>
               </ThemeProvider>
            </NextIntlClientProvider>
         </body>
      </html>
   )
}
