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
            className="p-8 border-border/50 shadow-2xl"
            gradientColor="rgba(99, 102, 241, 0.05)"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500">
                  <Calculator className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Salary Details</h2>
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
                      className="flex items-center gap-2 text-base"
                    >
                      <IndianRupee className="w-4 h-4 text-emerald-500" />
                      Annual CTC
                    </Label>
                    <span className="font-bold text-emerald-500 text-lg">
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
                    className="bg-background/50"
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
                      <Percent className="w-4 h-4 text-blue-500" />
                      Basic Salary %
                    </Label>
                    <span className="font-semibold">{basicPercent}%</span>
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
                      <Building2 className="w-4 h-4 text-orange-500" />
                      HRA (% of Basic)
                    </Label>
                    <span className="font-semibold">{hraPercent}%</span>
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
                      <Award className="w-4 h-4 text-amber-500" />
                      Bonus (% of CTC)
                    </Label>
                    <span className="font-semibold">{bonusPercent}%</span>
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
                    <Wallet className="w-4 h-4 text-violet-500" />
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
                    className="bg-background/50"
                    placeholder="e.g. 50000"
                  />
                </div>

                {/* Tax Regime */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-cyan-500" />
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
                className="flex items-center gap-2 text-sm font-medium text-indigo-500 hover:text-indigo-400 transition-colors pt-2"
              >
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {showAdvanced ? "Hide" : "Show"} Advanced Options
              </button>

              {showAdvanced && (
                <div className="space-y-6 pt-4 border-t border-border/40 animate-in slide-in-from-top-2 duration-300">
                  {/* State */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-teal-500" />
                      State (Professional Tax)
                    </Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger className="bg-background/50">
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
                        <Info className="w-4 h-4 text-sky-500" />
                        Age Group
                      </Label>
                      <Select value={ageGroup} onValueChange={setAgeGroup}>
                        <SelectTrigger className="bg-background/50">
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
                          <Shield className="w-4 h-4 text-green-500" />
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
                        className="bg-background/50"
                      />
                    </div>
                  )}

                  {/* Health Insurance (Old Regime only) */}
                  {taxRegime === "old" && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-pink-500" />
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
                        className="bg-background/50"
                      />
                    </div>
                  )}

                  {/* Years of Experience */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        Years of Experience
                      </Label>
                      <span className="font-semibold">{yearsOfExp} yrs</span>
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
          <Card className="border-emerald-500/20 shadow-lg shadow-emerald-500/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-bl-full -z-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/5 rounded-tr-full -z-10" />
            <CardContent className="p-8">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Monthly In-Hand Salary
                </p>
                <h3 className="text-4xl md:text-5xl font-bold text-emerald-500 tracking-tight">
                  {formatINR(Math.max(0, results.monthlyInHand))}
                </h3>
                <p className="text-xs text-muted-foreground pt-1">
                  Annual: {formatINR(Math.max(0, results.annualInHand))}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Gross */}
          <Card className="border-border/50 shadow-lg shadow-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <p className="text-muted-foreground">Monthly Gross</p>
                </div>
                <span className="text-2xl font-bold">
                  {formatINR(results.monthlyGross)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Deductions Summary */}
          <Card className="border-border/50 shadow-lg shadow-red-500/5">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <p className="font-semibold">Monthly Deductions</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employee PF</span>
                  <span className="font-medium text-red-400">
                    −{formatINR(results.employeePFMonthly)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Professional Tax
                  </span>
                  <span className="font-medium text-red-400">
                    −{formatINR(results.monthlyPT)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Income Tax (Est.)
                  </span>
                  <span className="font-medium text-red-400">
                    −{formatINR(results.monthlyTax)}
                  </span>
                </div>
                <div className="border-t border-border/40 pt-3 flex justify-between font-semibold">
                  <span>Total Deductions</span>
                  <span className="text-red-500">
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
          <Card className="border-border/50 shadow-lg shadow-indigo-500/5">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                  <Receipt className="w-5 h-5" />
                </div>
                <p className="font-semibold">Employer Contributions</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employer PF</span>
                  <span className="font-medium">
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
                  <span className="font-medium">
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
            <div className="p-5 rounded-xl border border-border/50 bg-muted/20">
              <p className="text-sm text-muted-foreground mb-1">
                Taxable Income
              </p>
              <p className="text-lg font-semibold">
                {formatINR(results.taxableIncome)}
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-muted/20">
              <p className="text-sm text-muted-foreground mb-1">Annual Tax</p>
              <p className="text-lg font-semibold text-red-400">
                {formatINR(results.annualTax)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown Table */}
      <MagicCard
        className="p-8 border-border/50 shadow-2xl"
        gradientColor="rgba(99, 102, 241, 0.03)"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Receipt className="w-6 h-6 text-indigo-500" />
            Detailed Salary Breakdown
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60">
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
                    className="py-3 px-4 font-semibold text-emerald-500 text-xs uppercase tracking-wider"
                  >
                    Earnings
                  </td>
                </tr>
                {breakdownRows
                  .filter((r) => r.type === "earning")
                  .map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-border/20 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4">{row.label}</td>
                      <td className="py-3 px-4 text-right font-medium">
                        {formatNumber(row.monthly)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {formatNumber(row.annual)}
                      </td>
                    </tr>
                  ))}

                {/* Gross */}
                <tr className="bg-muted/30 font-semibold">
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
                    className="py-3 px-4 font-semibold text-red-400 text-xs uppercase tracking-wider pt-5"
                  >
                    Deductions
                  </td>
                </tr>
                {breakdownRows
                  .filter((r) => r.type === "deduction")
                  .map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-border/20 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4">{row.label}</td>
                      <td className="py-3 px-4 text-right font-medium text-red-400">
                        {row.monthly > 0
                          ? `−${formatNumber(row.monthly)}`
                          : "0"}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-red-400">
                        {row.annual > 0 ? `−${formatNumber(row.annual)}` : "0"}
                      </td>
                    </tr>
                  ))}

                {/* In-Hand */}
                <tr className="bg-emerald-500/10 font-bold text-emerald-500">
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
