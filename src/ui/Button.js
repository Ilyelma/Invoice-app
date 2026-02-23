import React from "react";

const Button = ({ label, onClick, bg = "#1a1a2e", color = "#fff", disabled = false, style = {} }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#e5e7eb" : bg,
        color: disabled ? "#9ca3af" : color,
        border: "none",
        borderRadius: 10,
        padding: "12px 24px",
        fontSize: 14,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "transform 0.1s, opacity 0.1s",
        ...style
      }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.opacity = 0.9)}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.opacity = 1)}
    >
      {label}
    </button>
  );
};

export const SmallBtn = ({ label, onClick, bg = "#f3f4f6", color = "#374151", style = {} }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        color: color,
        border: "none",
        borderRadius: 7,
        padding: "5px 12px",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        ...style
      }}
    >
      {label}
    </button>
  );
};

export default Button;
