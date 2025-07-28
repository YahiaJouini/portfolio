"use client"

import { ChevronLeft, ChevronRight, Download, FileText } from "lucide-react"
import Link from "next/link"
import { memo, useState } from "react"
import { Document, Page } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import { configurePDFWorker, PDF_OPTIONS } from "@/lib/pdf-config"
import { layout } from "@/messages/seperate/layout"
import { useLocale } from "@/providers/Locale"
import Spinner from "./Spinner"
import { messages } from "@/messages/seperate/messages"
// configure worker immediately
configurePDFWorker()

type PDFViewerProps = {
   resumeFile: string
}

function PDFViewer({ resumeFile }: PDFViewerProps) {
   const [numPages, setNumPages] = useState<number>(0)
   const [pageNumber, setPageNumber] = useState<number>(1)
   const [loading, setLoading] = useState(true)
   const { locale } = useLocale()
   const resolvedLayout = layout[locale]
   return (
      <div className="bg-primary border-border-default overflow-hidden rounded-lg border shadow-sm">
         <div className="bg-secondary border-border-default border-b px-4 py-3">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <FileText className="text-accent-icon h-5 w-5" />
                  <span className="text-text-primary text-sm font-medium">
                     {resolvedLayout.resume}
                  </span>
               </div>
               <Link
                  href={resumeFile}
                  download
                  className="text-text-link hover:text-text-primary bg-button hover:bg-hover border-border-default inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
               >
                  <Download className="h-4 w-4" />
                  {resolvedLayout.download}
               </Link>
            </div>
         </div>

         <div className="bg-tertiary p-4">
            <div className="bg-primary border-border-default overflow-hidden rounded-lg border">
               <Document
                  file={resumeFile}
                  onLoadSuccess={({ numPages }) => {
                     setNumPages(numPages)
                     setLoading(false)
                  }}
                  onLoadError={() => {
                     setLoading(false)
                  }}
                  loading={
                     <div className="bg-primary center h-96">
                        <Spinner />
                     </div>
                  }
                  error={
                     <div className="bg-primary flex h-96 items-center justify-center">
                        <div className="p-6 text-center">
                           <p className="text-text-primary mb-2 font-medium">
                              {messages[locale].error}
                           </p>

                           <Link
                              href={resumeFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text-link hover:text-primary bg-tag-bg hover:bg-tag-hover-bg border-tag-color inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
                           >
                              <Download className="h-4 w-4" />
                              {resolvedLayout.download}
                           </Link>
                        </div>
                     </div>
                  }
                  options={PDF_OPTIONS}
               >
                  {!loading && (
                     <div className="flex justify-center">
                        <Page
                           pageNumber={pageNumber}
                           scale={1.3}
                           className="shadow-sm"
                           renderTextLayer={false}
                           renderAnnotationLayer={false}
                           loading={
                              <div className="bg-primary center h-96">
                                 <Spinner />
                              </div>
                           }
                        />
                     </div>
                  )}
               </Document>
            </div>
         </div>
         {numPages > 1 && !loading && (
            <div className="bg-secondary border-border-default border-t px-4 py-3">
               <div className="flex items-center justify-center gap-3">
                  <button
                     onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                     disabled={pageNumber <= 1}
                     className="text-text-primary bg-button hover:bg-hover disabled:bg-quartiary disabled:text-text-secondary border-border-default inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed"
                  >
                     <ChevronLeft className="h-4 w-4" />
                     {resolvedLayout.previous}
                  </button>

                  <button
                     onClick={() =>
                        setPageNumber(Math.min(numPages, pageNumber + 1))
                     }
                     disabled={pageNumber >= numPages}
                     className="text-text-primary bg-button hover:bg-hover disabled:bg-quartiary disabled:text-text-secondary border-border-default inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed"
                  >
                     {resolvedLayout.next}
                     <ChevronRight className="h-4 w-4" />
                  </button>
               </div>
            </div>
         )}
      </div>
   )
}

export default memo(PDFViewer)
