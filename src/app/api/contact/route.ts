import { contactSchema } from "@/schemas/contact"
import { RESEND_API_KEY } from "@/utils/env"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(RESEND_API_KEY)

export async function POST(req: NextRequest) {
   try {
      const body = await req.json()
      const { name, email, message } = contactSchema().parse(body)

      const { error } = await resend.emails.send({
         from: "Portfolio Contact Form <onboarding@resend.dev>",
         to: "jouiniyahya117@gmail.com",
         subject: `New portfolio message from ${name}`,
         replyTo: email,
         html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px;">
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 8px; border-radius: 5px; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
      `,
      })

      if (error) {
         console.log(error)
         return NextResponse.json({ message: error.message }, { status: 400 })
      }
      return NextResponse.json(
         { message: "Message sent successfully" },
         { status: 200 },
      )
   } catch {
      return NextResponse.json(
         { message: "Internal server error" },
         { status: 500 },
      )
   }
}
