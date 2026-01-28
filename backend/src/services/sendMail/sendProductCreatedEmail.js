import axios from "axios"

const BREVO_URL = "https://api.brevo.com/v3/smtp/email"
const BREVO_API_KEY = process.env.BREVO_API_KEY

const APP_NAME = "ShopMaster"
const SELLER_DASHBOARD_URL = "http://localhost:5173/view-seller-products/6913373f9fd78f71b5f6470c"

/**
 * Inbox-optimized product created email
 */
export async function sendProductCreatedEmail({
  email,
  name,
  product,
}) {
  try {
    const subject = `${APP_NAME}: Product created successfully`

    const payload = {
      sender: {
        name: APP_NAME,
        email: process.env.EMAIL,
      },
      to: [{ email, name: name || "Seller" }],
      subject,

      // ✅ Plain text fallback (important for inbox placement)
      textContent: `
Hello ${name || "Seller"},

Your product has been successfully created on ${APP_NAME}.

Product Details:
Title: ${product.title}
Brand: ${product.brand}
Category: ${product.category}
Price: ${product.currency} ${product.price}

Manage your product:
${SELLER_DASHBOARD_URL}

If you did not create this product, please contact our support team.

– ${APP_NAME} Team
      `.trim(),

      // ✅ Light HTML (transactional look, not promotional)
      htmlContent: `
<div style="font-family: Arial, sans-serif; background:#ffffff; padding:24px;">
  <div style="max-width:600px; margin:0 auto; color:#111827;">

    <p style="font-size:16px; font-weight:600; margin-bottom:12px;">
      ${APP_NAME}
    </p>

    <h2 style="font-size:18px; font-weight:600; margin-bottom:16px;">
      Product created successfully
    </h2>

    <p style="font-size:14px; line-height:1.6; color:#374151;">
      Hello ${name || "Seller"},<br/><br/>
      Your product has been successfully created on ${APP_NAME}. Below are the product details:
    </p>

    <div style="border:1px solid #e5e7eb; padding:12px; margin:16px 0;">
      <p style="margin:4px 0;"><strong>Title:</strong> ${product.title}</p>
      <p style="margin:4px 0;"><strong>Brand:</strong> ${product.brand}</p>
      <p style="margin:4px 0;"><strong>Category:</strong> ${product.category}</p>
      <p style="margin:4px 0;">
        <strong>Price:</strong> ${product.currency} ${product.price}
      </p>
    </div>

    <p style="font-size:14px;">
      Manage your product:
      <br/>
      <a href="${SELLER_DASHBOARD_URL}" style="color:#2563eb;">
        ${SELLER_DASHBOARD_URL}
      </a>
    </p>

    <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />

    <p style="font-size:12px; color:#6b7280;">
      This is an automated message from ${APP_NAME}. If you did not create this product, please contact support.
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

    console.log("📦 PRODUCT EMAIL SENT (INBOX MODE):", response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      "Product email failed:",
      error.response?.data || error.message
    )
    throw error
  }
}
