import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import AnnouncementBar from "@/components/marketing/announcement-bar";
import SmoothScroll from "@/components/global/smooth-scroll";
import React from 'react';

interface Props {
    children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <>
            <SmoothScroll />
            <AnnouncementBar />
            <Navbar />
            <main className="mx-auto w-full z-40 relative">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default MarketingLayout
