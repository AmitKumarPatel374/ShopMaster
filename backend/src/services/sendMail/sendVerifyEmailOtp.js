import axios from "axios"

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_URL = "https://api.brevo.com/v3/smtp/email"

const APP_NAME = "ShopMaster"
const FRONTEND_URL = "https://shopmaster.com" // change if needed
const LOGO_URL = "https://ik.imagekit.io/amit374/n23/myLogo.png?updatedAt=1762869433221"

export async function sendVerifyEmailOtp({
  email,
  username,
  otp,
  otpExpiry
}) {
  try {
    const expiryMinutes = Math.max(
      1,
      Math.floor((new Date(otpExpiry).getTime() - Date.now()) / 60000)
    )

    const payload = {
      sender: {
        name: APP_NAME,
        email: process.env.EMAIL,
      },
      to: [{ email, name: username || "User" }],
      subject: `Verify your email | ${APP_NAME}`,

      htmlContent: `
<div style="font-family: Inter, Arial, sans-serif; background:#ffffff; padding:40px;">
  <div style="max-width:620px; margin:0 auto; color:#111827;">

    <!-- Brand -->
    <div style="margin-bottom:24px;">
      <img 
        src="${LOGO_URL}" 
        alt="${APP_NAME} Logo" 
        style="width:64px; height:64px; border-radius:50%; margin-bottom:12px;" 
      />
      <p style="font-size:14px; color:#6b7280; margin:0;">
        ${APP_NAME} Security
      </p>
    </div>

    <!-- Heading -->
    <h1 style="font-size:22px; font-weight:600; margin:0 0 20px;">
      Verify your email address
    </h1>

    <!-- Body -->
    <p style="font-size:15px; line-height:1.7; color:#374151; margin-bottom:24px;">
      Hello ${username || "User"},<br/><br/>
      To complete your registration, please use the verification code below.
      This code will expire in <strong>${expiryMinutes} minutes</strong>.
    </p>

    <!-- OTP Box -->
    <div style="
      border-left:4px solid #111827;
      padding:18px 24px;
      margin-bottom:32px;
      background:#fafafa;
    ">
      <p style="margin:0; font-size:13px; color:#6b7280;">
        Your verification code
      </p>
      <p style="
        margin:8px 0 0;
        font-size:28px;
        font-weight:600;
        letter-spacing:6px;
        color:#111827;
      ">
        ${otp}
      </p>
    </div>

    <p style="font-size:14px; color:#374151; line-height:1.6;">
      If you did not request this email, you can safely ignore it.
    </p>

    <!-- CTA -->
    <a href="${FRONTEND_URL}"
       style="
         display:inline-block;
         margin-top:24px;
         padding:12px 28px;
         border:1.5px solid #111827;
         color:#111827;
         text-decoration:none;
         font-size:14px;
         font-weight:500;
         border-radius:6px;
       ">
      Go to ${APP_NAME}
    </a>

    <hr style="border:none; border-top:1px solid #e5e7eb; margin:40px 0;" />

    <!-- Footer -->
    <p style="font-size:13px; color:#6b7280; line-height:1.6;">
      Best regards,<br/>
      <strong style="color:#111827;">${APP_NAME} Team</strong><br/>
      <span style="font-size:12px;">
        This is an automated security email. Please do not reply.
      </span>
    </p>

  </div>
</div>
      `,
    }

    const response = await axios.post(BREVO_URL, payload, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    })

    console.log(`${APP_NAME} VERIFY EMAIL OTP SENT:`, response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      `${APP_NAME} Verify email OTP failed:`,
      error.response?.data || error.message
    )
    throw error
  }
}
