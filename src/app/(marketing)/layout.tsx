import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import LeadCapturePopup from "@/components/marketing/LeadCapturePopup";
import React from 'react';

interface Props {
    children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <main className="mx-auto w-full z-40 relative">
                {children}
            </main>
            <Footer />
            
            {/* Lead Capture Popup - Shows on all marketing pages */}
            <LeadCapturePopup trigger="auto" delay={10} source="marketing" />
        </>
    );
};

export default MarketingLayout
