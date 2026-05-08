import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      guestName,
      mobile,
      email,
      checkIn,
      checkOut,
      adults,
      children,
      rooms = "1",
      roomPreference,
      specialRequests,
    } = body
    const submissionTimestamp = new Date().toISOString()


    const calculateStayNights = (startDate: string, endDate: string) => {
      if (!startDate || !endDate) return 0
      const start = new Date(`${startDate}T00:00:00`)
      const end = new Date(`${endDate}T00:00:00`)
      const diff = end.getTime() - start.getTime()
      if (Number.isNaN(diff) || diff <= 0) return 0
      return Math.ceil(diff / (1000 * 60 * 60 * 24))
    }

    const stayNights = calculateStayNights(checkIn, checkOut)

    // Format the email content for hotel
    const hotelEmailSubject = "New Booking Request - Hotel Excella"
    const hotelEmailBody = `
New Booking Request Received

Guest Details:
--------------
Name: ${guestName}
Mobile: ${mobile}
Email: ${email}

Booking Details:
----------------
Check-in Date: ${checkIn}
Check-out Date: ${checkOut}
Number of Nights: ${stayNights}
Adults: ${adults}
Children: ${children}
Number of Rooms: ${rooms}
Room Preference: ${roomPreference}

Special Requests:
${specialRequests || "None"}

Submission Timestamp: ${submissionTimestamp}

---
This booking request was submitted via the Hotel Excella website.
Please follow up with the guest promptly.
    `.trim()

    // Format confirmation email for guest
    const guestEmailSubject = "Booking Request Received - Hotel Excella Vizag"
    const guestEmailBody = `
Dear ${guestName},

Thank you for your booking request at Hotel Excella Vizag!

Your Request Details:
--------------------
Check-in: ${checkIn}
Check-out: ${checkOut}
Nights: ${stayNights}
Room: ${roomPreference}
Guests: ${adults} Adults, ${children} Children
Rooms: ${rooms}
Submitted At: ${submissionTimestamp}

Our team will contact you shortly to confirm availability and complete your booking.

For immediate assistance, please contact us:
Phone: +91 99859 08131 / +91 89594 44555
WhatsApp: +91 99859 08131
Email: sanvigroupofhotels@gmail.com

We look forward to hosting you!

Warm regards,
Hotel Excella Team
Visakhapatnam
    `.trim()

    // Send emails using Resend or fallback to logging
    const resendApiKey = process.env.RESEND_API_KEY
    const recipientEmail = process.env.HOTEL_INBOX_EMAIL || "sanvigroupofhotels@gmail.com"
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Hotel Excella <onboarding@resend.dev>"

    if (resendApiKey) {
      // Send to hotel
      const hotelEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          subject: hotelEmailSubject,
          text: hotelEmailBody,
        }),
      })

      if (!hotelEmailResponse.ok) {
        const errorText = await hotelEmailResponse.text()
        console.error("Failed to send booking request email via Resend:", errorText)
      }

      // Send confirmation to guest
      if (email) {
        const guestEmailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [email],
            subject: guestEmailSubject,
            text: guestEmailBody,
          }),
        })

        if (!guestEmailResponse.ok) {
          const errorText = await guestEmailResponse.text()
          console.error("Failed to send guest confirmation email via Resend:", errorText)
        }
      }
    } else {
      // Log for development
      console.log("Booking Request Received:")
      console.log(hotelEmailBody)
      console.log("\nGuest Confirmation:")
      console.log(guestEmailBody)
    }

    return NextResponse.json({ 
      success: true, 
      message: "Booking request submitted successfully",
      redirectUrl: "https://hotelexcella.bookmystay.io/"
    })
  } catch (error) {
    console.error("Error processing booking request:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit booking request" },
      { status: 500 }
    )
  }
}
