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
    // Access environment variables at build time
    const reb2bKey = process.env.REB2B_KEY || '';
    const rhythmiqWidgetToken = process.env.RHYTHMIQ_WIDGET_TOKEN || '';

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
                    {/* Example Chatwoot integration - tokens removed for security
                        <script
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
                                    websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_TOKEN,
                                    baseUrl: BASE_URL
                                })
                                }
                            })(document,"script");
                            `,
                            }}
                        />
                        */}
                        {/* Example widget loader - tokens removed for security
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                            (function(d,t){
                            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                            g.src="http://localhost:8080/widget-loader.js?websiteToken="+process.env.NEXT_PUBLIC_WIDGET_TOKEN;
                            g.defer=true;g.async=true;
                            s.parentNode.insertBefore(g,s);
                            })(document,"script");
                            `,
                            }}
                        />
                        */}
                        {reb2bKey && (
                            <script
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                    __html: `
                                    !function(key) {
                                        if (window.reb2b) return;
                                        window.reb2b = {loaded: true};
                                        var s = document.createElement("script");
                                        s.async = true;
                                        s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
                                        document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
                                    }("${reb2bKey}");
                                    `
                                }}
                            />
                        )}
                        {rhythmiqWidgetToken && (
                            <script
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                    __html: `
                                (function(d,t){
                                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                                g.src="https://app.rhythmiqcx.com/widget/widget-loader.js?websiteToken=${rhythmiqWidgetToken}";
                                g.defer=true;g.async=true;
                                s.parentNode.insertBefore(g,s);
                                })(document,"script");
                                `,
                                }}
                            />
                        )}
                        
            </body>
        </html>
    );
};
