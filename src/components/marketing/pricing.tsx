// app/(marketing)/components/pricing/Pricing.tsx
"use client";

import { PLAN } from "@/constants/plans";
import { cn } from "@/lib";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import Container from "../global/container";
import { Button } from "../ui/button";
import Link from "next/link";

// Define your plans directly here or import from constants
const PLANS: PLAN[] = [
  {
    id: 'Basic',
    title: 'Basic',
    desc: 'Best for small teams and businesses starting with AI support.',
    basicPriceINR: 1999,
    basicPriceUSD: 29,
    customPriceINR: 4999,
    customPriceUSD: 79,
    features: [
      'Unlimited Human agents',
      'Completely Customizable with theme, color, branding, and orientation',
      'AI-backed, multi-lingual chat support with 5000 monthly message',
      'Unlimited Knowledge Base Documents',
      'Real-time Analytics',
      'Real-time Agent Fallback',
      '24 x 7 Premium Support over email, phone, and ticketing', 
      'AI agents: 3',
      'Overages: $15 per 1000 messages',
    ],
    buttonText: 'Choose Plan',
  },
  {
    id: 'Growth',
    title: 'Growth',
    desc: 'For growing organizations needing more volume and customization.',
    basicPriceINR: 4999,
    basicPriceUSD: 79,
    customPriceINR: 9999,
    customPriceUSD: 149,
    features: [
      'Unlimited Human agents',
      'Completely Customizable with theme, color, branding, and orientation',
      'AI-backed, multi-lingual chat support with 10,000 monthly message',
      'Unlimited Knowledge Base Documents',
      'Real-time Analytics',
      'Real-time Agent Fallback',
      'Custom CRM integrations',
      '24 x 7 Premium Support over email, phone, and ticketing', 
      'AI agents: 3',
      'Overages: $15 per 1000 messages',
    ],
    buttonText: 'Choose Plan',
  },
  {
    id: 'Enterprise',
    title: 'Enterprise',
    desc: 'Ideal for large enterprises with high volume and advanced needs.',
    basicPriceINR: 24999,
    basicPriceUSD: 299,
    customPriceINR: 9999,
    customPriceUSD: 299,
    features: [
      'Unlimited Human agents',
      'Completely Customizable with theme, color, branding, and orientation',
      'AI-backed, multi-lingual chat support with 25,000+ monthly message',
      'Unlimited Knowledge Base Documents',
      'Real-time Analytics',
      'Real-time Agent Fallback',
      'Custom CRM integrations',
      '24 x 7 Premium Support over email, phone, and ticketing', 
      'AI agents: Unlimited',
      'Overages: $10 per 1000 messages',
    ],
    buttonText: 'Talk to us',
  }
];

type Currency = 'INR' | 'USD';
type PriceType = 'Standard' | 'Custom';

const Pricing = () => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [priceType, setPriceType] = useState<PriceType>('Standard');

  const handleCurrencyToggle = () => {
    setCurrency(prev => (prev === 'INR' ? 'USD' : 'INR'));
  };

  const handleTypeToggle = () => {
    setPriceType(prev => (prev === 'Standard' ? 'Custom' : 'Standard'));
  };

  return (
    <div id="pricingtab" className="relative flex flex-col items-center justify-center max-w-5xl py-20 mx-auto px-4">

      <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
        <Container>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
              Find the right plan that suits <br className="hidden lg:block" /> <span className="font-subheading italic">your needs</span>
            </h2>
            <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
              Transform your Support with AI-powered automation. Resolve issues faster, save costs and give your users a seamless experience.
            </p>
          </div>
        </Container>

        <Container delay={0.2}>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <span className={cn("text-base font-medium cursor-pointer", currency === 'INR' ? 'text-blue-600' : '')} onClick={() => setCurrency('INR')}>INR</span>
            <button onClick={handleCurrencyToggle} className="relative rounded-full focus:outline-none">
              <div className="w-12 h-6 transition rounded-full shadow-md outline-none bg-blue-500"></div>
              <div
                className={cn(
                  "absolute inline-flex items-center justify-center w-4 h-4 transition-all duration-500 ease-in-out top-1 left-1 rounded-full bg-white",
                  currency === 'USD' ? 'translate-x-6' : 'translate-x-0'
                )}
              />
            </button>
            <span className={cn("text-base font-medium cursor-pointer", currency === 'USD' ? 'text-blue-600' : '')} onClick={() => setCurrency('USD')}>USD</span>
          </div>
          {/* <div className="flex items-center justify-center space-x-4 mt-4">
            <span className={cn("text-base font-medium cursor-pointer", priceType === 'Standard' ? 'text-blue-600' : '')} onClick={() => setPriceType('Standard')}>Standard</span>
            <button onClick={handleTypeToggle} className="relative rounded-full focus:outline-none">
              <div className="w-12 h-6 transition rounded-full shadow-md outline-none bg-blue-500"></div>
              <div
                className={cn(
                  "absolute inline-flex items-center justify-center w-4 h-4 transition-all duration-500 ease-in-out top-1 left-1 rounded-full bg-white",
                  priceType === 'Custom' ? 'translate-x-6' : 'translate-x-0'
                )}
              />
            </button>
            <span className={cn("text-base font-medium cursor-pointer", priceType === 'Custom' ? 'text-blue-600' : '')} onClick={() => setPriceType('Custom')}>Custom</span>
          </div> */}
        </Container>
      </div>

      <div className="grid w-full grid-cols-1 lg:grid-cols-3 auto-rows-fr items-stretch pt-8 lg:pt-12 gap-4 lg:gap-6 max-w-4xl mx-auto">
        {PLANS.map((plan) => (
          <Container key={plan.id} delay={0.1}>
            <Plan plan={plan} currency={currency} priceType={priceType} />
          </Container>
        ))}
      </div>
    </div>
  );
};

const Plan = ({ plan, currency, priceType }: { plan: PLAN; currency: Currency; priceType: PriceType }) => {
  // Determine price based on toggles
  const price = priceType === 'Standard'
    ? (currency === 'INR' ? plan.basicPriceINR : plan.basicPriceUSD)
    : (currency === 'INR' ? plan.customPriceINR : plan.customPriceUSD);

  const currencySymbol = currency === 'INR' ? '₹' : '$';

  return (
    <div className={cn(
      "flex flex-col h-full relative rounded-2xl lg:rounded-3xl transition-all bg-background/ items-start w-full border border-foreground/10 overflow-hidden",
      plan.title === "Custom" && "border-blue-500",
      plan.title === "Growth" && "ring-1 shadow-[0_0_40px_rgba(99,102,241,0.45)]"
    )}>
      {plan.title === "Custom" && (
        <div className="absolute top-1/2 inset-x-0 mx-auto h-12 -rotate-45 w-full bg-blue-600 rounded-2xl lg:rounded-3xl blur-[8rem] -z-10" />
      )}

      <div className="p-4 md:p-8 flex rounded-t-2xl lg:rounded-t-3xl flex-col items-start w-full relative">
        <h2 className="font-medium text-xl text-foreground pt-5">{plan.title}</h2>
        {plan.title === 'Enterprise' ? (
          <div className="mt-3 flex items-center gap-2 flex-nowrap">
            <h3 className="text-3xl font-medium md:text-5xl whitespace-nowrap">
              <NumberFlow
                value={price}
                format={{
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
                suffix=""
              />
              <span className="text-xl font-semibold">{currencySymbol}</span>
            </h3>
            {currency === 'USD' && (
              <span className="inline-flex items-center whitespace-nowrap text-sm font-semibold text-indigo-600 bg-indigo-600/10 px-2 py-1 rounded-md">or Talk to us</span>
            )}
          </div>
        ) : (
          <h3 className="mt-3 text-3xl font-medium md:text-5xl">
            <NumberFlow
              value={price}
              format={{
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }}
              suffix=""
            />
            <span className="text-xl font-semibold">{currencySymbol}</span>
          </h3>
        )}
        <p className="text-sm md:text-base text-muted-foreground mt-2">{plan.desc}</p>
      </div>

      <div className="flex flex-col items-start w-full px-4 py-2 md:px-8">
        <Button asChild size="lg" variant={plan.title === "Custom" ? "blue" : "white"} className="w-full">
          <Link href={plan.title === 'Enterprise' ? 'https://calendly.com/ray-rhythmiqcx/30min' : 'https://app.rhythmiqcx.com/'}>
            {plan.buttonText}
          </Link>
        </Button>
        
        {(
          <div className="h-8 overflow-hidden w-full mx-auto">
            <AnimatePresence mode="wait">
              <motion.span
                key={`${currency}-${priceType}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-sm text-center text-muted-foreground mt-3 mx-auto block"
              >
                {`Priced in ${currency}`}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start w-full p-5 mb-4 ml-1 gap-y-2">
        <span className="text-base text-left mb-2">Includes:</span>
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start justify-start gap-2">
            <CheckIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-green-600" />
            <span className="leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
