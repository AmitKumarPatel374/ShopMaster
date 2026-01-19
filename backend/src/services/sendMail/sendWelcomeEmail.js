import axios from "axios"

const BREVO_URL = "https://api.brevo.com/v3/smtp/email"
const BREVO_API_KEY = process.env.BREVO_API_KEY

const APP_NAME = "ShopMaster"
const FRONTEND_URL = "https://shopmaster.com"
const SELLER_DASHBOARD_URL = "https://shopmaster.com/seller/dashboard"

const LOGO_URL = "https://ik.imagekit.io/amit374/n23/myLogo.png?updatedAt=1762869433221"

/**
 * Send welcome email based on user role
 * @param {Object} params
 * @param {string} params.email - User email
 * @param {string} params.name - User full name
 * @param {"user" | "seller"} params.role - User role
 */
export async function sendWelcomeEmail({ email, name, role }) {
  try {
    const isSeller = role === "seller"

    const subject = isSeller
      ? `Welcome to ${APP_NAME} Seller Center 🎉`
      : `Welcome to ${APP_NAME} 🎉`

    const heading = isSeller
      ? "Welcome to the Seller Center"
      : "Welcome to ShopMaster"

    const bodyPrimary = isSeller
      ? `Your seller account has been successfully verified and is now active.
         You can start listing products, managing orders, and growing your store on ${APP_NAME}.`
      : `Your email address has been successfully verified and your
         ${APP_NAME} account is now active.`

    const bodySecondary = isSeller
      ? `Head to your dashboard to add your first product and customize your store.`
      : `You can now browse products, place orders, and track your purchases
         directly from your dashboard.`

    const ctaText = isSeller ? "Go to Seller Dashboard" : "Go to ShopMaster"
    const ctaLink = isSeller ? SELLER_DASHBOARD_URL : FRONTEND_URL

    const payload = {
      sender: {
        name: APP_NAME,
        email: process.env.EMAIL,
      },
      to: [{ email, name: name || "User" }],
      subject,

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
        ${APP_NAME}
      </p>
    </div>

    <!-- Heading -->
    <h1 style="font-size:22px; font-weight:600; margin:0 0 20px;">
      ${heading}
    </h1>

    <!-- Body -->
    <p style="font-size:15px; line-height:1.7; color:#374151; margin-bottom:24px;">
      Hello ${name || "User"},<br/><br/>
      ${bodyPrimary}
    </p>

    <p style="font-size:15px; line-height:1.7; color:#374151; margin-bottom:24px;">
      ${bodySecondary}
    </p>

    <!-- CTA -->
    <a href="${ctaLink}"
       style="
         display:inline-block;
         margin-top:8px;
         padding:12px 28px;
         border:1.5px solid #111827;
         color:#111827;
         text-decoration:none;
         font-size:14px;
         font-weight:500;
         border-radius:6px;
       ">
      ${ctaText}
    </a>

    <hr style="border:none; border-top:1px solid #e5e7eb; margin:40px 0;" />

    <!-- Footer -->
    <p style="font-size:13px; color:#6b7280; line-height:1.6;">
      Best regards,<br/>
      <strong style="color:#111827;">${APP_NAME} Team</strong><br/>
      <span style="font-size:12px;">
        Build smarter. Shop faster.
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

    console.log(`${APP_NAME} WELCOME EMAIL SENT (${role}):`, response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      `${APP_NAME} Welcome email failed:`,
      error.response?.data || error.message
    )
    throw error
  }
}
