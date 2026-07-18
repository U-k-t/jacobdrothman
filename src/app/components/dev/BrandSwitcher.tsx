import { useEffect, useState } from "react";

type Brand = "a" | "b";

function readBrand(): Brand {
  return document.documentElement.getAttribute("data-brand") === "b" ? "b" : "a";
}

function readDark(): boolean {
  return document.documentElement.classList.contains("dark");
}

export function BrandSwitcher() {
  const [brand, setBrand] = useState<Brand>(readBrand);
  const [dark, setDark] = useState<boolean>(readDark);

  useEffect(() => {
    document.documentElement.setAttribute("data-brand", brand);
    localStorage.setItem("brand", brand);
  }, [brand]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", String(dark));
  }, [dark]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
        display: "flex",
        gap: 8,
        alignItems: "center",
        padding: "8px 10px",
        borderRadius: 8,
        background: "#111",
        color: "#fff",
        fontSize: 12,
        fontFamily: "monospace",
        boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
      }}
    >
      <span style={{ opacity: 0.6 }}>brand</span>
      {(["a", "b"] as const).map((b) => (
        <button
          key={b}
          onClick={() => setBrand(b)}
          style={{
            padding: "2px 8px",
            borderRadius: 4,
            border: "1px solid #444",
            background: brand === b ? "#fff" : "transparent",
            color: brand === b ? "#111" : "#fff",
            cursor: "pointer",
          }}
        >
          {b.toUpperCase()}
        </button>
      ))}
      <span style={{ opacity: 0.6, marginLeft: 4 }}>|</span>
      <button
        onClick={() => setDark((d) => !d)}
        style={{
          padding: "2px 8px",
          borderRadius: 4,
          border: "1px solid #444",
          background: dark ? "#fff" : "transparent",
          color: dark ? "#111" : "#fff",
          cursor: "pointer",
        }}
      >
        {dark ? "dark" : "light"}
      </button>
    </div>
  );
}
