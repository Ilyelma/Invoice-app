import React, { useState } from "react";
import { fmt, formatDate } from "../utils/formatters";
import Badge from "../components/ui/Badge";

const DeclarationPage = ({ factures, clients, customRowTags = {}, setCustomRowTags }) => {
  const [periode, setPeriode] = useState("all");
  const GOLD = "#c5a059";
  const DARK = "#1a1a2e";

  // Logique simplifiée pour la démonstration de la structure
  const filteredFactures = periode === "all" ? factures : factures.filter(f => f.date.startsWith(periode));
  
  const totalTVA = filteredFactures.reduce((acc, f) => acc + (f.totalTVA || 0), 0);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: DARK, margin: 0 }}>Déclaration TVA</h1>
        <p style={{ color: "#6b7280", marginTop: 4 }}>Récapitulatif de la TVA collectée par période</p>
      </div>

      <div style={{ background: "#fff", padding: "24px", borderRadius: 16, border: "1px solid #e5e7eb", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
          <label style={{ fontSize: 14, fontWeight: 700, color: "#6b7280" }}>Période :</label>
          <select 
            value={periode} 
            onChange={(e) => setPeriode(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", outline: "none" }}
          >
            <option value="all">Toutes les périodes</option>
            <option value="2026-01">Janvier 2026</option>
            <option value="2026-02">Février 2026</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 40, borderTop: "1px solid #f3f4f6", paddingTop: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700, textTransform: "uppercase" }}>TVA Totale Collectée</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: GOLD }}>{fmt(totalTVA)} DH</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700, textTransform: "uppercase" }}>Nombre de Factures</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: DARK }}>{filteredFactures.length}</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
              <th style={{ padding: "16px", textAlign: "left", fontSize: 13, color: "#6b7280" }}>Facture</th>
              <th style={{ padding: "16px", textAlign: "left", fontSize: 13, color: "#6b7280" }}>Client</th>
              <th style={{ padding: "16px", textAlign: "left", fontSize: 13, color: "#6b7280" }}>TVA (DH)</th>
            </tr>
          </thead>
          <tbody>
            {filteredFactures.map(f => (
              <tr key={f.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "16px", fontWeight: 700 }}>{f.numero}</td>
                <td style={{ padding: "16px" }}>{f.clientNom}</td>
                <td style={{ padding: "16px", fontWeight: 700, color: GOLD }}>{fmt(f.totalTVA)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeclarationPage;
