                  ))}
                </div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>{["Référence", "Catégorie", "Description", "Prix HT", "TVA", "Prix TTC", "Actions"].map((h) => <th key={h} style={TH}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {pagedProds.length === 0 && <tr><td colSpan={7} style={{ ...TD, textAlign: "center", color: "#9ca3af", padding: 40 }}>Aucun produit trouvé.</td></tr>}
                  {pagedProds.map((p) => {
                    const cs = catStyle(p.categorie);
                    return (
                      <tr key={p.id} onMouseEnter={(e) => e.currentTarget.style.background = "#fafaf8"} onMouseLeave={(e) => e.currentTarget.style.background = ""}>
                        <td style={{ ...TD, fontWeight: 700, color: GOLD, fontFamily: "monospace" }}>{p.id}</td>
                        <td style={TD}>
                          {p.categorie
                            ? <span style={{ background: cs.bg, color: cs.color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{p.categorie}</span>
                            : <span style={{ color: "#d1d5db", fontSize: 11 }}>—</span>}
                        </td>
                        <td style={TD}>{p.description}</td>
                        <td style={{ ...TD, fontWeight: 600 }}>{fmt(p.prixHT)} DH</td>
                        <td style={TD}><Badge text={p.tva + "%"} color="orange" /></td>
                        <td style={{ ...TD, fontWeight: 800, color: "#166534" }}>{fmt(p.prixHT * (1 + p.tva / 100))} DH</td>
                        <td style={TD}>
                          <div style={{ display: "flex", gap: 6 }}>
                            {canWrite && <SmallBtn label="Modifier" bg="#eff6ff" color="#1d4ed8" onClick={() => { setPForm({ ...p, categorie: p.categorie || "" }); setPFormTTC(p.prixHT ? String(parseFloat((p.prixHT * (1 + p.tva / 100)).toFixed(2))) : ""); setProdModal("edit"); }} />}
                            {canWrite && <SmallBtn label="X" bg="#fee2e2" color="#991b1b" onClick={() => { if (window.confirm("Supprimer ?")) setProducts(products.filter((x) => x.id !== p.id)); }} />}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 13, color: "#6b7280" }}>
                Par page :
                {[10, 25, 50].map(n => (
                  <button key={n} onClick={() => { setProdsPerPage(n); setProdPage(1); }}
                    style={{ border: "1.5px solid " + (prodsPerPage === n ? GOLD : "#e5e7eb"), background: prodsPerPage === n ? GOLD : "#fff", color: prodsPerPage === n ? "#fff" : "#374151", borderRadius: 8, padding: "3px 10px", cursor: "pointer", fontWeight: prodsPerPage === n ? 700 : 400, fontSize: 13 }}>
                    {n}
                  </button>
                ))}
              </div>
              <Pagination total={filteredProds.length} page={prodPage} perPage={prodsPerPage} onChange={setProdPage} />
            </div>
          </>
        )}

        {/* ═ DÉCLARATION TVA ═ */}
        {page === "declaration" && (
          <DeclarationPage factures={factures} clients={clients} customRowTags={customRowTags} setCustomRowTags={setCustomRowTags} />
        )}

        {/* ═ CALCUL ═ */}
        {page === "calcul" && !canWrite && (
          <div style={{ textAlign: "center", padding: "80px 40px" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔒</div>
            <h2 style={{ color: "#1a1a2e", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Accès restreint</h2>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Le simulateur de calcul est réservé aux utilisateurs avec droits d'écriture.</p>
          </div>
        )}
        {page === "calcul" && canWrite && (
          <CalculPage products={products} onCreateFacture={openFromSimulator} />
        )}

        {/* ═ SETTINGS ═ */}
        {page === "settings" && !canWrite && (
          <div style={{ textAlign: "center", padding: "80px 40px" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔒</div>
            <h2 style={{ color: "#1a1a2e", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Accès restreint</h2>
            <p style={{ color: "#6b7280", fontSize: 14 }}>La page Paramètres est réservée aux utilisateurs avec droits d'écriture.</p>
          </div>
        )}
        {page === "settings" && canWrite && (
          <SettingsPage
            config={config}
            setConfig={setConfig}
            factures={factures}
            clients={clients}
            logoUrl={logoUrl}
            setLogoUrl={setLogoUrl}
            logoRef={logoRef}
            handleLogo={handleLogo}
            nextFNum={nextFNum}
            setPreviewFact={setPreviewFact}
            companyInfo={companyInfo}
            setCompanyInfo={setCompanyInfo}
            dlDirHandle={dlDirHandle}
            chooseDlFolder={chooseDlFolder}
            customCategories={customCategories}
            setCustomCategories={setCustomCategories}
            allCategories={allCategories}
          />
        )}
      </div>

      {/* ═══ MODAL : NOUVELLE FACTURE ═══ */}
      {factModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000000bb", zIndex: 2000, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px", overflowY: "auto" }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 860, boxShadow: "0 25px 60px #0006", marginTop: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 28px 18px", borderBottom: "1px solid #e5e7eb" }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: DARK }}>{editingFact ? "Modifier la Facture" : "Nouvelle Facture"}</h3>
              <button onClick={() => { setFactModal(false); setSimulatorLines(null); }} style={{ border: "none", background: "#f3f4f6", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 16, color: "#6b7280" }}>X</button>
            </div>
            {simulatorLines && fForm.lignes.length > 0 && !editingFact && (
              <div style={{ margin: "14px 28px 0", background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10, padding: "11px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 18 }}>🧮</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>{simulatorLines.length} produit(s) importé(s) depuis le Simulateur</div>
                  <div style={{ fontSize: 11, color: "#4ade80" }}>Choisissez un client et enregistrez pour finaliser.</div>
                </div>
                <button onClick={() => { setFForm(f => ({ ...f, lignes: [] })); setSimulatorLines(null); }}
                  style={{ background: "#fee2e2", border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", color: "#991b1b", fontSize: 12, fontWeight: 600 }}>
                  Effacer
                </button>
              </div>
            )}
            <div style={{ padding: "22px 28px" }}>
              {/* Row 1 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 0 }}>
                <div>
                  <FieldLabel text="N° Facture" required />
                  {(() => {
                    const numDuplicate = fForm.numero.trim() && factures.some((f) =>
                      f.numero.trim() === fForm.numero.trim() && f.id !== editingFact
                    );
                    return (
                      <>
                        <input value={fForm.numero} onChange={(e) => setFForm({ ...fForm, numero: e.target.value })}
                          style={{ width: "100%", border: "1.5px solid " + (numDuplicate ? "#ef4444" : "#d1d5db"), borderRadius: 8, padding: "9px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "monospace", fontWeight: 700, color: numDuplicate ? "#ef4444" : GOLD, background: numDuplicate ? "#fef2f2" : "#fff", transition: "border-color .15s" }} />
                        {numDuplicate && (
                          <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontWeight: 600 }}>
                            ⚠ Ce numéro existe déjà
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
                <div>
                  <FieldLabel text="Date" required />
                  <input type="date" value={fForm.date} onChange={(e) => setFForm({ ...fForm, date: e.target.value })}
                    style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: 8, padding: "9px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                </div>
                <SelectInput label="Reglement" value={fForm.reglement} onChange={(v) => setFForm({ ...fForm, reglement: v })}
                  options={["virement", "cheque", "especes", "carte bancaire"]} />
              </div>

              {/* Client dropdown */}
              <div style={{ marginBottom: 16, marginTop: 8 }} ref={cDDRef}>
                <FieldLabel text="Client" required />
                {fForm.clientId ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "#166534" }}>{clients.find((c) => c.id === fForm.clientId)?.nom}</div>
                      <div style={{ fontSize: 11, color: "#4ade80" }}>{fForm.clientId} — ICE : {clients.find((c) => c.id === fForm.clientId)?.ice}</div>
                    </div>
                    <SmallBtn label="X" bg="#fee2e2" color="#991b1b" onClick={() => { setFForm({ ...fForm, clientId: "" }); setCSearch(""); }} />
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}>🔍</span>
                    <input value={cSearch} onChange={(e) => { setCSearch(e.target.value); setShowCDD(true); }} onFocus={() => setShowCDD(true)}
                      placeholder="Rechercher un client..." style={{ ...SEARCH_INPUT, width: "100%", boxSizing: "border-box" }} />
                    {showCDD && (
                      <div style={{ position: "absolute", zIndex: 300, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, maxHeight: 210, overflowY: "auto", boxShadow: "0 10px 30px #0003", width: "100%", top: "110%" }}>
                        {ddClients.slice(0, 12).map((c) => (
                          <div key={c.id} onClick={() => { setFForm({ ...fForm, clientId: c.id }); setCSearch(""); setShowCDD(false); }}
                            style={{ padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{c.nom}</div>
                            <div style={{ fontSize: 11, color: "#9ca3af" }}>{c.id} — ICE : {c.ice}</div>
                          </div>
                        ))}
                        {ddClients.length === 0 && <div style={{ padding: 14, color: "#9ca3af", fontSize: 13 }}>Aucun client trouve</div>}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Product dropdown */}
              <div style={{ background: "#f8f8f6", borderRadius: 12, padding: "16px 18px", marginBottom: 20 }} ref={pDDRef}>
                <FieldLabel text="Ajouter un produit / service" />
                <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                  <div style={{ flex: 1 }}>
                    {selProd ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 8, padding: "9px 12px" }}>
                        <div style={{ flex: 1, fontSize: 13 }}>
                          <span style={{ fontWeight: 800, color: "#1d4ed8", fontFamily: "monospace" }}>{selProd}</span>
                          <span style={{ color: "#374151", marginLeft: 8 }}>{products.find((p) => p.id === selProd)?.description?.slice(0, 55)}</span>
                        </div>
                        <button onClick={() => { setSelProd(""); setPSearch(""); }} style={{ border: "none", background: "none", cursor: "pointer", color: "#6b7280", fontSize: 16 }}>X</button>
                      </div>
                    ) : (
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}>🔍</span>
                        <input value={pSearch} onChange={(e) => { setPSearch(e.target.value); setShowPDD(true); }} onFocus={() => setShowPDD(true)}
                          placeholder="Rechercher un produit..." style={{ ...SEARCH_INPUT, width: "100%", boxSizing: "border-box" }} />
                        {showPDD && (
                          <div style={{ position: "absolute", zIndex: 300, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, maxHeight: 200, overflowY: "auto", boxShadow: "0 10px 30px #0003", width: "100%", top: "110%" }}>
                            {ddProds.slice(0, 10).map((p) => (
                              <div key={p.id} onClick={() => { setSelProd(p.id); setPSearch(""); setShowPDD(false); }}
                                style={{ padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}>
                                <div style={{ fontWeight: 600, fontSize: 13 }}>{p.description}</div>
                                <div style={{ fontSize: 11, color: "#9ca3af" }}>{p.id} — {fmt(p.prixHT)} DH HT — TVA {p.tva}%</div>
                              </div>
                            ))}
                            {ddProds.length === 0 && <div style={{ padding: 14, color: "#9ca3af", fontSize: 13 }}>Aucun produit trouve</div>}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div style={{ width: 110 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 5 }}>QUANTITE</label>
                    <input type="number" min="0.01" step="0.01" value={prodQte} onChange={(e) => setProdQte(parseFloat(e.target.value) || 1)}
                      style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: 8, padding: "9px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", textAlign: "center", fontWeight: 700 }} />
                  </div>
                  <button onClick={addLine} disabled={!selProd}
                    style={{ ...BTN_PRIMARY, opacity: selProd ? 1 : 0.4, height: 40, padding: "0 20px" }}>
                    + Ajouter
                  </button>
                </div>
              </div>

              {/* Lines table */}
              {fForm.lignes.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
(Content truncated due to size limit. Use line ranges to read remaining content)