import React from "react";

const Badge = ({ text, color = "blue" }) => {
  const colors = {
    blue: { bg: "#eff6ff", text: "#1d4ed8" },
    green: { bg: "#f0fdf4", text: "#166534" },
    orange: { bg: "#fff7ed", text: "#9a3412" },
    red: { bg: "#fef2f2", text: "#991b1b" },
    gray: { bg: "#f3f4f6", text: "#4b5563" },
    gold: { bg: "#fcf8e3", text: "#8a6d3b" },
  };

  const { bg, text: textColor } = colors[color] || colors.blue;

  return (
    <span style={{
      background: bg,
      color: textColor,
      borderRadius: 20,
      padding: "2px 10px",
      fontSize: 11,
      fontWeight: 700,
      whiteSpace: "nowrap"
    }}>
      {text}
    </span>
  );
};

export default Badge;
