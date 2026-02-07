import { useState, useEffect, useContext } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import apiInstance from "../../config/apiInstance"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { ShieldCheck, RefreshCw, ArrowRight } from "lucide-react"
import { usercontext } from "../../context/DataContext"

const RESEND_TIME = 60 // seconds

const maskEmail = (email = "") => {
  const [name, domain] = email.split("@")
  if (!name || !domain) return email
  return `${name.slice(0, 2)}***@${domain}`
}

const VerifyFacebookEmail = () => {
  const [params] = useSearchParams()
  const facebookId = params.get("fid")
  const email = params.get("email")
  const { checkAuth } = useContext(usercontext)

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(RESEND_TIME)
  const navigate = useNavigate()

  // Countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return

    const interval = setInterval(() => {
      setResendTimer((t) => t - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [resendTimer])

  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP")
      return
    }

    try {
      setLoading(true)
      await apiInstance.post("/auth/verify-email", {
        facebookId,
        otp,
      })

      await checkAuth() // 🔥 sync frontend state with backend cookie
      toast.success("Email verified successfully!")
      navigate("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    try {
      await apiInstance.post("/auth/add-email", {
        email,
        facebookId,
      })
      toast.success("New OTP sent to email")
      setResendTimer(RESEND_TIME)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-200"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 p-4 rounded-full mb-3">
            <ShieldCheck
              className="text-green-600"
              size={32}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
          <p className="text-sm text-gray-500 text-center mt-1">Enter the 6-digit code sent to</p>
          <p className="text-sm font-semibold text-gray-700 mt-1">{maskEmail(email)}</p>
        </div>

        {/* OTP Input */}
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          className="w-full text-center tracking-widest text-lg border rounded-xl py-3 mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        {/* Verify Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={verifyOtp}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-green-300/40 transition disabled:opacity-70"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
          {!loading && <ArrowRight size={18} />}
        </motion.button>

        {/* Resend Section */}
        <div className="text-center mt-4">
          {resendTimer > 0 ? (
            <p className="text-xs text-gray-500">
              Resend OTP in <span className="font-semibold">{resendTimer}s</span>
            </p>
          ) : (
            <button
              onClick={resendOtp}
              className="flex items-center justify-center gap-2 mx-auto text-sm font-medium text-blue-600 hover:underline"
            >
              <RefreshCw size={16} />
              Resend OTP
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Didn’t receive the email? Check your spam folder or try resending the code.
        </p>
      </motion.div>
    </div>
  )
}

export default VerifyFacebookEmail
