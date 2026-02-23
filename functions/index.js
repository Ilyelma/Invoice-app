/**
 * ═══════════════════════════════════════════════════════════════
 *  ZK MAROC — Firebase Cloud Functions
 *  Gestion sécurisée des comptes utilisateurs (Auth + Firestore)
 * ═══════════════════════════════════════════════════════════════
 */

const functions = require("firebase-functions");
const admin     = require("firebase-admin");

admin.initializeApp();

const db   = admin.firestore();
const auth = admin.auth();

// ── Helper : vérifie que l'appelant est bien un admin ──────────────────────
async function assertAdmin(context) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Vous devez être connecté pour effectuer cette action."
    );
  }

  // Cherche la fiche Firestore de l'appelant
  const userId = Buffer.from(context.auth.token.email.toLowerCase())
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "_");

  const snap = await db.collection("zkm_users").doc(userId).get();

  if (!snap.exists || snap.data().role !== "admin") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Seul un administrateur peut gérer les utilisateurs."
    );
  }
}

// ═══════════════════════════════════════════════════════════════
//  createAppUser — Crée un compte Firebase Auth + fiche Firestore
// ═══════════════════════════════════════════════════════════════
exports.createAppUser = functions.https.onCall(async (data, context) => {
  // 1. Vérification admin
  await assertAdmin(context);

  const { email, password, nom, role } = data;

  // 2. Validation des données
  if (!email || !password || !role) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Les champs email, password et role sont obligatoires."
    );
  }

  if (password.length < 6) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Le mot de passe doit contenir au moins 6 caractères."
    );
  }

  const validRoles = ["admin", "ecriture_lecture", "lecture"];
  if (!validRoles.includes(role)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Rôle invalide. Valeurs acceptées : admin, ecriture_lecture, lecture."
    );
  }

  const emailLower = email.trim().toLowerCase();

  // 3. Créer le compte dans Firebase Auth
  let userRecord;
  try {
    userRecord = await auth.createUser({
      email:         emailLower,
      password:      password,
      displayName:   nom || emailLower.split("@")[0],
      emailVerified: false,
    });
  } catch (e) {
    if (e.code === "auth/email-already-exists") {
      throw new functions.https.HttpsError(
        "already-exists",
        "Un compte Firebase Auth existe déjà avec cet e-mail."
      );
    }
    throw new functions.https.HttpsError("internal", "Erreur Auth : " + e.message);
  }

  // 4. Créer la fiche Firestore (rôle + métadonnées)
  const docId = Buffer.from(emailLower)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "_");

  try {
    await db.collection("zkm_users").doc(docId).set({
      email:     emailLower,
      nom:       nom || emailLower.split("@")[0],
      role:      role,
      uid:       userRecord.uid,
      createdAt: new Date().toISOString(),
      createdBy: context.auth.token.email,
    });
  } catch (e) {
    // Si Firestore échoue, on supprime le compte Auth pour rester cohérent
    await auth.deleteUser(userRecord.uid).catch(() => {});
    throw new functions.https.HttpsError("internal", "Erreur Firestore : " + e.message);
  }

  return {
    success: true,
    uid:     userRecord.uid,
    message: `Utilisateur ${emailLower} créé avec le rôle "${role}".`,
  };
});


// ═══════════════════════════════════════════════════════════════
//  deleteAppUser — Supprime un compte Firebase Auth + fiche Firestore
// ═══════════════════════════════════════════════════════════════
exports.deleteAppUser = functions.https.onCall(async (data, context) => {
  // 1. Vérification admin
  await assertAdmin(context);

  const { email } = data;

  if (!email) {
    throw new functions.https.HttpsError("invalid-argument", "L'email est obligatoire.");
  }

  // Empêcher l'admin de se supprimer lui-même
  if (email.toLowerCase() === context.auth.token.email.toLowerCase()) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Vous ne pouvez pas supprimer votre propre compte."
    );
  }

  const emailLower = email.trim().toLowerCase();

  // 2. Supprimer de Firebase Auth
  try {
    const userRecord = await auth.getUserByEmail(emailLower);
    await auth.deleteUser(userRecord.uid);
  } catch (e) {
    if (e.code !== "auth/user-not-found") {
      throw new functions.https.HttpsError("internal", "Erreur Auth : " + e.message);
    }
    // Si pas trouvé dans Auth, on continue quand même pour nettoyer Firestore
  }

  // 3. Supprimer la fiche Firestore
  const docId = Buffer.from(emailLower)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "_");

  try {
    await db.collection("zkm_users").doc(docId).delete();
  } catch (e) {
    throw new functions.https.HttpsError("internal", "Erreur Firestore : " + e.message);
  }

  return {
    success: true,
    message: `Utilisateur ${emailLower} supprimé avec succès.`,
  };
});


// ═══════════════════════════════════════════════════════════════
//  updateAppUserRole — Met à jour le rôle d'un utilisateur
// ═══════════════════════════════════════════════════════════════
exports.updateAppUserRole = functions.https.onCall(async (data, context) => {
  // 1. Vérification admin
  await assertAdmin(context);

  const { email, role } = data;

  if (!email || !role) {
    throw new functions.https.HttpsError("invalid-argument", "Email et rôle obligatoires.");
  }

  const validRoles = ["admin", "ecriture_lecture", "lecture"];
  if (!validRoles.includes(role)) {
    throw new functions.https.HttpsError("invalid-argument", "Rôle invalide.");
  }

  const emailLower = email.trim().toLowerCase();
  const docId = Buffer.from(emailLower)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "_");

  try {
    await db.collection("zkm_users").doc(docId).update({
      role:      role,
      updatedAt: new Date().toISOString(),
      updatedBy: context.auth.token.email,
    });
  } catch (e) {
    throw new functions.https.HttpsError("internal", "Erreur mise à jour : " + e.message);
  }

  return {
    success: true,
    message: `Rôle de ${emailLower} mis à jour : "${role}".`,
  };
});
