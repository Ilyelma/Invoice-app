import React, { useState } from "react";
import { login } from "../services/auth";
import Button from "../components/ui/Button";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const GOLD = "#c5a059";
  const DARK = "#1a1a2e";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError("Identifiants invalides ou erreur de connexion.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      background: "#f8fafc", 
      fontFamily: "sans-serif" 
    }}>
      <div style={{ 
        background: "#fff", 
        padding: "40px", 
        borderRadius: 24, 
        boxShadow: "0 20px 50px rgba(0,0,0,0.08)", 
        width: "100%", 
        maxWidth: 420, 
        textAlign: "center" 
      }}>
        <div style={{ 
          width: 64, 
          height: 64, 
          background: GOLD, 
          borderRadius: 18, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          color: "#fff", 
          fontSize: 32, 
          fontWeight: 900, 
          margin: "0 auto 24px" 
        }}>I</div>
        
        <h1 style={{ fontSize: 28, fontWeight: 900, color: DARK, marginBottom: 8 }}>INOVOICE</h1>
        <p style={{ color: "#6b7280", marginBottom: 32, fontSize: 15 }}>Connectez-vous à votre espace de facturation</p>

        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#4b5563", marginBottom: 8 }}>Adresse Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="votre@email.com" 
              required
              style={{ 
                width: "100%", 
                padding: "12px 16px", 
                border: "1.5px solid #e5e7eb", 
                borderRadius: 12, 
                outline: "none", 
                fontSize: 15,
                transition: "border-color 0.2s"
              }} 
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#4b5563", marginBottom: 8 }}>Mot de passe</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required
              style={{ 
                width: "100%", 
                padding: "12px 16px", 
                border: "1.5px solid #e5e7eb", 
                borderRadius: 12, 
                outline: "none", 
                fontSize: 15,
                transition: "border-color 0.2s"
              }} 
            />
          </div>

          {error && (
            <div style={{ 
              background: "#fef2f2", 
              color: "#991b1b", 
              padding: "12px", 
              borderRadius: 10, 
              fontSize: 13, 
              fontWeight: 600, 
              marginBottom: 20,
              border: "1px solid #fee2e2"
            }}>
              ⚠️ {error}
            </div>
          )}

          <Button 
            label={loading ? "Connexion en cours..." : "Se connecter"} 
            onClick={() => {}} 
            bg={GOLD} 
            disabled={loading}
            style={{ width: "100%", padding: "14px", borderRadius: 12, fontSize: 16 }} 
          />
        </form>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #f3f4f6" }}>
          <p style={{ fontSize: 13, color: "#9ca3af" }}>
            En cas de problème, contactez l'administrateur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
