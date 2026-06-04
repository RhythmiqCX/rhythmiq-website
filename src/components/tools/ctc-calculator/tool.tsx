"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IndianRupee,
  Percent,
  Building2,
  Shield,
  Landmark,
  Receipt,
  Wallet,
  TrendingDown,
  Award,
  ChevronDown,
  ChevronUp,
  Info,
  Calculator,
} from "lucide-react";

const NEW_REGIME_SLABS = [
  { from: 0, to: 400000, rate: 0 },
  { from: 400000, to: 800000, rate: 5 },
  { from: 800000, to: 1200000, rate: 10 },
  { from: 1200000, to: 1600000, rate: 15 },
  { from: 1600000, to: 2000000, rate: 20 },
  { from: 2000000, to: 2400000, rate: 25 },
  { from: 2400000, to: Infinity, rate: 30 },
];

const OLD_REGIME_SLABS_BELOW_60 = [
  { from: 0, to: 250000, rate: 0 },
  { from: 250000, to: 500000, rate: 5 },
  { from: 500000, to: 1000000, rate: 20 },
  { from: 1000000, to: Infinity, rate: 30 },
];

const OLD_REGIME_SLABS_60_TO_80 = [
  { from: 0, to: 300000, rate: 0 },
  { from: 300000, to: 500000, rate: 5 },
  { from: 500000, to: 1000000, rate: 20 },
  { from: 1000000, to: Infinity, rate: 30 },
];

const OLD_REGIME_SLABS_ABOVE_80 = [
  { from: 0, to: 500000, rate: 0 },
  { from: 500000, to: 1000000, rate: 20 },
  { from: 1000000, to: Infinity, rate: 30 },
];

const PROFESSIONAL_TAX: Record<string, number> = {
  Maharashtra: 200,
  Karnataka: 200,
  "West Bengal": 200,
  "Andhra Pradesh": 200,
  Telangana: 200,
  "Tamil Nadu": 162,
  Gujarat: 200,
  Kerala: 208,
  "Madhya Pradesh": 208,
  Bihar: 208,
  Odisha: 200,
  Assam: 208,
  Jharkhand: 208,
  Meghalaya: 208,
  Tripura: 208,
  Rajasthan: 0,
  "Uttar Pradesh": 0,
  Delhi: 0,
  Haryana: 0,
  Punjab: 0,
  Other: 200,
};

function computeTax(
  taxableIncome: number,
  slabs: { from: number; to: number; rate: number }[],
) {
  let tax = 0;
  for (const slab of slabs) {
    if (taxableIncome <= slab.from) break;
    const taxable = Math.min(taxableIncome, slab.to) - slab.from;
    tax += (taxable * slab.rate) / 100;
  }
  // Add 4% Health and Education Cess
  tax += tax * 0.04;
  return tax;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CTCCalculatorTool() {
  // Basic inputs
  const [annualCTC, setAnnualCTC] = useState<number>(1200000);
  const [basicPercent, setBasicPercent] = useState<number>(40);
  const [hraPercent, setHraPercent] = useState<number>(50);
  const [bonusPercent, setBonusPercent] = useState<number>(10);
  const [otherAllowances, setOtherAllowances] = useState<number>(0);
  const [taxRegime, setTaxRegime] = useState<string>("new");

  // Advanced inputs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [state, setState] = useState<string>("Maharashtra");
  const [ageGroup, setAgeGroup] = useState<string>("below60");
  const [investment80C, setInvestment80C] = useState<number>(150000);
  const [healthInsurance, setHealthInsurance] = useState<number>(25000);
  const [yearsOfExp, setYearsOfExp] = useState<number>(5);

  // ─── Calculation Logic ──────────────────────────────────────────────────────
  const results = useMemo(() => {
    const ctc = annualCTC;

    // Basic components
    const annualBasic = (ctc * basicPercent) / 100;
    const annualHRA = (annualBasic * hraPercent) / 100;
    const annualBonus = (ctc * bonusPercent) / 100;

    const pfBasicMonthly = Math.min(annualBasic / 12, 15000);
    const employeePFMonthly = pfBasicMonthly * 0.12;
    const employerPFMonthly = pfBasicMonthly * 0.12;
    const employeePFAnnual = employeePFMonthly * 12;
    const employerPFAnnual = employerPFMonthly * 12;

    // Gratuity (4.81% of Basic if experience >= 5 years)
    const gratuityAnnual = yearsOfExp >= 5 ? annualBasic * 0.0481 : 0;

    // Special Allowance (remaining after known components)
    const specialAllowance = Math.max(
      0,
      ctc -
        annualBasic -
        annualHRA -
        annualBonus -
        employerPFAnnual -
        gratuityAnnual -
        otherAllowances,
    );

    // Gross Salary (CTC - Employer PF - Gratuity)
    const annualGross = ctc - employerPFAnnual - gratuityAnnual;
    const monthlyGross = annualGross / 12;

    // Professional Tax
    const monthlyPT = PROFESSIONAL_TAX[state] || 200;
    const annualPT = monthlyPT * 12;

    // Taxable Income calculation
    let taxableIncome = annualGross - employeePFAnnual;
    let slabs: { from: number; to: number; rate: number }[];

    if (taxRegime === "new") {
      // New Regime: Standard deduction of ₹75,000
      taxableIncome -= 75000;
      slabs = NEW_REGIME_SLABS;
    } else {
      // Old Regime deductions
      taxableIncome -= 50000; // Standard deduction
      taxableIncome -= Math.min(investment80C, 150000); // 80C
      taxableIncome -= Math.min(healthInsurance, 25000); // 80D
      taxableIncome -= annualPT; // Professional Tax deduction
      // HRA Exemption (simplified: assume metro)
      const hraExemption = Math.min(
        annualHRA,
        annualBasic * 0.5,
        annualHRA - annualBasic * 0.1,
      );
      if (hraExemption > 0) {
        taxableIncome -= hraExemption;
      }

      // Select slab based on age
      if (ageGroup === "above80") {
        slabs = OLD_REGIME_SLABS_ABOVE_80;
      } else if (ageGroup === "60to80") {
        slabs = OLD_REGIME_SLABS_60_TO_80;
      } else {
        slabs = OLD_REGIME_SLABS_BELOW_60;
      }
    }

    taxableIncome = Math.max(0, taxableIncome);
    const annualTax = computeTax(taxableIncome, slabs);
    const monthlyTax = annualTax / 12;

    // Monthly In-Hand
    const monthlyInHand =
      monthlyGross - employeePFMonthly - monthlyPT - monthlyTax;

    // Annual In-Hand
    const annualInHand = monthlyInHand * 12;

    return {
      annualCTC: ctc,
      annualBasic,
      annualHRA,
      annualBonus,
      specialAllowance,
      employeePFAnnual,
      employerPFAnnual,
      employeePFMonthly,
      gratuityAnnual,
      annualGross,
      monthlyGross,
      annualPT,
      monthlyPT,
      taxableIncome,
      annualTax,
      monthlyTax,
      monthlyInHand,
      annualInHand,
      otherAllowances,
    };
  }, [
    annualCTC,
    basicPercent,
    hraPercent,
    bonusPercent,
    otherAllowances,
    taxRegime,
    state,
    ageGroup,
    investment80C,
    healthInsurance,
    yearsOfExp,
  ]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const formatNumber = (val: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(val);

  // Breakdown rows for the salary table
  const breakdownRows = [
    {
      label: "Basic Salary",
      annual: results.annualBasic,
      monthly: results.annualBasic / 12,
      type: "earning",
    },
    {
      label: "House Rent Allowance",
      annual: results.annualHRA,
      monthly: results.annualHRA / 12,
      type: "earning",
    },
    {
      label: "Special Allowance",
      annual: results.specialAllowance,
      monthly: results.specialAllowance / 12,
      type: "earning",
    },
    {
      label: "Bonus",
      annual: results.annualBonus,
      monthly: results.annualBonus / 12,
      type: "earning",
    },
    ...(results.otherAllowances > 0
      ? [
          {
            label: "Other Allowances",
            annual: results.otherAllowances,
            monthly: results.otherAllowances / 12,
            type: "earning" as const,
          },
        ]
      : []),
    {
      label: "Employee PF",
      annual: results.employeePFAnnual,
      monthly: results.employeePFMonthly,
      type: "deduction",
    },
    {
      label: "Employer PF",
      annual: results.employerPFAnnual,
      monthly: results.employerPFAnnual / 12,
      type: "deduction",
    },
    {
      label: "Gratuity",
      annual: results.gratuityAnnual,
      monthly: results.gratuityAnnual / 12,
      type: "deduction",
    },
    {
      label: "Professional Tax",
      annual: results.annualPT,
      monthly: results.monthlyPT,
      type: "deduction",
    },
    {
      label: "Income Tax (Est.)",
      annual: results.annualTax,
      monthly: results.monthlyTax,
      type: "deduction",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Column: Inputs — 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <MagicCard
            className="p-8 bg-white border border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]"
            gradientColor="rgba(232, 93, 47, 0.05)"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-coralSoft rounded-xl text-coral">
                  <Calculator className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-ink">Salary Details</h2>
              </div>

              <p className="text-muted-foreground text-sm">
                Enter your CTC and salary structure details to calculate your
                monthly in-hand salary.
              </p>

              <div className="space-y-8 pt-2">
                {/* Annual CTC */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="annualCTC"
                      className="flex items-center gap-2 text-base text-ink"
                    >
                      <IndianRupee className="w-4 h-4 text-coral" />
                      Annual CTC
                    </Label>
                    <span className="font-bold text-coral text-lg">
                      {formatINR(annualCTC)}
                    </span>
                  </div>
                  <Input
                    id="annualCTC"
                    type="number"
                    min={0}
                    value={annualCTC}
                    onChange={(e) =>
                      setAnnualCTC(Math.max(0, Number(e.target.value) || 0))
                    }
                    className="bg-white"
                    placeholder="e.g. 1200000"
                  />
                </div>

                {/* Basic Salary % */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="basicPercent"
                      className="flex items-center gap-2"
                    >
                      <Percent className="w-4 h-4 text-coral" />
                      Basic Salary %
                    </Label>
                    <span className="font-semibold text-ink">{basicPercent}%</span>
                  </div>
                  <Slider
                    id="basicPercent"
                    min={20}
                    max={60}
                    step={1}
                    value={[basicPercent]}
                    onValueChange={(val) => setBasicPercent(val[0])}
                  />
                </div>

                {/* HRA % of Basic */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="hraPercent"
                      className="flex items-center gap-2"
                    >
                      <Building2 className="w-4 h-4 text-coral" />
                      HRA (% of Basic)
                    </Label>
                    <span className="font-semibold text-ink">{hraPercent}%</span>
                  </div>
                  <Slider
                    id="hraPercent"
                    min={0}
                    max={100}
                    step={5}
                    value={[hraPercent]}
                    onValueChange={(val) => setHraPercent(val[0])}
                  />
                </div>

                {/* Bonus % */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="bonusPercent"
                      className="flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-coral" />
                      Bonus (% of CTC)
                    </Label>
                    <span className="font-semibold text-ink">{bonusPercent}%</span>
                  </div>
                  <Slider
                    id="bonusPercent"
                    min={0}
                    max={30}
                    step={1}
                    value={[bonusPercent]}
                    onValueChange={(val) => setBonusPercent(val[0])}
                  />
                </div>

                {/* Other Allowances */}
                <div className="space-y-3">
                  <Label
                    htmlFor="otherAllowances"
                    className="flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4 text-coral" />
                    Other Annual Allowances (₹)
                  </Label>
                  <Input
                    id="otherAllowances"
                    type="number"
                    min={0}
                    value={otherAllowances}
                    onChange={(e) =>
                      setOtherAllowances(
                        Math.max(0, Number(e.target.value) || 0),
                      )
                    }
                    className="bg-white"
                    placeholder="e.g. 50000"
                  />
                </div>

                {/* Tax Regime */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-coral" />
                    Tax Regime
                  </Label>
                  <Tabs
                    value={taxRegime}
                    onValueChange={setTaxRegime}
                    className="w-full"
                  >
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="new">
                        New Regime (FY 2025-26)
                      </TabsTrigger>
                      <TabsTrigger value="old">Old Regime</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm font-medium text-coral hover:text-coral2 transition-colors pt-2"
              >
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {showAdvanced ? "Hide" : "Show"} Advanced Options
              </button>

              {showAdvanced && (
                <div className="space-y-6 pt-4 border-t border-ink/10 animate-in slide-in-from-top-2 duration-300">
                  {/* State */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-coral" />
                      State (Professional Tax)
                    </Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(PROFESSIONAL_TAX).map((s) => (
                          <SelectItem key={s} value={s}>
                            {s} — ₹{PROFESSIONAL_TAX[s]}/mo
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Age Group (only for Old Regime) */}
                  {taxRegime === "old" && (
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-coral" />
                        Age Group
                      </Label>
                      <Select value={ageGroup} onValueChange={setAgeGroup}>
                        <SelectTrigger className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="below60">Below 60</SelectItem>
                          <SelectItem value="60to80">60 – 80</SelectItem>
                          <SelectItem value="above80">Above 80</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* 80C Investment (Old Regime only) */}
                  {taxRegime === "old" && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-coral" />
                          Investment under 80C (₹)
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          Max ₹1,50,000
                        </span>
                      </div>
                      <Input
                        type="number"
                        min={0}
                        max={150000}
                        value={investment80C}
                        onChange={(e) =>
                          setInvestment80C(
                            Math.min(
                              150000,
                              Math.max(0, Number(e.target.value) || 0),
                            ),
                          )
                        }
                        className="bg-white"
                      />
                    </div>
                  )}

                  {/* Health Insurance (Old Regime only) */}
                  {taxRegime === "old" && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-coral" />
                          Health Insurance Premium 80D (₹)
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          Max ₹25,000
                        </span>
                      </div>
                      <Input
                        type="number"
                        min={0}
                        max={25000}
                        value={healthInsurance}
                        onChange={(e) =>
                          setHealthInsurance(
                            Math.min(
                              25000,
                              Math.max(0, Number(e.target.value) || 0),
                            ),
                          )
                        }
                        className="bg-white"
                      />
                    </div>
                  )}

                  {/* Years of Experience */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-coral" />
                        Years of Experience
                      </Label>
                      <span className="font-semibold text-ink">{yearsOfExp} yrs</span>
                    </div>
                    <Slider
                      min={0}
                      max={40}
                      step={1}
                      value={[yearsOfExp]}
                      onValueChange={(val) => setYearsOfExp(val[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Gratuity applies after 5 years of continuous service
                    </p>
                  </div>
                </div>
              )}
            </div>
          </MagicCard>
        </div>

        {/* Right Column: Results — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero: Monthly In-Hand */}
          <Card className="bg-white border border-[#1F7A4D]/20 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)] overflow-hidden relative">
            <CardContent className="p-8">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Monthly In-Hand Salary
                </p>
                <h3 className="text-4xl md:text-5xl font-bold text-[#1F7A4D] tracking-tight">
                  {formatINR(Math.max(0, results.monthlyInHand))}
                </h3>
                <p className="text-xs text-muted-foreground pt-1">
                  Annual: {formatINR(Math.max(0, results.annualInHand))}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Gross */}
          <Card className="bg-white border border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-coralSoft rounded-lg text-coral">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <p className="text-muted-foreground">Monthly Gross</p>
                </div>
                <span className="text-2xl font-bold text-ink">
                  {formatINR(results.monthlyGross)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Deductions Summary */}
          <Card className="bg-white border border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#C9461F]/10 rounded-lg text-[#C9461F]">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <p className="font-semibold text-ink">Monthly Deductions</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employee PF</span>
                  <span className="font-medium text-[#C9461F]">
                    −{formatINR(results.employeePFMonthly)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Professional Tax
                  </span>
                  <span className="font-medium text-[#C9461F]">
                    −{formatINR(results.monthlyPT)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Income Tax (Est.)
                  </span>
                  <span className="font-medium text-[#C9461F]">
                    −{formatINR(results.monthlyTax)}
                  </span>
                </div>
                <div className="border-t border-ink/10 pt-3 flex justify-between font-semibold text-ink">
                  <span>Total Deductions</span>
                  <span className="text-[#C9461F]">
                    −
                    {formatINR(
                      results.employeePFMonthly +
                        results.monthlyPT +
                        results.monthlyTax,
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employer Contributions */}
          <Card className="bg-white border border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-coralSoft rounded-lg text-coral">
                  <Receipt className="w-5 h-5" />
                </div>
                <p className="font-semibold text-ink">Employer Contributions</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employer PF</span>
                  <span className="font-medium text-ink">
                    {formatINR(results.employerPFAnnual / 12)}
                    <span className="text-muted-foreground text-xs ml-1">
                      /mo
                    </span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Gratuity{" "}
                    {yearsOfExp < 5 && (
                      <span className="text-xs">(need 5 yrs)</span>
                    )}
                  </span>
                  <span className="font-medium text-ink">
                    {formatINR(results.gratuityAnnual / 12)}
                    <span className="text-muted-foreground text-xs ml-1">
                      /mo
                    </span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Taxable Income */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-ink/10 bg-white">
              <p className="text-sm text-muted-foreground mb-1">
                Taxable Income
              </p>
              <p className="text-lg font-semibold text-ink">
                {formatINR(results.taxableIncome)}
              </p>
            </div>
            <div className="p-5 rounded-xl border border-ink/10 bg-white">
              <p className="text-sm text-muted-foreground mb-1">Annual Tax</p>
              <p className="text-lg font-semibold text-[#C9461F]">
                {formatINR(results.annualTax)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown Table */}
      <MagicCard
        className="p-8 bg-white border border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]"
        gradientColor="rgba(232, 93, 47, 0.03)"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3 text-ink">
            <Receipt className="w-6 h-6 text-coral" />
            Detailed Salary Breakdown
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                    Component
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                    Monthly (₹)
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                    Annual (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Earnings */}
                <tr>
                  <td
                    colSpan={3}
                    className="py-3 px-4 font-semibold text-[#1F7A4D] text-xs uppercase tracking-wider"
                  >
                    Earnings
                  </td>
                </tr>
                {breakdownRows
                  .filter((r) => r.type === "earning")
                  .map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-ink/10 hover:bg-paper2 transition-colors"
                    >
                      <td className="py-3 px-4 text-ink">{row.label}</td>
                      <td className="py-3 px-4 text-right font-medium text-ink">
                        {formatNumber(row.monthly)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-ink">
                        {formatNumber(row.annual)}
                      </td>
                    </tr>
                  ))}

                {/* Gross */}
                <tr className="bg-paper2 font-semibold text-ink">
                  <td className="py-3 px-4">Gross Salary</td>
                  <td className="py-3 px-4 text-right">
                    {formatNumber(results.monthlyGross)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {formatNumber(results.annualGross)}
                  </td>
                </tr>

                {/* Deductions */}
                <tr>
                  <td
                    colSpan={3}
                    className="py-3 px-4 font-semibold text-[#C9461F] text-xs uppercase tracking-wider pt-5"
                  >
                    Deductions
                  </td>
                </tr>
                {breakdownRows
                  .filter((r) => r.type === "deduction")
                  .map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-ink/10 hover:bg-paper2 transition-colors"
                    >
                      <td className="py-3 px-4 text-ink">{row.label}</td>
                      <td className="py-3 px-4 text-right font-medium text-[#C9461F]">
                        {row.monthly > 0
                          ? `−${formatNumber(row.monthly)}`
                          : "0"}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-[#C9461F]">
                        {row.annual > 0 ? `−${formatNumber(row.annual)}` : "0"}
                      </td>
                    </tr>
                  ))}

                {/* In-Hand */}
                <tr className="bg-[#E2F1E8] font-bold text-[#1F7A4D]">
                  <td className="py-4 px-4 text-base">Net In-Hand Salary</td>
                  <td className="py-4 px-4 text-right text-base">
                    {formatNumber(Math.max(0, results.monthlyInHand))}
                  </td>
                  <td className="py-4 px-4 text-right text-base">
                    {formatNumber(Math.max(0, results.annualInHand))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}
