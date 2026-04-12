import React from "react"
import { Link } from "react-router-dom"
import { AlertTriangle, ArrowLeft, Home } from "lucide-react"

const PageNotFound = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Grid Overlay */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      ></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl text-center">

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div
            className="
              w-24 h-24
              rounded-full
              bg-white/10
              border border-white/10
              flex items-center justify-center
              backdrop-blur-xl
              shadow-2xl
            "
          >
            <AlertTriangle className="w-12 h-12 text-indigo-400" />
          </div>
        </div>

        {/* 404 */}
        <h1
          className="
            text-[110px]
            sm:text-[150px]
            font-black
            leading-none
            tracking-tight
            text-white
          "
        >
          404
        </h1>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-bold text-white mt-4">
          Lost in Space
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          The page you are trying to access doesn’t exist,
          may have been removed, or the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            to="/"
            className="
              flex items-center gap-2
              bg-indigo-600 hover:bg-indigo-700
              text-white
              px-7 py-3.5
              rounded-xl
              font-semibold
              transition-all duration-300
              shadow-lg hover:shadow-indigo-500/30
            "
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
              flex items-center gap-2
              border border-white/10
              bg-white/5 hover:bg-white/10
              backdrop-blur-lg
              text-white
              px-7 py-3.5
              rounded-xl
              font-semibold
              transition-all duration-300
            "
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="text-gray-600 text-sm mt-14 tracking-wide">
          ERROR 404 • PAGE NOT FOUND
        </p>
      </div>
    </div>
  )
}

export default PageNotFound