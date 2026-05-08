import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, roomNumber, issue, improvement, rating } = body

    // Format the email content
    const numericRating = typeof rating === "number" ? Math.min(5, Math.max(1, rating)) : null
    const starRatingLine = numericRating
      ? `${"★".repeat(numericRating)}${"☆".repeat(5 - numericRating)} (${numericRating}/5)`
      : "Not provided"

    const emailSubject = "Guest Feedback - Hotel Excella"
    const emailBody = `
New Guest Feedback Received

Name: ${name}
Phone: ${phone}
Room Number: ${roomNumber || "Not provided"}
Rating: ${starRatingLine}

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
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Hotel Excella <onboarding@resend.dev>"

    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          subject: emailSubject,
          text: emailBody,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Failed to send email via Resend:", errorText)
        return NextResponse.json(
          { success: false, message: "Failed to send feedback email" },
          { status: 502 }
        )
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
