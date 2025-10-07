import Link from "next/link";
import Container from "../global/container";
import Icons from "../global/icons";

const Footer = () => {
  return (
    <footer className="flex flex-col relative items-center justify-center border-t border-foreground/5 pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32">
<div className="grid xl:grid-cols-3 gap-8 w-full items-start">
  {/* Left column: Logo + description */}
  <Container>
    <div className="flex flex-col items-start justify-start md:max-w-[200px]">
      <div className="flex items-center gap-2">
        <Icons.icon className="w-auto h-5" />
        <span className="text-base md:text-lg font-medium text-foreground">
          Rhythmiq
        </span>
      </div>
      <p className="text-muted-foreground mt-4 text-sm text-start">
        AI-powered platform that transforms your customer support workflow in seconds.
      </p>
    </div>
  </Container>

  {/* Right side: all link groups side-by-side */}
  <div className="col-span-2">
    <div className="grid grid-cols-5 gap-8">
      <Container delay={0.1} className="h-auto">
        <h3 className="text-base font-medium text-foreground">Product</h3>
        <ul className="mt-4 text-sm text-muted-foreground space-y-4">
          <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
          <li><Link href="/ai-chatbot-pricing" className="hover:text-foreground">Pricing</Link></li>
          <li><Link href="#languages" className="hover:text-foreground">Supported Languages</Link></li>
        </ul>
      </Container>

      <Container delay={0.2} className="h-auto">
        <h3 className="text-base font-medium text-foreground">Solutions</h3>
        <ul className="mt-4 text-sm text-muted-foreground space-y-4">
          <li><Link href="/rhythmiq-ai-web-widget">Rhythmiq AI Web Widget</Link></li>
          <li><Link href="/whatsapp-ai-chatbot">Whatsapp AI Chatbot</Link></li>
          <li><Link href="/voice-ai">Realtime Voice AI</Link></li>
        </ul>
      </Container>

      <Container delay={0.3} className="h-auto">
        <h3 className="text-base font-medium text-foreground">Resources</h3>
        <ul className="mt-4 text-sm text-muted-foreground space-y-4">
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/contact-us">Support</Link></li>
        </ul>
      </Container>

      <Container delay={0.4} className="h-auto">
        <h3 className="text-base font-medium text-foreground">Company</h3>
        <ul className="mt-4 text-sm text-muted-foreground space-y-4">
          <li><Link href="/about-us">About Us</Link></li>
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
        </ul>
      </Container>

      <Container delay={0.5} className="h-auto">
        <h3 className="text-base font-medium text-foreground">Comparison</h3>
        <ul className="mt-4 text-sm text-muted-foreground space-y-4">
          <li><Link href="/tawk-to-comparsion">Tawk.to vs RhythmiqCX</Link></li>
        </ul>
      </Container>
    </div>
  </div>
</div>


      <Container delay={0.5} className="w-full relative mt-12 lg:mt-20">
        <div className="mt-8 md:flex md:items-center justify-center footer w-full">
          <p className="text-sm text-muted-foreground mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} Rhythmiq. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
