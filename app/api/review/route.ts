import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, roomNumber, issue, improvement } = body

    // Format the email content
    const emailSubject = "Guest Feedback - Hotel Excella"
    const emailBody = `
New Guest Feedback Received

Name: ${name}
Phone: ${phone}
Room Number: ${roomNumber || "Not provided"}

What went wrong:
${issue}

How can we improve:
${improvement}

---
This feedback was submitted via the Hotel Excella website review page.
    `.trim()

    // Send email using Resend or fallback to logging
    // For production, configure Resend API key
    const resendApiKey = process.env.RESEND_API_KEY
    const recipientEmail = process.env.HOTEL_INBOX_EMAIL || "sanvigroupofhotels@gmail.com"

    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Hotel Excella <noreply@resend.dev>",
          to: [recipientEmail],
          subject: emailSubject,
          text: emailBody,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Failed to send email via Resend:", errorText)
      }
    } else {
      // Log the feedback for development
      console.log("Guest Feedback Received:")
      console.log(emailBody)
    }

    return NextResponse.json({ success: true, message: "Feedback submitted successfully" })
  } catch (error) {
    console.error("Error processing feedback:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit feedback" },
      { status: 500 }
    )
  }
}
