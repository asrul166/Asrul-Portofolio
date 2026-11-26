import React, { useEffect, useState } from "react";
import { fetchComments, isConfigured, postComment } from "../lib/firebase";
import { button, card, field } from "./formStyles";

const DAY = 24 * 60 * 60 * 1000;
const KEY = "lastCommentAt";
const tones = ["bg-sticker-yellow", "bg-sticker-green", "bg-sticker-pink", "bg-sticker-blue", "bg-sticker-orange"];

// hanya untuk tampilan; batas yang sebenarnya ada di firestore.rules
const hoursLeft = () => {
  const wait = Number(localStorage.getItem(KEY)) + DAY - Date.now();
  return wait > 0 ? Math.ceil(wait / (60 * 60 * 1000)) : 0;
};

const formatDate = (date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function Comments() {
  const [comments, setComments] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [wait, setWait] = useState(hoursLeft);

  useEffect(() => {
    if (!isConfigured) return;
    fetchComments()
      .then(setComments)
      .catch(() => setLoadError(true));
  }, []);

  if (!isConfigured) {
    return <p className={`${card} text-sm text-soft`}>Comments are not available yet.</p>;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const message = form.message.trim();
    if (!name || !message) return;

    setSending(true);
    setError("");
    try {
      const added = await postComment({ name, message });
      localStorage.setItem(KEY, String(Date.now()));
      setWait(hoursLeft());
      setComments((list) => [added, ...(list ?? [])]);
      setForm({ name: "", message: "" });
    } catch (err) {
      setError(
        err.code === "permission-denied"
          ? "Your comment was rejected. You can only comment once every 24 hours."
          : "Could not send your comment. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-5">
      <form onSubmit={handleSubmit} className="space-y-4 md:col-span-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Name"
          aria-label="Name"
          autoComplete="name"
          maxLength={40}
          required
          className={field}
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          placeholder="Leave a comment"
          aria-label="Comment"
          maxLength={500}
          required
          className={field}
        />
        <button type="submit" disabled={sending || wait > 0} className={`${button} disabled:opacity-50`}>
          {sending ? "Sending..." : "Post comment"}
        </button>
        <p aria-live="polite" className="font-mono text-[11px] text-muted">
          {error ||
            (wait > 0
              ? `Thanks! You can comment again in about ${wait} hour${wait > 1 ? "s" : ""}.`
              : "Visible to everyone. One comment per 24 hours.")}
        </p>
      </form>

      <div className="md:col-span-3">
        {loadError && <p className={`${card} text-sm text-soft`}>Could not load comments.</p>}
        {!loadError && !comments && <p className={`${card} text-sm text-soft`}>Loading comments...</p>}
        {comments?.length === 0 && (
          <p className={`${card} text-sm text-soft`}>No comments yet. Be the first.</p>
        )}
        {comments?.length > 0 && (
          <ul className="max-h-96 space-y-4 overflow-y-auto pb-1 pr-2">
            {comments.map((c, i) => (
              <li key={c.id} className={card}>
                <div className="flex items-center gap-2">
                  <span
                    className={`${tones[(comments.length - i) % tones.length]} max-w-[60%] truncate rounded border-2 border-fg px-2 py-0.5 text-xs font-bold`}
                  >
                    {c.name}
                  </span>
                  <span className="ml-auto font-mono text-[11px] text-muted">{formatDate(c.date)}</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-soft">
                  {c.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
