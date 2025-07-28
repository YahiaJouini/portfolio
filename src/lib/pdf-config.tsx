// lib/pdf-config.ts
import { pdfjs } from "react-pdf"

// Configure PDF.js worker once globally
let isWorkerConfigured = false

export const configurePDFWorker = () => {
   if (typeof window === "undefined" || isWorkerConfigured) return

   if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
         "pdfjs-dist/build/pdf.worker.min.mjs",
         import.meta.url,
      ).toString()
      isWorkerConfigured = true
   }
}

// PDF options that never change - defined once
export const PDF_OPTIONS = {
   cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/cmaps/`,
   cMapPacked: true,
   standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/standard_fonts/`,
   // Performance optimizations
   disableAutoFetch: false,
   disableStream: false,
   disableRange: false,
   // Enable caching
   disableCreateObjectURL: false,
   // Optimize for faster loading
   verbosity: 0, // Reduce console logs
} as const
