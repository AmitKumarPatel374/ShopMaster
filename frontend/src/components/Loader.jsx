import React from "react"

const Loader = ({ text = "Fetching Orders..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      
      {/* Animated Ring */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-indigo-400 border-b-transparent animate-spin [animation-direction:reverse]"></div>
      </div>

      <p className="mt-6 text-white font-semibold tracking-wide text-sm">
        {text}
      </p>
    </div>
  )
}

export default Loader
