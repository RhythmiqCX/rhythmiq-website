import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { base, heading } from "@/constants";
import { Toaster } from "@/components/ui/sonner";
import { subheading } from "@/constants/fonts";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased font-heading overflow-x-hidden !scrollbar-hide",
                    base.variable,
                    heading.variable,
                    subheading.variable,
                )}
            >
                    <Toaster richColors theme="dark" position="top-right" />
                    {children}
                    <Analytics />
                    <SpeedInsights />
                    {/* <script
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                            __html: `
                            (function(d,t) {
                                var BASE_URL="https://app.chatwoot.com";
                                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                                g.src=BASE_URL+"/packs/js/sdk.js";
                                g.defer = true;
                                g.async = true;
                                s.parentNode.insertBefore(g,s);
                                g.onload=function(){
                                window.chatwootSDK.run({
                                    websiteToken: '6YoNKAezEsHJmjR3MeeLcoeM',
                                    baseUrl: BASE_URL
                                })
                                }
                            })(document,"script");
                            `,
                        }}
                        /> */}
                        <script src="http://localhost:8080/widget-loader.js"></script>
            </body>
        </html>
    );
};
