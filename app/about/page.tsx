"use client";

import { useState, useEffect } from "react";
import {
  Menu, X, ArrowRight, Award, Users, TrendingUp,
  CheckCircle2, ShieldCheck, Zap, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Components ---

const BackgroundBlobs = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-200/20 blur-[120px]"
    />
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        x: [0, -50, 0],
        y: [0, -30, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-200/20 blur-[120px]"
    />
  </div>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="relative group text-sm font-medium text-gray-600 hover:text-black transition-colors">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full" />
  </Link>
);

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    let animationId: number;

    const updateCount = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        animationId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    animationId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationId);
  }, [end]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-teal-100 selection:text-teal-900">
      <BackgroundBlobs />

      {/* --- Navbar --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Finish Rich Africa" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="font-black text-xl leading-none tracking-tight">FINISH RICH</span>
              <span className="text-[10px] font-bold text-teal-600 tracking-[0.2em]">AFRICA</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/#services">Services</NavLink>
            <NavLink href="/#programs">Programs</NavLink>
            <NavLink href="/#calculator">Calculator</NavLink>
            <NavLink href="/journal">Blog</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <Link href="https://calendly.com/dr-temilola-adeyemi/15min" target="_blank" className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-teal-600 transition-all hover:shadow-lg hover:shadow-teal-600/20">
              Book Session
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-black focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            title={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-black">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/#services" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/#programs" onClick={() => setIsMenuOpen(false)}>Programs</Link>
              <Link href="/#calculator" onClick={() => setIsMenuOpen(false)}>Calculator</Link>
              <Link href="/journal" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="https://calendly.com/dr-temilola-adeyemi/15min" target="_blank" onClick={() => setIsMenuOpen(false)} className="text-teal-600">Book Session</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-44 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Founder Section */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 rounded-full">
                The Founder
              </div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8">
                Meet Dr. Temilola <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Adeyemi.</span>
              </h1>
              <p className="text-xl text-teal-600 font-bold mb-8 uppercase tracking-wider">ACS, MScFE, PhD • Chartered Stockbroker</p>

              <div className="prose prose-lg text-gray-600 leading-relaxed max-w-xl">
                <p className="mb-6">
                  Dr. Temilola Adeyemi is a finance professional, Chartered Stockbroker, and investment strategist with a PhD in Finance and over a decade of experience spanning capital markets, asset management, and investment advisory.
                </p>
                <p className="mb-6">
                  She has managed portfolios exceeding ₦4 billion in assets, developed data-driven investment strategies, and built a reputation as one of Africa's credible voices on markets, macroeconomic trends, and wealth building.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="/temmy.jpg"
                  alt="Dr. Temilola Adeyemi"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Quote */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 bg-black text-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-[280px] xs:max-w-sm border border-white/10"
              >
                <p className="font-bold text-lg leading-tight mb-4">
                  “Financial freedom is not a privilege. It is a right every African deserves.”
                </p>
                <div className="w-12 h-1 bg-teal-500 rounded-full" />
              </motion.div>
            </motion.div>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-32">
            {[
              { label: "Africans Trained", value: 20000, suffix: "+" },
              { label: "Assets Managed", value: 4, prefix: "₦", suffix: "B+" },
              { label: "Years Experience", value: 10, suffix: "+" },
              { label: "Billion+ Portfolios", value: 4, suffix: "" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center hover:border-teal-500/30 transition-colors flex flex-col justify-center min-h-[160px]"
              >
                <div className="text-3xl xs:text-4xl md:text-5xl font-black text-teal-600 mb-3 break-keep">
                  {stat.prefix}<AnimatedCounter end={stat.value} />{stat.suffix}
                </div>
                <p className="text-gray-500 font-black uppercase text-[10px] md:text-xs tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Mission Section */}
          <section className="bg-gray-950 text-white rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />
            
            <div className="relative z-10 max-w-4xl">
              <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter">What We Are Building <br />at Finish Rich Africa</h2>

              <div className="space-y-8 text-xl text-gray-400 leading-relaxed">
                <p>
                  Finish Rich Africa exists because too many hardworking Africans reach the end of their earning years with nothing to show for it — not from lack of effort, but from lack of access to the right guidance.
                </p>
                <p>
                  Through investment advisory, portfolio management, and financial education, we work with individuals and businesses to build wealth strategies that are intentional, sustainable, and built to last.
                </p>
                <p className="text-3xl font-black text-white italic mt-12 border-l-4 border-teal-500 pl-8">
                  "You've worked too hard to finish broke. Let us help you build wealth that lasts."
                </p>
              </div>

              <div className="mt-20 flex flex-wrap gap-6">
                <Link href="/contact" className="bg-teal-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-teal-500 transition-all hover:scale-105">
                  Start Your Wealth Journey
                </Link>
                <Link href="/journal" className="px-10 py-5 rounded-2xl font-black text-lg border-2 border-white/20 hover:border-white transition-all">
                  Read the Blog
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-950 text-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-8">
                <img src="/logo.png" alt="Finish Rich Africa" className="h-10 w-auto" />
                <div className="flex flex-col">
                  <span className="font-black text-lg leading-none tracking-tight">FINISH RICH</span>
                  <span className="text-[8px] font-bold text-teal-400 tracking-[0.2em]">AFRICA</span>
                </div>
              </Link>
              <p className="text-gray-300 text-base leading-relaxed mb-8 font-medium">
                Building a future where every African has the financial literacy and tools to thrive. The poverty cycle ends with you.
              </p>
              <div className="flex gap-4">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    ),
                    href: "#"
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    ),
                    href: "#"
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    ),
                    href: "#"
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    ),
                    href: "#"
                  },
                ].map((s, idx) => (
                  <a key={idx} href={s.href} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-teal-600 hover:border-teal-600 transition-all text-white">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Navigation",
                links: [
                  { name: "Home", href: "/" },
                  { name: "Services", href: "/#services" },
                  { name: "Programs", href: "/#programs" },
                  { name: "Calculator", href: "/#calculator" },
                  { name: "Blog", href: "/journal" }
                ]
              },
              {
                title: "Support",
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "/contact" },
                  { name: "FAQs", href: "/contact" },
                  { name: "Privacy Policy", href: "#" }
                ]
              },
              {
                title: "Contact",
                links: [
                  { name: "Lagos, Nigeria", href: "#" },
                  { name: "hello@finishrich.africa", href: "mailto:hello@finishrich.africa" },
                  { name: "+234 806 615 1793", href: "tel:+2348066151793" }
                ]
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-teal-400">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-base font-bold">{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <p>© 2026 Finish Rich Africa. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}