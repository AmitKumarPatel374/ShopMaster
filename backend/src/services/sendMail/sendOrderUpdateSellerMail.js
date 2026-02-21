import axios from "axios"

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_URL = "https://api.brevo.com/v3/smtp/email"

const APP_NAME = "ShopMaster"
const FRONTEND_URL = process.env.CLIENT_ORIGIN

export async function sendOrderUpdateSellerMail({
  email,
  name,
  orderStatus,
  currentLocation,
  paymentStatus,
  order_id,
}) {
  try {
    const payload = {
      sender: {
        name: APP_NAME,
        email: process.env.EMAIL, // must be domain-based sender
      },
      to: [{ email, name }],
      subject: `Order Update Notification – ${order_id}`,

      // ✅ Minimal Transactional HTML
      htmlContent: `
<div style="font-family: Arial, sans-serif; font-size:14px; color:#000; line-height:1.6;">
  <p>Hello ${name},</p>

  <p>
    An order associated with your products has been updated.
  </p>

  <p>
    <strong>Order ID:</strong> ${order_id}<br/>
    <strong>Status:</strong> ${orderStatus}<br/>
    <strong>Current Location:</strong> ${currentLocation}<br/>
    <strong>Payment Status:</strong> ${paymentStatus}<br/>
    <strong>Updated On:</strong> ${new Date().toUTCString()}
  </p>

  <p>
    You can review the order here:
  </p>

  <p>
    ${FRONTEND_URL}/product/orders/seller
  </p>

  <hr/>

  <p style="font-size:12px; color:#555;">
    This is an automated seller notification regarding an order update.
    Please do not reply to this email.
  </p>
</div>
      `,

      // ✅ Plain Text Version (Improves Deliverability)
      textContent: `
Hello ${name},

An order associated with your products has been updated.

Order ID: ${order_id}
Status: ${orderStatus}
Current Location: ${currentLocation}
Payment Status: ${paymentStatus}
Updated On: ${new Date().toUTCString()}

Review order:
${FRONTEND_URL}/product/orders/seller

This is an automated seller notification.
      `,
    }

    const response = await axios.post(BREVO_URL, payload, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    })

    console.log(
      `${APP_NAME} SELLER UPDATE EMAIL SENT:`,
      response.data.messageId
    )
    return response.data
  } catch (error) {
    console.error(
      `${APP_NAME} Seller update email failed:`,
      error.response?.data || error.message
    )
    throw error
  }
}