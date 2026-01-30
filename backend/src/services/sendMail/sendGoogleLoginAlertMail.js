import axios from "axios"

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_URL = "https://api.brevo.com/v3/smtp/email"

const APP_NAME = "ShopMaster"
const FRONTEND_URL = process.env.CLIENT_ORIGIN;
const LOGO_URL =
  "https://ik.imagekit.io/amit374/n23/myLogo.png?updatedAt=1762869433221"

export async function sendGoogleLoginAlertMail({ email, name }) {
  try {
    const payload = {
      sender: {
        name: APP_NAME,
        email: process.env.EMAIL,
      },
      to: [{ email, name }],
      subject: `🔐 New Google Login Alert | ${APP_NAME}`,
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

    <h1 style="font-size:22px; font-weight:600; margin:0 0 20px;">
      New Google Login Detected
    </h1>

    <p style="font-size:15px; line-height:1.7; color:#374151; margin-bottom:20px;">
      Hi ${name},<br/><br/>
      Your account was just signed in using <strong>Google</strong>.
      If this was you, no action is needed.
    </p>

    <div style="
      border-left:4px solid #111827;
      padding:18px 24px;
      background:#fafafa;
      margin-bottom:24px;
    ">
      <p style="margin:0; font-size:14px; color:#6b7280;">
        Login Method
      </p>
      <p style="margin:6px 0 0; font-size:16px; font-weight:600;">
        Google OAuth
      </p>

      <p style="margin-top:12px; font-size:14px; color:#6b7280;">
        Time
      </p>
      <p style="margin:6px 0 0; font-size:16px; font-weight:600;">
        ${new Date().toLocaleString()}
      </p>
    </div>

    <a
      href="${FRONTEND_URL}/user-profile"
      style="
        display:inline-block;
        margin-top:16px;
        padding:12px 28px;
        background:#111827;
        color:#ffffff;
        text-decoration:none;
        font-size:14px;
        font-weight:500;
        border-radius:6px;
      "
    >
      Review Account Activity
    </a>

    <hr style="border:none; border-top:1px solid #e5e7eb; margin:40px 0;" />

    <p style="font-size:13px; color:#6b7280; line-height:1.6;">
      If you did not perform this login, please secure your account immediately.
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

    console.log(`${APP_NAME} GOOGLE LOGIN EMAIL SENT:`, response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      `${APP_NAME} Google login email failed:`,
      error.response?.data || error.message
    )
    throw error
  }
}
