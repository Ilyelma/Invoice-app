export const fmt = (val) => {
  if (val === undefined || val === null) return "0.00";
  return Number(val).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
};

export const getCatStyle = (cat, customCategories = []) => {
  const defaults = {
    "Vente": { bg: "#f0fdf4", color: "#166534" },
    "Prestation": { bg: "#eff6ff", color: "#1d4ed8" },
    "Service": { bg: "#fff7ed", color: "#9a3412" },
    "Autre": { bg: "#f3f4f6", color: "#4b5563" },
  };

  const custom = customCategories.find(c => c.name === cat);
  if (custom) return { bg: custom.bg, color: custom.color };

  return defaults[cat] || defaults["Autre"];
};
