import React, { useState } from "react";
import { SmallBtn } from "../components/ui/Button";
import Button from "../components/ui/Button";

const ClientsPage = ({ clients, canWrite, setClientModal, setEditingClient, deleteClient }) => {
  const [cSearch, setCSearch] = useState("");
  const GOLD = "#c5a059";
  const DARK = "#1a1a2e";

  const filteredClients = clients.filter((c) => {
    const s = cSearch.toLowerCase();
    return (
      c.nom.toLowerCase().includes(s) ||
      c.id.toLowerCase().includes(s) ||
      (c.ice && c.ice.toLowerCase().includes(s))
    );
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: DARK, margin: 0 }}>Mes Clients</h1>
          <p style={{ color: "#6b7280", marginTop: 4 }}>Gérez votre base de données clients</p>
        </div>
        {canWrite && (
          <Button 
            label="+ Nouveau Client" 
            bg={GOLD} 
            onClick={() => { setEditingClient(null); setClientModal(true); }} 
            style={{ borderRadius: 14, padding: "14px 28px" }}
          />
        )}
      </div>

      <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", overflow: "hidden" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ position: "relative", width: 340 }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}>🔍</span>
            <input 
              value={cSearch} 
              onChange={(e) => setCSearch(e.target.value)} 
              placeholder="Rechercher par nom, ID, ICE..." 
              style={{ width: "100%", padding: "12px 16px 12px 44px", border: "1.5px solid #e5e7eb", borderRadius: 12, fontSize: 14, outline: "none" }} 
            />
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1.5px solid #f3f4f6" }}>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" }}>Identifiant</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" }}>Nom / Entreprise</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" }}>ICE</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 60, textAlign: "center", color: "#9ca3af" }}>Aucun client trouvé.</td>
              </tr>
            )}
            {filteredClients.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "18px 24px", fontWeight: 700, color: GOLD, fontFamily: "monospace" }}>{c.id}</td>
                <td style={{ padding: "18px 24px", fontWeight: 700, color: DARK }}>{c.nom}</td>
                <td style={{ padding: "18px 24px", color: "#6b7280" }}>{c.ice || "—"}</td>
                <td style={{ padding: "18px 24px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {canWrite && <SmallBtn label="Modifier" bg="#f3f4f6" color={DARK} onClick={() => { setEditingClient(c); setClientModal(true); }} />}
                    {canWrite && <SmallBtn label="X" bg="#fee2e2" color="#991b1b" onClick={() => { if (window.confirm("Supprimer ce client ?")) deleteClient(c.id); }} />}
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

export default ClientsPage;
