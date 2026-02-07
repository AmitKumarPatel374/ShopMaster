import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import apiInstance from "../../config/apiInstance"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { Mail, ArrowRight, ShieldCheck } from "lucide-react"

const AddEmail = () => {
  const [params] = useSearchParams()
  const facebookId = params.get("fid")

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const sendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email")
      return
    }

    try {
      setLoading(true)
      await apiInstance.post("/auth/add-email", {
        email,
        facebookId,
      })
      toast.success("OTP sent to your email")

      navigate(`/auth/verify-email?fid=${facebookId}&email=${encodeURIComponent(email)}`)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP")
    } finally {
      setLoading(false)
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
          <div className="bg-blue-100 p-4 rounded-full mb-3">
            <ShieldCheck
              className="text-blue-600"
              size={32}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Secure Your Account</h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Facebook didn’t share your email. Add one to protect your account.
          </p>
        </div>

        {/* Email Input */}
        <div className="relative mb-4">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
          />
        </div>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={sendOtp}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-indigo-300/40 transition disabled:opacity-70"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
          {!loading && <ArrowRight size={18} />}
        </motion.button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-4">
          We’ll send a 6-digit verification code to your email. This helps keep your account safe.
        </p>
      </motion.div>
    </div>
  )
}

export default AddEmail
