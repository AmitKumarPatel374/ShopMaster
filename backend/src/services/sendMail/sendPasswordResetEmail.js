import axios from "axios"

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_URL = "https://api.brevo.com/v3/smtp/email"

const APP_NAME = "ShopMaster"
const FRONTEND_URL = "https://shopmaster.com" // optional
const LOGO_URL = "https://ik.imagekit.io/amit374/n23/myLogo.png?updatedAt=1762869433221"

/**
 * Send password reset email
 * @param {Object} params
 * @param {string} params.email - User email
 * @param {string} params.fullname - User full name
 * @param {string} params.resetLink - Secure reset link
 */
export async function sendPasswordResetEmail({
  email,
  fullname,
  resetLink,
}) {
  try {
    const payload = {
      sender: {
        name: `${APP_NAME} Security`,
        email: process.env.EMAIL,
      },
      to: [{ email, name: fullname || "User" }],
      subject: `Reset your password | ${APP_NAME}`,

      htmlContent: `
<div style="font-family: Inter, Arial, sans-serif; background:#ffffff; padding:40px;">
  <div style="max-width:620px; margin:0 auto; color:#111827;">

    <!-- Brand -->
    <div style="margin-bottom:24px;">
      <img 
        src="${LOGO_URL}" 
        alt="${APP_NAME} Logo" 
        style="width:64px; height:auto; margin-bottom:12px;" 
      />
      <p style="font-size:14px; color:#6b7280; margin:0;">
        ${APP_NAME} Security
      </p>
    </div>

    <!-- Heading -->
    <h1 style="font-size:22px; font-weight:600; margin:0 0 20px;">
      Reset your password
    </h1>

    <!-- Body -->
    <p style="font-size:15px; line-height:1.7; color:#374151; margin-bottom:24px;">
      Hello ${fullname || "User"},<br/><br/>
      We received a request to reset your password. Click the button below to
      create a new one. This link will expire in <strong>5 minutes</strong> for
      security reasons.
    </p>

    <!-- CTA -->
    <a href="${resetLink}"
       target="_blank"
       style="
         display:inline-block;
         margin-top:8px;
         padding:12px 28px;
         background:#111827;
         color:#ffffff;
         text-decoration:none;
         font-size:14px;
         font-weight:500;
         border-radius:6px;
       ">
      Reset Password
    </a>

    <p style="font-size:14px; color:#374151; line-height:1.6; margin-top:24px;">
      If you did not request this email, you can safely ignore it. Your password
      will remain unchanged.
    </p>

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

    console.log(`${APP_NAME} PASSWORD RESET EMAIL SENT:`, response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      `${APP_NAME} Password reset email failed:`,
      error.response?.data || error.message
    )
    throw error
  }
}
