import React, { useState } from "react";
import { fmt, formatDate } from "../utils/formatters";
import Badge from "../components/ui/Badge";
import Button, { SmallBtn } from "../components/ui/Button";

const FacturesPage = ({ factures, clients, canWrite, setFactModal, setEditingFact, deleteFacture, downloadPDF }) => {
  const [fSearch, setFSearch] = useState("");
  const GOLD = "#c5a059";
  const DARK = "#1a1a2e";

  const filteredFactures = factures.filter((f) => {
    const s = fSearch.toLowerCase();
    return (
      f.numero.toLowerCase().includes(s) ||
      (f.clientNom && f.clientNom.toLowerCase().includes(s)) ||
      (f.clientId && f.clientId.toLowerCase().includes(s))
    );
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: DARK, margin: 0 }}>Mes Factures</h1>
          <p style={{ color: "#6b7280", marginTop: 4 }}>Gérez et suivez vos documents de facturation</p>
        </div>
        {canWrite && (
          <Button 
            label="+ Nouvelle Facture" 
            bg={GOLD} 
            onClick={() => { setEditingFact(null); setFactModal(true); }} 
            style={{ borderRadius: 14, padding: "14px 28px" }}
          />
        )}
      </div>

      <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", overflow: "hidden" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ position: "relative", width: 340 }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}>🔍</span>
            <input 
              value={fSearch} 
              onChange={(e) => setFSearch(e.target.value)} 
              placeholder="Rechercher par n°, client..." 
              style={{ width: "100%", padding: "12px 16px 12px 44px", border: "1.5px solid #e5e7eb", borderRadius: 12, fontSize: 14, outline: "none", transition: "border-color .2s" }} 
            />
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1.5px solid #f3f4f6" }}>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>N° Facture</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Client</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Date</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total TTC</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Règlement</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFactures.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#9ca3af" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>Aucune facture trouvée.</div>
                </td>
              </tr>
            )}
            {filteredFactures.map((f) => (
              <tr key={f.id} style={{ borderBottom: "1px solid #f3f4f6", transition: "background .15s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#fafaf8"} onMouseLeave={(e) => e.currentTarget.style.background = ""}>
                <td style={{ padding: "18px 24px", fontWeight: 700, color: GOLD, fontFamily: "monospace", fontSize: 15 }}>{f.numero}</td>
                <td style={{ padding: "18px 24px" }}>
                  <div style={{ fontWeight: 700, color: DARK }}>{f.clientNom}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>ID: {f.clientId}</div>
                </td>
                <td style={{ padding: "18px 24px", color: "#6b7280", fontSize: 14 }}>{formatDate(f.date)}</td>
                <td style={{ padding: "18px 24px", fontWeight: 900, color: "#166534", fontSize: 15 }}>{fmt(f.totalTTC)} DH</td>
                <td style={{ padding: "18px 24px" }}><Badge text={f.reglement || "—"} color="gray" /></td>
                <td style={{ padding: "18px 24px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <SmallBtn label="PDF" bg="#eff6ff" color="#1d4ed8" onClick={() => downloadPDF(f)} />
                    {canWrite && <SmallBtn label="Modifier" bg="#f3f4f6" color={DARK} onClick={() => { setEditingFact(f.id); setFactModal(true); }} />}
                    {canWrite && <SmallBtn label="X" bg="#fee2e2" color="#991b1b" onClick={() => { if (window.confirm("Supprimer ?")) deleteFacture(f.id); }} />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacturesPage;
