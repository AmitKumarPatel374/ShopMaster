import axios from "axios"

const BREVO_URL = "https://api.brevo.com/v3/smtp/email"
const BREVO_API_KEY = process.env.BREVO_API_KEY

const APP_NAME = "ShopMaster"

export async function sendProductCreatedEmail({
  email,
  name,
  product,
  sellerDashboardUrl,
}) {
  try {
    const subject = `Product Created – ${APP_NAME}`

    const payload = {
      sender: {
        name: APP_NAME,
        email: process.env.EMAIL, // must be domain-based sender
      },
      to: [{ email, name: name || "Seller" }],
      subject,

      // ✅ Plain Text (Primary Deliverability Booster)
      textContent: `
Hello ${name || "Seller"},

Your product has been successfully created.

Product Details:
Title: ${product.title}
Brand: ${product.brand}
Category: ${product.category}
Price: ${product.currency} ${product.price}

Created On: ${new Date().toUTCString()}

Manage your product:
${sellerDashboardUrl}

If you did not create this product, please contact support.

This is an automated system notification.
      `.trim(),

      // ✅ Minimal Transactional HTML
      htmlContent: `
<div style="font-family: Arial, sans-serif; font-size:14px; color:#000; line-height:1.6;">
  <p>Hello ${name || "Seller"},</p>

  <p>
    Your product has been successfully created.
  </p>

  <p>
    <strong>Title:</strong> ${product.title}<br/>
    <strong>Brand:</strong> ${product.brand}<br/>
    <strong>Category:</strong> ${product.category}<br/>
    <strong>Price:</strong> ${product.currency} ${product.price}<br/>
    <strong>Created On:</strong> ${new Date().toUTCString()}
  </p>

  <p>
    Manage your product here:
  </p>

  <p>
    ${sellerDashboardUrl}
  </p>

  <hr/>

  <p style="font-size:12px; color:#555;">
    This is an automated system notification from ${APP_NAME}.
    Please do not reply to this email.
  </p>
</div>
      `,
    }

    const response = await axios.post(BREVO_URL, payload, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    })

    console.log("PRODUCT CREATED EMAIL SENT:", response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      "Product email failed:",
      error.response?.data || error.message
    )
    throw error
  }
}