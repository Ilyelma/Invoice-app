import React, { useState } from "react";
import { fmt, getCatStyle } from "../utils/formatters";
import Badge from "../components/ui/Badge";
import Button, { SmallBtn } from "../components/ui/Button";

const ProductsPage = ({ products, canWrite, setProdModal, setEditingProd, deleteProduct, customCategories }) => {
  const [pSearch, setPSearch] = useState("");
  const GOLD = "#c5a059";
  const DARK = "#1a1a2e";

  const filteredProducts = products.filter((p) => {
    const s = pSearch.toLowerCase();
    return (
      p.id.toLowerCase().includes(s) ||
      (p.description && p.description.toLowerCase().includes(s)) ||
      (p.categorie && p.categorie.toLowerCase().includes(s))
    );
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: DARK, margin: 0 }}>Catalogue Produits</h1>
          <p style={{ color: "#6b7280", marginTop: 4 }}>Gérez vos articles et services</p>
        </div>
        {canWrite && (
          <Button 
            label="+ Nouveau Produit" 
            bg={GOLD} 
            onClick={() => { setEditingProd(null); setProdModal(true); }} 
            style={{ borderRadius: 14, padding: "14px 28px" }}
          />
        )}
      </div>

      <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", overflow: "hidden" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ position: "relative", width: 340 }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}>🔍</span>
            <input 
              value={pSearch} 
              onChange={(e) => setPSearch(e.target.value)} 
              placeholder="Rechercher par référence, description..." 
              style={{ width: "100%", padding: "12px 16px 12px 44px", border: "1.5px solid #e5e7eb", borderRadius: 12, fontSize: 14, outline: "none" }} 
            />
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1.5px solid #f3f4f6" }}>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" }}>Référence</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" }}>Catégorie</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" }}>Description</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" }}>Prix HT</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" }}>TVA</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 60, textAlign: "center", color: "#9ca3af" }}>Aucun produit trouvé.</td>
              </tr>
            )}
            {filteredProducts.map((p) => {
              const cs = getCatStyle(p.categorie, customCategories);
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "18px 24px", fontWeight: 700, color: GOLD, fontFamily: "monospace" }}>{p.id}</td>
                  <td style={{ padding: "18px 24px" }}>
                    <span style={{ background: cs.bg, color: cs.color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                      {p.categorie || "—"}
                    </span>
                  </td>
                  <td style={{ padding: "18px 24px", color: DARK }}>{p.description}</td>
                  <td style={{ padding: "18px 24px", fontWeight: 700 }}>{fmt(p.prixHT)} DH</td>
                  <td style={{ padding: "18px 24px" }}><Badge text={`${p.tva}%`} color="orange" /></td>
                  <td style={{ padding: "18px 24px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {canWrite && <SmallBtn label="Modifier" bg="#f3f4f6" color={DARK} onClick={() => { setEditingProd(p); setProdModal(true); }} />}
                      {canWrite && <SmallBtn label="X" bg="#fee2e2" color="#991b1b" onClick={() => { if (window.confirm("Supprimer ce produit ?")) deleteProduct(p.id); }} />}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
