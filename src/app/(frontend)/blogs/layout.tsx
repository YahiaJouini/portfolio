import React from "react"

export default function layout({ children }: { children: React.ReactNode }) {
   return <div className="mx-auto lg:w-[90%]">{children}</div>
}
