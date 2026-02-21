import axios from "axios"

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_URL = "https://api.brevo.com/v3/smtp/email"

const APP_NAME = "ShopMaster"

export async function sendOtpEmailFacebook({
  email,
  name,
  otp,
  purpose = "Email Verification",
}) {
  try {
    const payload = {
      sender: {
        name: APP_NAME,
        email: process.env.EMAIL, // must be domain-based
      },
      to: [
        {
          email,
          name: name || "User",
        },
      ],
      subject: `Security Code – ${APP_NAME}`,

      // ✅ Minimal Transactional HTML
      htmlContent: `
<div style="font-family: Arial, sans-serif; font-size:14px; color:#000; line-height:1.6;">
  <p>Hello ${name || "User"},</p>

  <p>
    Your one-time security code is provided below.
    This code is valid for 10 minutes.
  </p>

  <p style="font-size:24px; font-weight:bold; letter-spacing:4px;">
    ${otp}
  </p>

  <p>
    Purpose: ${purpose}<br/>
    Generated On: ${new Date().toUTCString()}
  </p>

  <p>
    If you did not request this code, please ignore this email.
  </p>

  <hr/>

  <p style="font-size:12px; color:#555;">
    This is an automated security message.
    Please do not reply to this email.
  </p>
</div>
      `,

      // ✅ Plain Text Version (Important for deliverability)
      textContent: `
Hello ${name || "User"},

Your one-time security code is:

${otp}

This code is valid for 10 minutes.
Purpose: ${purpose}
Generated On: ${new Date().toUTCString()}

If you did not request this code, you may ignore this email.

This is an automated security message.
      `,
    }

    const response = await axios.post(BREVO_URL, payload, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    })

    console.log(`${APP_NAME} OTP EMAIL SENT:`, response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      `${APP_NAME} OTP email failed:`,
      error.response?.data || error.message
    )
    throw error
  }
}