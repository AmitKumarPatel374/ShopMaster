import axios from "axios"

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_URL = "https://api.brevo.com/v3/smtp/email"

const APP_NAME = "ShopMaster"
const FRONTEND_URL = process.env.CLIENT_ORIGIN

export async function sendOrderUpdateCustomerMail({
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
      subject: `Order Status Update – ${order_id}`,

      // ✅ Minimal Transactional HTML
      htmlContent: `
<div style="font-family: Arial, sans-serif; font-size:14px; color:#000; line-height:1.6;">
  <p>Hello ${name},</p>

  <p>
    This is to inform you that your order status has been updated.
  </p>

  <p>
    <strong>Order ID:</strong> ${order_id}<br/>
    <strong>Status:</strong> ${orderStatus}<br/>
    <strong>Current Location:</strong> ${currentLocation}<br/>
    <strong>Payment Status:</strong> ${paymentStatus}<br/>
    <strong>Updated On:</strong> ${new Date().toUTCString()}
  </p>

  <p>
    You can track your order here:
  </p>

  <p>
    ${FRONTEND_URL}/product/orders/track/${order_id}
  </p>

  <p>
    If you have any concerns regarding this update, please contact support.
  </p>

  <hr/>

  <p style="font-size:12px; color:#555;">
    This is an automated transactional notification regarding your order.
    Please do not reply to this email.
  </p>
</div>
      `,

      // ✅ Plain Text Version (Important for Deliverability)
      textContent: `
Hello ${name},

Your order status has been updated.

Order ID: ${order_id}
Status: ${orderStatus}
Current Location: ${currentLocation}
Payment Status: ${paymentStatus}
Updated On: ${new Date().toUTCString()}

Track your order:
${FRONTEND_URL}/product/orders/track/${order_id}

If you have any concerns, please contact support.

This is an automated transactional notification.
      `,
    }

    const response = await axios.post(BREVO_URL, payload, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    })

    console.log(
      `${APP_NAME} CUSTOMER UPDATE EMAIL SENT:`,
      response.data.messageId
    )
    return response.data
  } catch (error) {
    console.error(
      `${APP_NAME} Customer update email failed:`,
      error.response?.data || error.message
    )
    throw error
  }
}