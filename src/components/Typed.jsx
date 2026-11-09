import React, { useEffect, useState } from "react";

export default function Typed({ text, speed = 70 }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), speed);
    return () => clearTimeout(t);
  }, [n, text, speed]);

  return (
    <span>
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block animate-pulse">▍</span>
    </span>
  );
}