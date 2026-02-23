import React from "react";
import { fmt } from "../utils/formatters";
import Badge from "../components/ui/Badge";

const DashboardPage = ({ factures, clients, products }) => {
  const GOLD = "#c5a059";
  const DARK = "#1a1a2e";

  // Calculs des statistiques
  const totalHT = factures.reduce((acc, f) => acc + (f.totalHT || 0), 0);
  const totalTVA = factures.reduce((acc, f) => acc + (f.totalTVA || 0), 0);
  const totalTTC = totalHT + totalTVA;

  const StatCard = ({ title, value, icon, color }) => (
    <div style={{
      background: "#fff",
      padding: "24px",
      borderRadius: 16,
      border: "1px solid #e5e7eb",
      flex: 1,
      minWidth: 200,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#6b7280" }}>{title}</div>
        <div style={{ fontSize: 24 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 900, color: color || DARK }}>{value}</div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: DARK, margin: 0 }}>Tableau de Bord</h1>
        <p style={{ color: "#6b7280", marginTop: 4 }}>Aperçu de votre activité financière</p>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 40 }}>
        <StatCard title="Total HT" value={`${fmt(totalHT)} DH`} icon="📈" />
        <StatCard title="Total TVA" value={`${fmt(totalTVA)} DH`} icon="🏦" color={GOLD} />
        <StatCard title="Total TTC" value={`${fmt(totalTTC)} DH`} icon="💰" color="#166534" />
        <StatCard title="Clients" value={clients.length} icon="👥" />
        <StatCard title="Factures" value={factures.length} icon="📄" />
      </div>

      <div style={{ background: "#fff", padding: "24px", borderRadius: 16, border: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: DARK, marginBottom: 20 }}>Activités Récentes</h2>
        {/* Liste simplifiée des dernières factures */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f3f4f6", textAlign: "left" }}>
              <th style={{ padding: "12px 8px", fontSize: 13, color: "#6b7280" }}>N° Facture</th>
              <th style={{ padding: "12px 8px", fontSize: 13, color: "#6b7280" }}>Client</th>
              <th style={{ padding: "12px 8px", fontSize: 13, color: "#6b7280" }}>Date</th>
              <th style={{ padding: "12px 8px", fontSize: 13, color: "#6b7280" }}>Total TTC</th>
            </tr>
          </thead>
          <tbody>
            {factures.slice(-5).reverse().map((f) => (
              <tr key={f.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 8px", fontWeight: 700, color: GOLD }}>{f.numero}</td>
                <td style={{ padding: "12px 8px" }}>{f.clientNom}</td>
                <td style={{ padding: "12px 8px" }}>{f.date}</td>
                <td style={{ padding: "12px 8px", fontWeight: 800 }}>{fmt(f.totalTTC)} DH</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
