import { Instrument_Serif, Schibsted_Grotesk, JetBrains_Mono, Syne, Playfair_Display, Space_Grotesk, Inter, DM_Serif_Display } from "next/font/google";
import localFont from "next/font/local";

// --- Restaurant redesign type system (paper aesthetic) ---
// Schibsted Grotesk = display + body sans; JetBrains Mono = eyebrows, labels, figures.
// Satoshi (local) = headings; Instrument Serif = accent subheads.
export const sans = Schibsted_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-sans",
    display: "swap",
});

export const mono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
    display: "swap",
});

export const heading = localFont({
    src: [
        {
            path: '../../public/fonts/Satoshi-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Medium.woff2', 
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Bold.woff2',
            weight: '700', 
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Black.woff2',
            weight: '900',
            style: 'normal',
        }
    ],
    variable: '--font-heading',
    display: "swap", 
});

export const subheading = Instrument_Serif({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-subheading",
    display: "swap",
});

// --- Retro / neo-brutalist variant type system (used by the try/ "retro-vibe"
// restaurant template): Syne = uppercase display headlines; Playfair Display
// italic = editorial accents; Space Grotesk = body.
export const syne = Syne({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
    variable: "--font-syne",
    display: "swap",
});

export const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal", "italic"],
    variable: "--font-playfair",
    display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-space",
    display: "swap",
});

// --- Dentist "clean-clinic" template: Open Sauce One (self-hosted woff2). ---
export const openSauce = localFont({
    src: [
        { path: "../../public/fonts/opensauce/OpenSauceOne-Regular.woff2", weight: "400", style: "normal" },
        { path: "../../public/fonts/opensauce/OpenSauceOne-Bold.woff2", weight: "700", style: "normal" },
    ],
    variable: "--font-opensauce",
    display: "swap",
});

// --- Pets "boutique-hero" template: Inter (body/UI) + DM Serif Display (heading).
export const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-inter",
    display: "swap",
});

export const dmSerifDisplay = DM_Serif_Display({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-dmserif",
    display: "swap",
});