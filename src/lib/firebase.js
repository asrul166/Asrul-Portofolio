import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore/lite";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// tanpa .env, web tetap jalan dan tab komentar menampilkan pemberitahuan
const app = Object.values(config).every(Boolean) ? initializeApp(config) : null;

export const isConfigured = app !== null;

export async function fetchComments() {
  const db = getFirestore(app);
  const snap = await getDocs(
    query(collection(db, "comments"), orderBy("createdAt", "desc"), limit(50))
  );
  return snap.docs.map((d) => {
    const { name, message, createdAt } = d.data();
    return { id: d.id, name, message, date: createdAt.toDate() };
  });
}

export async function postComment({ name, message }) {
  const auth = getAuth(app);
  await auth.authStateReady();
  const user = auth.currentUser ?? (await signInAnonymously(auth)).user;

  const db = getFirestore(app);
  const comment = doc(collection(db, "comments"));
  const batch = writeBatch(db);
  batch.set(comment, { name, message, createdAt: serverTimestamp() });
  // aturan Firestore menolak batch ini kalau belum lewat 1 hari
  batch.set(doc(db, "cooldowns", user.uid), { last: serverTimestamp(), commentId: comment.id });
  await batch.commit();

  return { id: comment.id, name, message, date: new Date() };
}
