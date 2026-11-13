import { EMAIL } from "../data/site";

const EVENT = "app:toast";

// Munculkan toast dari mana saja: toast("pesan")
export function toast(message) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }));
}

export function onToast(handler) {
  const listener = (e) => handler(e.detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL);
    toast("Email copied to clipboard");
    return true;
  } catch {
    toast(`Couldn't copy — it's ${EMAIL}`);
    return false;
  }
}
