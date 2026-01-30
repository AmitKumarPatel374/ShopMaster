import "dotenv/config"
import { Worker } from "bullmq"
import connection from "../config/bullmq-connection.js"
import { sendVerifyEmailOtp } from "../services/sendMail/sendVerifyEmailOtp.js"
import { sendPasswordResetEmail } from "../services/sendMail/sendPasswordResetEmail.js"
import { sendWelcomeEmail } from "../services/sendMail/sendWelcomeEmail.js"
import { sendPasswordUpdatedEmail } from "../services/sendMail/sendPasswordUpdatedEmail.js"
import { sendProductCreatedEmail } from "../services/sendMail/sendProductCreatedEmail.js"
import { sendOrderPlacedMail } from "../services/sendMail/sendOrderPlacedMail.js"
import { sendOrderPlacedSellerMail } from "../services/sendMail/sendOrderPlacedSellerMail.js"
import { sendOrderUpdateCustomerMail } from "../services/sendMail/sendOrderUpdateCustomerMail.js"
import { sendOrderUpdateSellerMail } from "../services/sendMail/sendOrderUpdateSellerMail.js"
import { sendGoogleLoginAlertMail } from "../services/sendMail/sendGoogleLoginAlertMail.js"

new Worker(
  "email-queue",
  async (job) => {
    if (job.name === "verify-email") {
      await sendVerifyEmailOtp(job.data)
    }else if(job.name==="reset-password"){
      await sendPasswordResetEmail(job.data);
    }else if(job.name==="welcome-email"){
      await sendWelcomeEmail(job.data);
    }else if(job.name==="password-updated"){
      await sendPasswordUpdatedEmail(job.data);
    }else if(job.name === "PRODUCT_CREATED"){
      await sendProductCreatedEmail(job.data);
    }else if(job.name === "order_place"){
      await sendOrderPlacedMail(job.data)
    }else if(job.name === "order_place_seller"){
      await sendOrderPlacedSellerMail(job.data);
    }else if(job.name === "update_order"){
      await sendOrderUpdateCustomerMail(job.data);
    }else if(job.name === "update_order_seller"){
      await sendOrderUpdateSellerMail(job.data);
    }else if(job.name === "google_alert"){
      // console.log(" JOB DATA :", job.data)
      await sendGoogleLoginAlertMail(job.data);
    } else {
      console.warn("⚠️ Unknown job type:", job.name)
    }
  },
  { connection, concurrency: 3 }
)

console.log("📨 Resume-Builder Email Worker running")
