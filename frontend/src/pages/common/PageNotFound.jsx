// src/pages/NotFound.jsx
import React from "react"
import { Link } from "react-router-dom"
import { AlertTriangle } from "lucide-react"

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 px-4">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-12 max-w-lg w-full text-center border border-slate-200">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-100 p-4 rounded-full">
            <AlertTriangle className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-slate-700 mt-3">Page Not Found</h2>

        {/* Description */}
        <p className="text-slate-500 mt-4 leading-relaxed">
          The page you're looking for doesn’t exist or may have been moved. Please verify the URL or
          navigate back to the homepage.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Go to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-6 py-3 rounded-lg transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-400 mt-8">Error Code: 404 | PowerSell</p>
      </div>
    </div>
  )
}

export default PageNotFound
