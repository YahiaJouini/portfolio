"use client"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { layout } from "@/messages/seperate/layout"
import { useLocale } from "@/providers/Locale"
import { Suspense, lazy, useState } from "react"
import Spinner from "./Spinner"

const PDFViewer = lazy(() => import("./PDFViewer"))

export default function Resume() {
   const { locale } = useLocale()
   const [isOpen, setIsOpen] = useState(false)

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger className="border-border-default w-fit gap-1 rounded-sm border bg-[#0969da] px-3 py-1 font-medium text-white">
            <span className="font-medium">{layout[locale].resume}</span>
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
                     <PDFViewer resumeFile="/resume.pdf" />
                  </Suspense>
               )}
            </div>
         </DialogContent>
      </Dialog>
   )
}
