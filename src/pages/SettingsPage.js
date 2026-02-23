import React, { useState } from "react";
import Button from "../components/ui/Button";

const SettingsPage = ({ companyInfo, setCompanyInfo, logoUrl, handleLogo, config, setConfig, customCategories, setCustomCategories }) => {
  const [form, setForm] = useState(companyInfo || {});
  const GOLD = "#c5a059";
  const DARK = "#1a1a2e";

  const handleSave = () => {
    setCompanyInfo(form);
    alert("Paramètres enregistrés !");
  };

  const InputField = ({ label, name, type = "text" }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>{label}</label>
      <input 
        type={type} 
        value={form[name] || ""} 
        onChange={(e) => setForm({ ...form, [name]: e.target.value })} 
        style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, outline: "none", fontSize: 14 }} 
      />
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: DARK, margin: 0 }}>Paramètres de l'Entreprise</h1>
        <p style={{ color: "#6b7280", marginTop: 4 }}>Configurez vos informations légales et votre logo</p>
      </div>

      <div style={{ display: "flex", gap: 32 }}>
        <div style={{ flex: 1, background: "#fff", padding: "32px", borderRadius: 20, border: "1px solid #e5e7eb", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: DARK, marginBottom: 24 }}>Informations Générales</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <InputField label="Nom de l'entreprise" name="nom" />
            <InputField label="ICE" name="ice" />
            <InputField label="IF" name="if" />
            <InputField label="RC" name="rc" />
            <InputField label="Patente" name="patente" />
            <InputField label="Ville" name="ville" />
          </div>

          <div style={{ marginTop: 16 }}>
            <InputField label="Adresse" name="adresse" />
          </div>

          <div style={{ marginTop: 32, borderTop: "1px solid #f3f4f6", paddingTop: 24, display: "flex", justifyContent: "flex-end" }}>
            <Button label="Enregistrer les modifications" bg={GOLD} onClick={handleSave} style={{ borderRadius: 12 }} />
          </div>
        </div>

        <div style={{ width: 340, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: "#fff", padding: "24px", borderRadius: 20, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: DARK, marginBottom: 20 }}>Logo de l'Entreprise</h2>
            <div style={{ width: "100%", height: 160, background: "#f8fafc", borderRadius: 16, border: "2px dashed #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 20 }}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo Preview" style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }} />
              ) : (
                <span style={{ fontSize: 40 }}>🖼️</span>
              )}
            </div>
            <input type="file" onChange={handleLogo} style={{ display: "none" }} id="logo-upload" />
            <label htmlFor="logo-upload" style={{ display: "inline-block", background: "#f3f4f6", color: DARK, padding: "10px 20px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
              Changer le logo
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
