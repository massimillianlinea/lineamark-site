"use client";import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Shield,
  Ruler,
  Mail,
  ShoppingBag,
  Info,
  HeartPulse,
  ArrowRight,
  Youtube,
  Instagram,
  Facebook,
} from "lucide-react";

const products = [
  {
    sku: "standard-pack",
    name: "Standard Discussion Guidance Pack",
    desc: "4 tattoos: 2x straight (Joel-Cohen), 2x Pfannensteil. Includes a spare. Ideal for those who want to visualise scar placement or plan for contingencies.",
    price: 17.95,
    stripePriceId: "price_STANDARD_PACK_PLACEHOLDER",
  },
  {
    sku: "planner-pack",
    name: "Discussion Pack + Incision Planner",
    desc: "6 tattoos: 3x straight, 3x Pfannensteil, with placement guide for correct positioning. Perfect for planned caesarean birth.",
    price: 23.95,
    stripePriceId: "price_PLANNER_PACK_PLACEHOLDER",
  },
];

const features = [
  {
    icon: <Ruler className="w-6 h-6" aria-hidden="true" />,
    title: "Precise alignment",
    desc: "Grid + centerline help visualize typical low-transverse placement for shared decision-making.",
  },
  {
    icon: <Shield className="w-6 h-6" aria-hidden="true" />,
    title: "Skin-safe inks",
    desc: "Dermatologist-tested, latex-free, and made for short-term wear.",
  },
  {
    icon: <Sparkles className="w-6 h-6" aria-hidden="true" />,
    title: "Smudge-resistant",
    desc: "Water-resistant adhesive with easy, residue-free removal.",
  },
];

const steps = [
  { n: 1, title: "Prep skin", text: "Clean and dry the area per your clinician’s guidance." },
  { n: 2, title: "Align", text: "Use the navel/linea alba as reference; place the tattoo using the printed guides." },
  { n: 3, title: "Discuss", text: "Use as a visual aid for conversation. Remove before surgery as instructed." },
];

const faqs = [
  {
    q: "Are these tattoos a medical device?",
    a: "No. LineaMark tattoos are educational/consultation aids only and are not intended to diagnose, treat, or replace clinical judgment.",
  },
  { q: "Can I wear it during surgery?", a: "No. Remove before any procedure unless your care team explicitly instructs otherwise." },
  {
    q: "What sizes are available?",
    a: "Standard 12–16 cm reference span with 5 mm grid; curved and straight guides included in the starter kit.",
  },
  {
    q: "What if I have sensitive skin?",
    a: "Our inks are skin-safe and latex-free, but discontinue use if irritation occurs and consult your clinician.",
  },
];

export default function LineaMarkLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  async function startCheckout(p: any) {
    alert(`This would start checkout for ${p.name} (€${p.price})`);
    // replace with real Stripe checkout call
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-rose-600" aria-hidden="true" />
            <span className="font-semibold tracking-tight">LineaMark</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:text-rose-700">How it works</a>
            <a href="#features" className="hover:text-rose-700">Features</a>
            <a href="#faq" className="hover:text-rose-700">FAQ</a>
            <a href="#safety" className="hover:text-rose-700">Safety</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              className="md:hidden inline-flex items-center rounded-xl px-3 py-2 border border-neutral-300"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
            <a href="#shop" className="hidden sm:inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-neutral-300 hover:border-neutral-400">
              Shop
            </a>
            <a href="#subscribe" className="hidden sm:inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-rose-600 text-white hover:bg-rose-700">
              <Mail className="w-4 h-4" /> Notify me
            </a>
          </div>
        </div>
        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
            <div className="absolute top-0 right-0 h-full w-80 max-w-[85%] bg-white shadow-xl p-6">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Menu</span>
                <button aria-label="Close menu" className="rounded-xl px-3 py-2 border" onClick={() => setMenuOpen(false)}>✕</button>
              </div>
              <nav className="mt-6 grid gap-3 text-base">
                {[
                  ["How it works","#how"],
                  ["Features","#features"],
                  ["FAQ","#faq"],
                  ["Safety","#safety"],
                  ["Shop","#shop"],
                ].map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2 hover:bg-neutral-100">{label}</a>
                ))}
                <a href="#subscribe" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-xl px-4 py-3 bg-rose-600 text-white hover:bg-rose-700">Notify me</a>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-rose-700 bg-rose-100 px-3 py-1 rounded-full text-xs font-medium">
              <Sparkles className="w-3 h-3" /> New
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
              Gentle guidance for <span className="text-rose-700">C-section</span> incision discussions
            </h1>
            <p className="mt-4 text-neutral-700 text-lg leading-relaxed">
              LineaMark™ temporary tattoos give a clear, skin-safe reference grid and alignment line so clinicians and
              birthing people can align on expectations—literally.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#shop" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-rose-600 text-white hover:bg-rose-700">
                <ShoppingBag className="w-4 h-4" /> Shop packs
              </a>
              <a href="#how" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-neutral-300 hover:border-neutral-400">
                <Info className="w-4 h-4" /> Learn more
              </a>
            </div>
            <p className="mt-3 text-xs text-neutral-500">For educational use only. Remove before procedures.</p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Why LineaMark</h2>
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <motion.div key={idx} className="p-6 rounded-3xl border border-neutral-200 shadow-sm bg-white">
                <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 grid place-items-center mb-4">{f.icon}</div>
                <h3 className="font-medium">{f.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 md:py-20 bg-rose-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="md:flex items-start gap-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How it works</h2>
              <ul className="mt-6 space-y-4">
                {steps.map((s) => (
                  <li key={s.n} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-rose-600 text-white grid place-items-center shrink-0">{s.n}</div>
                    <div>
                      <p className="font-medium">{s.title}</p>
                      <p className="text-sm text-neutral-600">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div key={p.sku} className="rounded-3xl border border-neutral-200 p-6 md:p-8 bg-gradient-to-br from-white to-rose-50 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-neutral-700 text-sm">{p.desc}</p>
                <p className="mt-3 text-rose-700 font-semibold">€{p.price.toFixed(2)}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => startCheckout(p)} className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-rose-600 text-white hover:bg-rose-700">
                  <ShoppingBag className="w-4 h-4" /> Buy now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="py-16 md:py-20 bg-rose-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Safety & disclaimers</h2>
          <ul className="mt-4 text-sm text-neutral-700 list-disc pl-6 space-y-2">
            <li>For education and planning conversations only; not a medical device.</li>
            <li>Remove prior to any procedure unless advised otherwise by a clinician.</li>
            <li>Do not apply to broken/irritated skin. Discontinue use if irritation occurs.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
            {faqs.map((f, i) => (
              <details key={i} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="font-medium">{f.q}</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-neutral-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section id="subscribe" className="py-16 md:py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-neutral-200 p-6 md:p-10 bg-white">
            <div className="md:flex items-center justify-between gap-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Stay in the loop</h2>
                <p className="mt-2 text-neutral-700">Launch discounts, clinical pilots, and wholesale packs.</p>
              </div>
              <form className="mt-6 md:mt-0 flex w-full md:w-auto max-w-lg gap-3" onSubmit={(e)=>e.preventDefault()}>
                <input type="email" required placeholder="you@clinic.ie" className="flex-1 rounded-2xl border border-neutral-300 px-4 py-3" />
                <button type="submit" className="rounded-2xl px-5 py-3 bg-rose-600 text-white hover:bg-rose-700">Notify me</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-rose-600" aria-hidden="true" />
            <span className="font-semibold">LineaMark</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-500">
            <a href="#" aria-label="YouTube" className="hover:text-rose-700"><Youtube className="w-5 h-5"/></a>
            <a href="#" aria-label="Instagram" className="hover:text-rose-700"><Instagram className="w-5 h-5"/></a>
            <a href="#" aria-label="Facebook" className="hover:text-rose-700"><Facebook className="w-5 h-5"/></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

