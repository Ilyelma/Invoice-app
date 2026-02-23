import React, { useState } from "react";
import { fmt } from "../utils/formatters";
import Button, { SmallBtn } from "../components/ui/Button";

const CalculPage = ({ products, onCreateFacture }) => {
  const [lines, setLines] = useState([]);
  const [pSearch, setPSearch] = useState("");
  const GOLD = "#c5a059";
  const DARK = "#1a1a2e";

  const addLine = (p) => {
    const existing = lines.find(l => l.id === p.id);
    if (existing) {
      setLines(lines.map(l => l.id === p.id ? { ...l, qte: l.qte + 1 } : l));
    } else {
      setLines([...lines, { ...p, qte: 1 }]);
    }
  };

  const totalHT = lines.reduce((acc, l) => acc + (l.prixHT * l.qte), 0);
  const totalTVA = lines.reduce((acc, l) => acc + (l.prixHT * l.qte * (l.tva / 100)), 0);
  const totalTTC = totalHT + totalTVA;

  return (
    <div style={{ display: "flex", gap: 32 }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: DARK, margin: 0 }}>Simulateur de Calcul</h1>
          <p style={{ color: "#6b7280", marginTop: 4 }}>Ajoutez des produits pour simuler un devis ou une facture</p>
        </div>

        <div style={{ background: "#fff", padding: "24px", borderRadius: 20, border: "1px solid #e5e7eb", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
          <div style={{ marginBottom: 20 }}>
            <input 
              value={pSearch} 
              onChange={(e) => setPSearch(e.target.value)} 
              placeholder="Rechercher un produit..." 
              style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e5e7eb", borderRadius: 12, outline: "none" }} 
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {products.filter(p => p.id.toLowerCase().includes(pSearch.toLowerCase()) || p.description.toLowerCase().includes(pSearch.toLowerCase())).slice(0, 6).map(p => (
              <div key={p.id} onClick={() => addLine(p)} style={{ padding: "12px", border: "1.5px solid #f3f4f6", borderRadius: 12, cursor: "pointer", transition: "all .2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.id}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{p.description}</div>
                <div style={{ fontWeight: 900, color: GOLD, marginTop: 4 }}>{fmt(p.prixHT)} DH</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: 400 }}>
        <div style={{ background: DARK, color: "#fff", padding: "24px", borderRadius: 20, position: "sticky", top: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 20px 0" }}>Récapitulatif</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {lines.map(l => (
              <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14 }}>
                <div style={{ flex: 1 }}>{l.id} x {l.qte}</div>
                <div style={{ fontWeight: 700 }}>{fmt(l.prixHT * l.qte)} DH</div>
                <button onClick={() => setLines(lines.filter(x => x.id !== l.id))} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", marginLeft: 8 }}>×</button>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #ffffff22", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#9ca3af" }}>Total HT</span>
              <span style={{ fontWeight: 700 }}>{fmt(totalHT)} DH</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#9ca3af" }}>TVA</span>
              <span style={{ fontWeight: 700 }}>{fmt(totalTVA)} DH</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 900, marginTop: 8, color: GOLD }}>
              <span>TOTAL TTC</span>
              <span>{fmt(totalTTC)} DH</span>
            </div>
          </div>

          <Button 
            label="Générer la Facture" 
            bg={GOLD} 
            onClick={() => onCreateFacture(lines)} 
            style={{ width: "100%", marginTop: 24, borderRadius: 12 }} 
            disabled={lines.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default CalculPage;
