import type { CSSProperties } from "react";

type ThemeInput = { accent: string; scheme: "light" | "dark" };

/**
 * WCAG relative luminance → pick black or white text that reads on top of the
 * accent color (used for accent-filled buttons/pills). Keeps every brand legible
 * without the operator thinking about contrast.
 */
function readableOn(hex: string): "#191814" | "#FFFFFF" {
  const h = hex.replace("#", "");
  const toLin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const L =
    0.2126 * toLin(parseInt(h.slice(0, 2), 16)) +
    0.7152 * toLin(parseInt(h.slice(2, 4), 16)) +
    0.0722 * toLin(parseInt(h.slice(4, 6), 16));
  return L > 0.5 ? "#191814" : "#FFFFFF";
}

/**
 * Per-prospect theming. Returns CSS custom properties set as an inline `style`
 * on the page wrapper so a single set of section components renders every brand
 * and both light/dark schemes. Sections read these vars (var(--accent),
 * var(--fg), …) rather than the fixed paper/ink Tailwind tokens.
 */
export function buildThemeVars({ accent, scheme }: ThemeInput): CSSProperties {
  const dark = scheme === "dark";
  return {
    ["--accent"]: accent,
    ["--accent-ink"]: readableOn(accent), // text/icon ON an accent fill
    ["--accent-soft"]: `${accent}1F`, // ~12% wash for tint backgrounds
    ["--accent-line"]: `${accent}59`, // ~35% for hairlines/borders
    ["--bg"]: dark ? "#141210" : "#FAF8F3",
    ["--bg2"]: dark ? "#1E1B17" : "#F1ECE2",
    ["--card"]: dark ? "#211D18" : "#FFFFFF",
    ["--fg"]: dark ? "#F4EFE6" : "#191814",
    ["--fg2"]: dark ? "#A89F90" : "#57534B",
    ["--fg3"]: dark ? "#7C7364" : "#8B847A",
    ["--line"]: dark ? "rgba(244,239,230,0.14)" : "rgba(25,24,20,0.12)",
    ["--line-soft"]: dark ? "rgba(244,239,230,0.08)" : "rgba(25,24,20,0.07)",
    backgroundColor: "var(--bg)",
    color: "var(--fg)",
  } as CSSProperties;
}
