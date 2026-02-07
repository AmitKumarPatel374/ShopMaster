import React from "react";

const Loader = ({
  size = 50,
  text = "Loading...",
  fullscreen = false,
}) => {
  return (
    <div
      style={{
        position: fullscreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        width: fullscreen ? "100vw" : "100%",
        height: fullscreen ? "100vh" : "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: fullscreen ? "rgba(255,255,255,0.7)" : "transparent",
        zIndex: 9999,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          border: "5px solid #e5e7eb",
          borderTop: "5px solid #2563eb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      {text && (
        <p style={{ marginTop: 15, fontSize: 14, color: "#374151" }}>
          {text}
        </p>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
