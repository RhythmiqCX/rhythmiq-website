import { Inter, DM_Sans, Instrument_Serif, Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// --- Restaurant redesign type system (paper aesthetic) ---
// Schibsted Grotesk = display + body sans; JetBrains Mono = eyebrows, labels, figures.
// Added alongside the legacy Satoshi/Inter/Instrument fonts during incremental rollout.
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

export const base = Inter({
    subsets: ["latin"],
    variable: "--font-base",
    display: "swap", 
});

export const subheading = Instrument_Serif({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-subheading",
    display: "swap", 
});