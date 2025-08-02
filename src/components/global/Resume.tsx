"use client"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { useLocale } from "@/hooks/useLocale"
import { MergedTranslations } from "@/types"
import { Suspense, lazy, useState } from "react"
import Spinner from "./Spinner"

const PDFViewer = lazy(() => import("./PDFViewer"))

const t = {
   en: {
      resume: "My Resume",
   },
   fr: {
      resume: "Mon CV",
   },
   ar: {
      resume: "السيرة الذاتية",
   },
} satisfies MergedTranslations

export default function Resume() {
   const locale = useLocale()
   const [isOpen, setIsOpen] = useState(false)

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger className="border-border-default bg-btn-blue hover:bg-btn-blue-hover w-fit gap-1 rounded-sm border px-3 py-1 font-medium text-white">
            {t[locale].resume}
         </DialogTrigger>

         <DialogContent
            showCloseButton={false}
            className="max-h-[90vh] w-fit !max-w-none min-w-[700px] overflow-hidden p-0"
         >
            <DialogHeader className="hidden">
               <DialogTitle></DialogTitle>
               <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className="max-h-[calc(90vh-120px)] overflow-auto">
               {isOpen && (
                  <Suspense
                     fallback={
                        <div className="bg-primary center h-96 rounded-md">
                           <Spinner />
                        </div>
                     }
                  >
                     <PDFViewer
                        title={t[locale].resume}
                        resumeFile="/resume.pdf"
                     />
                  </Suspense>
               )}
            </div>
         </DialogContent>
      </Dialog>
   )
}
