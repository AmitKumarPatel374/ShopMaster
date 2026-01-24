import axios from "axios"

const BREVO_URL = "https://api.brevo.com/v3/smtp/email"
const BREVO_API_KEY = process.env.BREVO_API_KEY

const APP_NAME = "ShopMaster"
const SELLER_DASHBOARD_URL = "https://shopmaster.com/seller/dashboard"

const LOGO_URL =
  "https://ik.imagekit.io/amit374/n23/myLogo.png?updatedAt=1762869433221"

/**
 * Send product created email
 */
export async function sendProductCreatedEmail({
  email,
  name,
  product,
}) {
  try {
    const subject = `Your product is live on ${APP_NAME} 🚀`

    const payload = {
      sender: {
        name: APP_NAME,
        email: process.env.EMAIL,
      },
      to: [{ email, name: name || "Seller" }],
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
      Product Successfully Created 🎉
    </h1>

    <!-- Body -->
    <p style="font-size:15px; line-height:1.7; color:#374151; margin-bottom:24px;">
      Hello ${name || "Seller"},<br/><br/>
      Your product has been successfully listed on ${APP_NAME}. Here are the details:
    </p>

    <!-- Product Card -->
    <div style="
      border:1px solid #e5e7eb;
      border-radius:10px;
      padding:16px;
      margin-bottom:24px;
      display:flex;
      gap:16px;
      align-items:center;
    ">
      <img 
        src="${product.image}" 
        alt="${product.title}"
        style="width:80px; height:80px; object-fit:cover; border-radius:8px;"
      />

      <div>
        <p style="font-size:16px; font-weight:600; margin:0 0 6px;">
          ${product.title}
        </p>
        <p style="font-size:14px; color:#6b7280; margin:0 0 4px;">
          Brand: ${product.brand}
        </p>
        <p style="font-size:14px; color:#6b7280; margin:0 0 4px;">
          Category: ${product.category}
        </p>
        <p style="font-size:15px; font-weight:500; margin:0;">
          Price: ${product.currency} ${product.price}
        </p>
      </div>
    </div>

    <!-- CTA -->
    <a href="${SELLER_DASHBOARD_URL}"
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
      Manage Products
    </a>

    <hr style="border:none; border-top:1px solid #e5e7eb; margin:40px 0;" />

    <!-- Footer -->
    <p style="font-size:13px; color:#6b7280; line-height:1.6;">
      Best regards,<br/>
      <strong style="color:#111827;">${APP_NAME} Team</strong><br/>
      <span style="font-size:12px;">
        Build smarter. Sell faster.
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

    console.log("📦 PRODUCT EMAIL SENT:", response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      "Product email failed:",
      error.response?.data || error.message
    )
    throw error
  }
}
