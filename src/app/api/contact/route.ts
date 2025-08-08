import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
   try {
      const { name, email, message } = await req.json()

      const { error: sendError } = await resend.emails.send({
         from: "Portfolio Contact <no-reply@yahiajouini.dev>",
         to: "jouiniyahya117@gmail.com",
         subject: `📩 New Contact Form Submission from ${name}`,
         html: `
            <h2>New Message from Portfolio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
      `,
      })
      console.log(sendError)
      if (sendError) throw new Error("Email sending failed")

      const { error: clientError } = await resend.emails.send({
         from: "Yahia Jouini <no-reply@yahiajouini.dev>",
         to: email,
         subject: "Thanks for reaching out! 🙌",
         html: `
            <p>Hi ${name},</p>
            <p>Thanks for contacting me via my portfolio website.</p>
            <p>I’ve received your message and will get back to you as soon as possible.</p>
            <p>Best regards,<br><strong>Yahia Jouini</strong></p>
      `,
      })
      console.log(clientError)
      if (clientError) throw new Error("Confirmation email sending failed")

      return new Response(JSON.stringify({ success: true }), { status: 200 })
   } catch (error: any) {
      return new Response(
         JSON.stringify({ error: error?.message ?? "Email sending failed" }),
         {
            status: 500,
         },
      )
   }
}
