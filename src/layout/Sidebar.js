import React from "react";

const Sidebar = ({ page, setPage, logoUrl, companyInfo, logout, canWrite }) => {
  const GOLD = "#c5a059";
  const DARK = "#1a1a2e";

  const MenuItem = ({ id, label, icon }) => (
    <div
      onClick={() => setPage(id)}
      style={{
        padding: "14px 18px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        borderRadius: 12,
        marginBottom: 6,
        background: page === id ? "#fcf8e3" : "transparent",
        color: page === id ? GOLD : "#6b7280",
        fontWeight: page === id ? 800 : 600,
        fontSize: 14,
        transition: "all .2s ease",
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      {label}
    </div>
  );

  return (
    <div style={{
      width: 280,
      background: "#fff",
      borderRight: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "10px 0 30px rgba(0,0,0,0.02)"
    }}>
      <div style={{ padding: "30px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, borderBottom: "1px solid #f3f4f6" }}>
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" style={{ height: 60, width: "auto", objectFit: "contain" }} />
        ) : (
          <div style={{ width: 60, height: 60, background: GOLD, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 28, fontWeight: 900 }}>I</div>
        )}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: DARK, letterSpacing: "-0.5px" }}>{companyInfo.nom || "INOVOICE"}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, textTransform: "uppercase", letterSpacing: "1px", marginTop: 2 }}>Tableau de Bord</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "24px 16px", overflowY: "auto" }}>
        <MenuItem id="dashboard" label="Aperçu Global" icon="📊" />
        <MenuItem id="factures" label="Mes Factures" icon="📄" />
        <MenuItem id="clients" label="Mes Clients" icon="👥" />
        <MenuItem id="produits" label="Catalogue Produits" icon="📦" />
        <MenuItem id="declaration" label="Déclaration TVA" icon="🏦" />
        {canWrite && <MenuItem id="calcul" label="Simulateur" icon="🧮" />}
        {canWrite && <MenuItem id="settings" label="Paramètres" icon="⚙️" />}
      </div>

      <div style={{ padding: "20px 16px", borderTop: "1px solid #f3f4f6" }}>
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "12px",
            background: "#fef2f2",
            color: "#991b1b",
            border: "none",
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span>🚪</span> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
