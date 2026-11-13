import { useSyncExternalStore } from "react";

const KEY = "theme";
const EVENT = "app:theme";

// Tema awal dipasang oleh script kecil di index.html (sebelum React jalan).
const current = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // penyimpanan diblokir (mode privat): tema tetap berganti, hanya tidak diingat
  }
  window.dispatchEvent(new Event(EVENT));
}

export function toggleTheme() {
  setTheme(current() === "dark" ? "light" : "dark");
}

function subscribe(cb) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function useTheme() {
  return useSyncExternalStore(subscribe, current, () => "light");
}
