import axios from "axios"

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_URL = "https://api.brevo.com/v3/smtp/email"

const APP_NAME = "ShopMaster"
const FRONTEND_URL = process.env.CLIENT_ORIGIN

export async function sendOrderPlacedMail({
  email,
  name,
  amountToPay,
  orderId,
}) {
  try {
    const payload = {
      sender: {
        name: APP_NAME,
        email: process.env.EMAIL, // should be domain-based (no-reply@yourdomain.com)
      },
      to: [{ email, name }],
      subject: `Order Confirmation – ${orderId}`,

      // ✅ HTML Version (Minimal Transactional)
      htmlContent: `
<div style="font-family: Arial, sans-serif; font-size:14px; color:#000; line-height:1.6;">
  <p>Hello ${name},</p>

  <p>
    This email confirms that your order has been successfully placed.
  </p>

  <p>
    <strong>Order ID:</strong> ${orderId}<br/>
    <strong>Total Amount:</strong> ₹ ${amountToPay}<br/>
    <strong>Date:</strong> ${new Date().toUTCString()}
  </p>

  <p>
    You can track your order status using the link below:
  </p>

  <p>
    ${FRONTEND_URL}/product/orders/track/${orderId}
  </p>

  <p>
    If you did not place this order, please contact support immediately.
  </p>

  <hr/>

  <p style="font-size:12px; color:#555;">
    This is an automated transactional message regarding your recent purchase.
    Please do not reply to this email.
  </p>
</div>
      `,

      // ✅ Plain Text Version (IMPORTANT for deliverability)
      textContent: `
Hello ${name},

Your order has been successfully placed.

Order ID: ${orderId}
Total Amount: ₹ ${amountToPay}
Date: ${new Date().toUTCString()}

Track your order:
${FRONTEND_URL}/product/orders/track/${orderId}

If you did not place this order, contact support immediately.

This is an automated transactional message.
      `,
    }

    const response = await axios.post(BREVO_URL, payload, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    })

    console.log(`${APP_NAME} ORDER EMAIL SENT:`, response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      `${APP_NAME} Order email failed:`,
      error.response?.data || error.message
    )
    throw error
  }
}