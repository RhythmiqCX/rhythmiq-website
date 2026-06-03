"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  FileText,
  Phone,
  HeartHandshake,
  Bot,
  Sparkles
} from "lucide-react";
import Container from "@/components/global/container";

const RestaurantLinks = () => {
  const alternatives = [
    { 
      name: "Vapi Alternative", 
      href: "/vapi-alternative", 
      desc: "Why juggling a 4-vendor telephony stack and per-minute bills is wrong for busy dining rooms.",
      badge: "Telephony Stack",
      badgeClass: "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
      glowClass: "from-blue-500/15 via-blue-500/5 to-transparent",
      hoverBorderClass: "hover:border-blue-500/40"
    },
    { 
      name: "Bland AI Alternative", 
      href: "/bland-ai-alternative", 
      desc: "Why developer-first APIs slow down menu integration. Get native Toast and Square POS sync instead.",
      badge: "POS Integration",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
      glowClass: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      hoverBorderClass: "hover:border-emerald-500/40"
    },
    { 
      name: "Retell AI Alternative", 
      href: "/retell-ai-alternative", 
      desc: "Skip developer fees and complex setups. Get a flat-rate restaurant phone answerer live in minutes.",
      badge: "Setup & Fees",
      badgeClass: "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
      glowClass: "from-amber-500/15 via-amber-500/5 to-transparent",
      hoverBorderClass: "hover:border-amber-500/40"
    },
    { 
      name: "Synthflow Alternative", 
      href: "/synthflow-alternative", 
      desc: "Evaluate POS-integrated takeout ordering, OpenTable reserves, and pricing plan differences.",
      badge: "System Sync",
      badgeClass: "bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.15)]",
      glowClass: "from-purple-500/15 via-purple-500/5 to-transparent",
      hoverBorderClass: "hover:border-purple-500/40"
    }
  ];

  const solutions = [
    { 
      name: "AI Phone Receptionist", 
      href: "/voice-ai", 
      desc: "24/7 custom phone agents for high-accuracy answering services.",
      icon: Phone 
    },
    { 
      name: "Customer Support AI", 
      href: "/ai-customer-support", 
      desc: "Frontline support ticket deflection and no-code helpdesk tools.",
      icon: HeartHandshake 
    },
    { 
      name: "Conversational AI Chatbot", 
      href: "/conversational-ai-chatbot", 
      desc: "Custom natural-language chatbot builders for websites.",
      icon: Bot 
    },
    { 
      name: "AI Web Widget", 
      href: "/rhythmiq-ai-web-widget", 
      desc: "Embeddable web chat widgets to convert web traffic into leads.",
      icon: Sparkles 
    }
  ];

  const blogs = [
    {
      title: "How AI Voice Assistants Help Restaurants Capture More Reservations",
      href: "/blog/how-ai-voice-assistants-help-restaurants-capture-more-reservations",
      excerpt: "Discover the tactical strategies busy diners and fine dining rooms use to automate reservations during peak rushes.",
      tag: "Case Study",
      readTime: "5 min read"
    },
    {
      title: "AI Phone Answering App for One-Person Businesses",
      href: "/blog/ai-phone-answering-app-one-person",
      excerpt: "Learn how independent cafes and food stalls automate phone calls without paying for a full-time receptionist.",
      tag: "Guide",
      readTime: "4 min read"
    },
    {
      title: "Will an AI Receptionist Replace Humans?",
      href: "/blog/will-ai-replace-receptionist",
      excerpt: "An honest look at how voice AI works alongside hosts and servers to reduce stress rather than replace jobs.",
      tag: "Opinion",
      readTime: "6 min read"
    },
    {
      title: "The Real Cost of Voice AI in 2026",
      href: "/blog/real-cost-of-voice-ai",
      excerpt: "Breaking down middleware charges, API fees, and why flat-rate platforms save restaurants money.",
      tag: "Pricing Guide",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="w-full space-y-24 bg-background">
      {/* 1. Compare Alternatives Section - Premium Cards */}
      <section className="relative w-full py-20 bg-slate-950/20 border-t border-b border-slate-900/60 overflow-hidden">
        {/* Ambient radial glow */}
        <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent opacity-60 pointer-events-none" />

        <Container>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900 text-slate-300 text-xs font-semibold uppercase tracking-wider">
              <Layers className="size-3.5" />
              Compare Alternatives
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-white">
              Smarter Restaurant Call Answering Without the Complexity
            </h2>
            <p className="text-sm md:text-base text-slate-400">
              See how Rhythmiq compared side-by-side with developer-first telephony middleware providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
            {alternatives.map((alt, i) => (
              <Link
                key={i}
                href={alt.href}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/40 bg-zinc-950/80 backdrop-blur-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_25px_60px_rgba(0,0,0,0.55)] ${alt.hoverBorderClass} h-full`}
              >
                {/* Ambient glow system: subtle radial gradient top-right, <8% opacity, contained */}
                <div className={`absolute top-0 right-0 w-72 h-72 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] ${alt.glowClass} blur-3xl pointer-events-none rounded-tr-2xl`} />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.025] via-transparent to-transparent pointer-events-none" />
                {/* Subtle hover gradient glow inside cards */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                <div className="flex flex-col space-y-3 relative z-10 flex-grow">
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase ${alt.badgeClass}`}>
                      {alt.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-[30px] font-bold font-heading text-white tracking-tight leading-snug group-hover:text-white transition-colors duration-200">
                    {alt.name}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed font-normal flex-grow">
                    {alt.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-900/60 flex items-center justify-between text-sm text-slate-400 group-hover:text-white transition-colors duration-200 relative z-10">
                  <span className="font-semibold uppercase tracking-[0.15em] text-xs">READ FULL COMPARISON</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Related Solutions Section - Product Ecosystem Grid */}
      <section className="relative w-full overflow-hidden">
        <Container>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900 text-slate-300 text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="size-3.5" />
              Related Solutions
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-white">
              Omnichannel Support & Automation Suite
            </h2>
            <p className="text-sm md:text-base text-slate-400">
              Unify your phone systems and customer interaction workflows on a single platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-6xl mx-auto border-t border-slate-900/60 pt-12">
            {solutions.map((sol, i) => {
              const IconComponent = sol.icon;
              return (
                <Link
                  key={i}
                  href={sol.href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/40 bg-slate-950/40 p-7 transition-all duration-300 hover:border-amber-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5 hover:scale-[1.02] h-full"
                >
                  {/* Top Corner Accent: subtle glow in upper-right corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/[0.04] to-transparent blur-xl pointer-events-none rounded-tr-2xl" />

                  {/* Subtle hover gradient glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                  <div className="flex flex-col space-y-5 relative z-10 flex-grow">
                    {/* Icon container - size-16 (64px), rounded-2xl, premium border, soft dark background, icon glow intensifies */}
                    <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-amber-500/90 group-hover:text-amber-400 group-hover:border-amber-500/30 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:bg-slate-900 transition-all duration-300">
                      <IconComponent className="size-8" />
                    </div>

                    <div className="space-y-2 flex-grow">
                      <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-400 transition-colors duration-200">
                        {sol.name}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {sol.desc}
                      </p>
                    </div>
                  </div>

                  {/* Separated CTA Area / Footer */}
                  <div className="mt-8 pt-4 border-t border-slate-900/80 flex items-center justify-between text-xs text-amber-500 font-semibold group-hover:text-amber-400 transition-colors duration-200 relative z-10">
                    <span>Explore Solution</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. Related Resources (Blogs) Section - Magazine-Style Editorial Hub */}
      <section className="relative w-full py-20 bg-slate-950/20 border-t border-b border-slate-900/60">
        <Container>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900 text-slate-300 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="size-3.5" />
              Related Resources
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">
              Guides & Industry Insights
            </h2>
            <p className="text-sm md:text-base text-slate-400">
              Read how food and hospitality operators leverage conversational AI and call automation.
            </p>
          </div>

          {/* Magazine Editorial Grid - Pure Spacing, Zero Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-5xl mx-auto">
            {/* Featured Resource (Left Column, col-span-7) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-800/50 bg-zinc-950/60 backdrop-blur-sm p-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-semibold tracking-wider uppercase text-slate-500">
                  <span className="text-amber-400 font-bold">{blogs[0].tag}</span>
                  <span>•</span>
                  <span>{blogs[0].readTime}</span>
                </div>
                <Link href={blogs[0].href} className="group block">
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight font-heading group-hover:text-amber-400 transition-colors">
                    {blogs[0].title}
                  </h3>
                </Link>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed font-normal">
                  {blogs[0].excerpt}
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4">
  <div className="rounded-xl border border-slate-800/50 bg-slate-950/60 p-4">
    <div className="text-3xl font-bold text-amber-400">24/7</div>
    <div className="text-xs text-slate-400 mt-1">Call Coverage</div>
  </div>

  <div className="rounded-xl border border-slate-800/50 bg-slate-950/60 p-4">
    <div className="text-3xl font-bold text-amber-400">0</div>
    <div className="text-xs text-slate-400 mt-1">Missed Calls</div>
  </div>

  <div className="rounded-xl border border-slate-800/50 bg-slate-950/60 p-4">
    <div className="text-3xl font-bold text-amber-400">5x</div>
    <div className="text-xs text-slate-400 mt-1">Faster Booking</div>
  </div>
</div>
              </div>
              <div>
                <Link href={blogs[0].href} className="group inline-flex items-center gap-2 text-xs text-amber-500 font-bold hover:text-amber-400 transition-colors">
                  <FileText className="size-4" />
                  <span>Read article</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* List Resources (Right Column, col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-5"> 
              {blogs.slice(1).map((blog, i) => (
                <Link
                  key={i}
                  href={blog.href}
                  className="group block rounded-2xl border border-slate-800/40 bg-zinc-950/40 p-5 hover:border-amber-500/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-between items-center text-[10px] tracking-wider uppercase text-slate-500 font-medium">
                    <span className="text-amber-400 font-semibold">{blog.tag}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-1">
                    {blog.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <span className="text-[10px] text-amber-500 font-semibold inline-flex items-center gap-1 group-hover:underline pt-1">
                    <FileText className="size-3" /> Read article
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default RestaurantLinks;
