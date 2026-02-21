import axios from "axios"

const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_URL = "https://api.brevo.com/v3/smtp/email"

const APP_NAME = "ShopMaster"
const FRONTEND_URL = process.env.CLIENT_ORIGIN

export async function sendOrderPlacedSellerMail({
  email,
  name,
  userId,
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
      subject: `New Order Notification – ${orderId}`,

      // ✅ Minimal Transactional HTML
      htmlContent: `
<div style="font-family: Arial, sans-serif; font-size:14px; color:#000; line-height:1.6;">
  <p>Hello ${name},</p>

  <p>
    A new order has been placed for one of your products.
  </p>

  <p>
    <strong>Order ID:</strong> ${orderId}<br/>
    <strong>Customer ID:</strong> ${userId}<br/>
    <strong>Order Amount:</strong> ₹ ${amountToPay}<br/>
    <strong>Date:</strong> ${new Date().toUTCString()}
  </p>

  <p>
    You can review this order here:
  </p>

  <p>
    ${FRONTEND_URL}/product/orders/seller
  </p>

  <hr/>

  <p style="font-size:12px; color:#555;">
    This is an automated seller notification regarding a recent order.
    Please do not reply to this email.
  </p>
</div>
      `,

      // ✅ Plain Text Version (Important for Deliverability)
      textContent: `
Hello ${name},

A new order has been placed for one of your products.

Order ID: ${orderId}
Customer ID: ${userId}
Order Amount: ₹ ${amountToPay}
Date: ${new Date().toUTCString()}

View order:
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

    console.log(`${APP_NAME} SELLER EMAIL SENT:`, response.data.messageId)
    return response.data
  } catch (error) {
    console.error(
      `${APP_NAME} Seller email failed:`,
      error.response?.data || error.message
    )
    throw error
  }
}