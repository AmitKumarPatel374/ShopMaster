import axios from "axios"

const BREVO_URL = "https://api.brevo.com/v3/smtp/email"
const BREVO_API_KEY = process.env.BREVO_API_KEY

const APP_NAME = "ShopMaster"
const FRONTEND_URL = "https://shopmaster.com"
const LOGO_URL = "https://ik.imagekit.io/amit374/n23/myLogo.png?updatedAt=1762869433221"

/**
 * Send email when password is successfully updated
 * @param {Object} params
 * @param {string} params.email - User email
 * @param {string} params.name - User full name
 */
export async function sendPasswordUpdatedEmail({ email, name }) {
  try {
    const payload = {
      sender: {
        name: `${APP_NAME} Security`,
        email: process.env.EMAIL,
      },
      to: [{ email, name: name || "User" }],
      subject: `Your ${APP_NAME} password was updated`,

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
      Password Updated Successfully
    </h1>

    <!-- Body -->
    <p style="font-size:15px; line-height:1.7; color:#374151; margin-bottom:24px;">
      Hello ${name || "User"},<br/><br/>
      This is a confirmation that your <strong>${APP_NAME}</strong> account password
      was successfully updated.
    </p>

    <div style="
      border-left:4px solid #111827;
      padding:16px 20px;
      margin-bottom:32px;
      background:#fafafa;
    ">
      <p style="margin:0; font-size:13px; color:#6b7280;">
        Security Reminder
      </p>
      <p style="margin:6px 0 0; font-size:14px; color:#111827;">
        Never share your password or verification codes with anyone. 
        ${APP_NAME} staff will never ask for your password.
      </p>
    </div>

    <p style="font-size:14px; color:#374151; line-height:1.6;">
      If you did not make this change, please reset your password immediately
      and contact our support team.
    </p>

    <!-- CTA -->
    <a href="${FRONTEND_URL}/login"
       style="
         display:inline-block;
         margin-top:20px;
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
      <strong style="color:#111827;">${APP_NAME} Security Team</strong><br/>
      <span style="font-size:12px;">
        This is an automated security notification. Please do not reply.
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

    console.log(`${APP_NAME} PASSWORD UPDATED EMAIL SENT:`, response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      `${APP_NAME} Password updated email failed:`,
      error.response?.data || error.message
    )
    throw error
  }
}
