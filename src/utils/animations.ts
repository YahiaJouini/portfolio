import { Variants } from "framer-motion"

export const popupVariants: Variants = {
   initial: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.1, ease: "easeOut" },
   },
   animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
   },
   exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.15, ease: "easeIn" },
   },
}
