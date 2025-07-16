import { Variants } from "framer-motion"

export const popup: Variants = {
   initial: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.1, ease: "easeOut" },
   },
   animate: {
      opacity: 1,
      y: 0,
      transition: {
         type: "spring",
         stiffness: 400,
         damping: 20,
      },
   },
   exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.1, ease: "easeIn" },
   },
}

export const fade: Variants = {
   initial: {
      opacity: 0,
      transition: { duration: 0.1, ease: "easeOut" },
   },
   animate: {
      opacity: 1,
      transition: {
         type: "spring",
         stiffness: 400,
         damping: 20,
      },
   },
   exit: {
      opacity: 0,
      transition: { duration: 0.1, ease: "easeIn" },
   },
}
