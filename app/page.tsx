"use client";

import { useState, useEffect } from "react";
import {
  Menu, X, ArrowRight, BookOpen, Calendar, Clock, Users,
  TrendingUp, Award, Star, ChevronRight, CheckCircle2,
  ShieldCheck, Zap, BarChart3, PieChart, Calculator, MessageCircle
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
  </div>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="relative group text-sm font-medium text-gray-600 hover:text-black transition-colors">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full" />
  </Link>
);

const SectionHeading = ({ title, subtitle, centered = true }: { title: string; subtitle: string; centered?: boolean }) => (
  <div className={`mb-16 ${centered ? "text-center" : "text-left"}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 rounded-full"
    >
      {subtitle}
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900"
    >
      {title}
    </motion.h2>
  </div>
);

// --- Main Page Component ---

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Investment Calculator State
  const [principal, setPrincipal] = useState<number | "">(500000);
  const [monthlyContribution, setMonthlyContribution] = useState<number | "">(500000);
  const [rate, setRate] = useState<number | "">(12);
  const [years, setYears] = useState<number | "">(10);

  const p = Number(principal) || 0;
  const mc = Number(monthlyContribution) || 0;
  const r = Number(rate) || 0;
  const y = Number(years) || 0;

  const monthlyRate = r / 100 / 12;
  const totalMonths = y * 12;
  const fvPrincipal = p * Math.pow(1 + monthlyRate, totalMonths);
  const fvContributions = monthlyRate > 0
    ? mc * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
    : mc * totalMonths;

  const futureValue = Math.round(fvPrincipal + fvContributions);
  const totalContributions = mc * totalMonths;
  const totalInterest = futureValue - p - totalContributions;
  const growthMultiple = (p + totalContributions) > 0
    ? (futureValue / (p + totalContributions)).toFixed(1)
    : "0.0";

  const services = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Financial Wellness Training",
      description: "Customized financial education for organizations, faith communities, and corporates. Transform your team's relationship with money.",
      features: ["Group workshops", "Virtual & Onsite", "Custom Curriculum"],
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Wealth Advisory",
      description: "One-on-one expert guidance to help you navigate complex financial decisions and build a robust investment roadmap.",
      features: ["Personalized Strategy", "Portfolio Review", "Actionable Plans"],
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Platinum Wealth Management",
      description: "High-tier wealth management for individuals seeking legacy planning and long-term generational wealth preservation.",
      features: ["Legacy Planning", "Direct Access", "Bespoke Portfolios"],
      color: "from-purple-500 to-pink-500",
    },
  ];

  const testimonials = [
    {
      name: "Aisha Bello",
      role: "Banker, Lagos",
      text: "The Exclusive Wealth Program completely changed how I think about money. I've paid off my debts and started my first investment portfolio.",
      image: "https://picsum.photos/id/64/200/200"
    },
    {
      name: "Chukwudi Okoro",
      role: "Entrepreneur, Abuja",
      text: "Finish Rich Africa made investing feel accessible. Their practical approach helped me grow my business while building personal wealth.",
      image: "https://picsum.photos/id/65/200/200"
    },
    {
      name: "Fatima Yusuf",
      role: "Teacher, Kano",
      text: "I never thought I could understand compound interest this well. The Reset Your Finances bootcamp was life-changing for me and my family.",
      image: "https://picsum.photos/id/66/200/200"
    },
  ];

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
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#programs">Programs</NavLink>
            <NavLink href="#calculator">Calculator</NavLink>
            <NavLink href="/journal">Blog</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact Us</NavLink>
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
              <Link href="#services" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="#programs" onClick={() => setIsMenuOpen(false)}>Programs</Link>
              <Link href="#calculator" onClick={() => setIsMenuOpen(false)}>Calculator</Link>
              <Link href="/journal" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
              <Link href="https://calendly.com/dr-temilola-adeyemi/15min" target="_blank" onClick={() => setIsMenuOpen(false)} className="text-teal-600">Book Session</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-xs font-bold mb-8 animate-bounce">
              <Zap size={14} className="fill-teal-700" />
              THE POVERTY CYCLE ENDS WITH YOU
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-gray-900">
              You worked too hard to <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-600">finish broke.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
              We provide the tools, education, and expert advisory you need to build, manage, and preserve lasting wealth in the African context.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="group bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-teal-600 transition-all hover:scale-105">
                Start Your Journey <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#programs" className="px-8 py-4 rounded-2xl font-bold border-2 border-gray-200 hover:border-black transition-all">
                Explore Programs
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={`https://picsum.photos/id/${i + 10}/100/100`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" alt="User" />
                ))}
                <div className="w-12 h-12 rounded-full bg-teal-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">
                  5k+
                </div>
              </div>
              <div className="text-sm">
                <div className="flex gap-0.5 text-yellow-500 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="font-bold">Trusted by 5,000+ Africans</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-600/20 border-8 border-white">
              <img src="/couple.png" alt="Wealthy couple" className="w-full object-cover aspect-4/5" />
            </div>
            {/* Decorative Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-linear-to-br from-teal-400 to-emerald-500 rounded-full blur-[80px] -z-10"
            />
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-10 -left-10 w-60 h-60 bg-linear-to-br from-indigo-400 to-purple-500 rounded-full blur-[100px] -z-10"
            />

            {/* Floating Stat Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Growth Rate</p>
                  <p className="text-xl font-black">+240%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Strategies built for your life"
            subtitle="Expert Services"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-10 rounded-4xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-teal-600/10 transition-all duration-500 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity blur-3xl`} />
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${service.color} flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-teal-600/20`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                <ul className="space-y-4 mb-10">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-500">
                      <CheckCircle2 className="text-teal-500" size={18} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-wider group-hover:gap-4 transition-all text-black">
                  Learn More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Programs Section --- */}
      <section id="programs" className="py-32 bg-gray-900 text-white rounded-[4rem] mx-4 my-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.15),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-teal-400 font-black text-xs uppercase tracking-[0.3em] mb-4 block"
            >
              Membership Tiers & Services
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Choose your path to wealth</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Financial Wellness Training */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] flex flex-col hover:border-teal-500/50 transition-colors"
            >
              <div className="mb-8">
                <p className="text-teal-400 font-bold text-sm mb-2">Corporate & Communities</p>
                <h3 className="text-2xl font-black mb-4 leading-tight">Financial Wellness Training</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">₦100k - ₦1m</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {["Group Workshops", "Custom Curriculum", "Virtual & Onsite Options"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                    <ShieldCheck className="text-teal-400" size={18} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="https://calendly.com/dr-temilola-adeyemi/15min" target="_blank" className="w-full border-2 border-white/20 text-white py-4 rounded-2xl font-black text-center hover:bg-white hover:text-black transition-all">
                Book Session
              </Link>
            </motion.div>

            {/* 2. One-time Session */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] flex flex-col hover:border-teal-500/50 transition-colors"
            >
              <div className="mb-8">
                <p className="text-teal-400 font-bold text-sm mb-2">One-time Session</p>
                <h3 className="text-2xl font-black mb-4 leading-tight">Financial Planning & Advisory</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">₦100k</span>
                  <span className="text-gray-400 font-bold">/hr</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {["Full Financial Picture", "60-min Deep Dive", "Clear Action Plan"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                    <ShieldCheck className="text-teal-400" size={18} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="https://calendly.com/dr-temilola-adeyemi/15min" target="_blank" className="w-full border-2 border-white/20 text-white py-4 rounded-2xl font-black text-center hover:bg-white hover:text-black transition-all">
                Book Session
              </Link>
            </motion.div>

            {/* 3. Stock Planning Class */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] flex flex-col hover:border-teal-500/50 transition-colors"
            >
              <div className="mb-8">
                <p className="text-teal-400 font-bold text-sm mb-2">Monthly Learning</p>
                <h3 className="text-2xl font-black mb-4 leading-tight">Stock Planning & Investment</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">₦50k</span>
                  <span className="text-gray-400 font-bold">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {["Monthly Live Classes", "Stock Market Analysis", "Real-time Insights"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                    <ShieldCheck className="text-teal-400" size={18} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="https://selar.com/48fk2c6evp" target="_blank" className="w-full bg-white text-black py-4 rounded-2xl font-black text-center hover:bg-teal-500 hover:text-white transition-all">
                Join Class
              </Link>
            </motion.div>

            {/* 4. Premium Advisory */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] flex flex-col hover:border-teal-500/50 transition-colors"
            >
              <div className="mb-8">
                <p className="text-teal-400 font-bold text-sm mb-2">Annual Retainer</p>
                <h3 className="text-2xl font-black mb-4 leading-tight">Premium Advisory Service</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">₦250k</span>
                  <span className="text-gray-400 font-bold">/yr</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {["2 Portfolio Reviews/Year", "Email Support", "Investment Strategy"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                    <ShieldCheck className="text-teal-400" size={18} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="https://calendly.com/dr-temilola-adeyemi/15min" target="_blank" className="w-full border-2 border-white/20 text-white py-4 rounded-2xl font-black text-center hover:bg-white hover:text-black transition-all">
                Book Session
              </Link>
            </motion.div>

            {/* 5. Platinum - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-linear-to-b from-teal-600 to-emerald-700 p-10 rounded-[2.5rem] flex flex-col relative lg:scale-105 shadow-2xl shadow-teal-600/20 z-10"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Most Popular
              </div>
              <div className="mb-8">
                <p className="text-white/80 font-bold text-sm mb-2">Full Partnership</p>
                <h3 className="text-2xl font-black mb-4 leading-tight">Platinum Advisory Service</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">₦500k</span>
                  <span className="text-white/60 font-bold">/yr</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {["Monthly Strategy Calls", "Direct Advisor Access", "Priority Support", "Tax Planning Advice"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-bold text-sm">
                    <Star className="text-yellow-400 fill-yellow-400" size={18} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="https://calendly.com/dr-temilola-adeyemi/15min" target="_blank" className="w-full bg-black text-white py-4 rounded-2xl font-black text-center hover:bg-gray-800 transition-all">
                Book Session
              </Link>
            </motion.div>

            {/* 6. VIP - Platinum Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[2.5rem] flex flex-col lg:scale-105 z-10"
            >
              {/* Animated Gradient Border Overlay - Moved inside a wrapper to handle overflow for background effects only */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                <div className="absolute inset-0 p-0.5 bg-linear-to-r from-slate-800 via-teal-500/50 to-slate-800 animate-gradient-x">
                  <div className="absolute inset-0 bg-slate-950" />
                </div>

                {/* Shimmer Effect */}
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none"
                />
              </div>

              {/* The Label - Now outside the overflow-hidden wrapper */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-slate-100 to-slate-300 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.2)] z-20">
                Platinum Elite
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <p className="text-teal-400 font-bold text-sm">High Net Worth</p>
                  </div>
                  <h3 className="text-3xl font-black mb-4 leading-tight text-white tracking-tighter">VIP Wealth Management</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-slate-400">$2,000</span>
                    <span className="text-slate-500 font-bold">/yr</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {[
                    "Bespoke Global Portfolio",
                    "Legacy & Estate Planning",
                    "24/7 Concierge Access",
                    "Dedicated Private Advisor",
                    "Family Office Services"
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-semibold">
                      <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                         <ShieldCheck className="text-teal-400" size={14} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="https://calendly.com/dr-temilola-adeyemi/15min" target="_blank" className="w-full bg-white text-black py-5 rounded-2xl font-black text-center hover:bg-teal-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-teal-500/40 transform group-hover:scale-[1.02]">
                  Book Session
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Interactive Calculator --- */}
      <section id="calculator" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading
                title="Watch your money grow"
                subtitle="The Math of Wealth"
                centered={false}
              />
              <p className="text-xl text-gray-600 mb-12">
                Use our compound interest calculator to visualize the power of consistency. Small contributions today lead to a massive harvest tomorrow.
              </p>

              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label htmlFor="principal-range" className="font-bold text-gray-700">Initial Investment (₦)</label>
                    <span className="text-teal-600 font-black">₦{p.toLocaleString()}</span>
                  </div>
                  <input
                    id="principal-range"
                    title="Initial Investment Amount"
                    type="range" min="0" max="10000000" step="100000"
                    value={p} onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label htmlFor="monthly-range" className="font-bold text-gray-700">Monthly Top-up (₦)</label>
                    <span className="text-teal-600 font-black">₦{mc.toLocaleString()}</span>
                  </div>
                  <input
                    id="monthly-range"
                    title="Monthly Contribution Amount"
                    type="range" min="0" max="2000000" step="50000"
                    value={mc} onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                  <div className="space-y-4">
                    <label htmlFor="interest-rate" className="font-bold text-gray-700 block text-xs sm:text-sm">Interest Rate (%)</label>
                    <input
                      id="interest-rate"
                      type="number" placeholder="12"
                      value={rate} onChange={(e) => setRate(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-100 focus:border-teal-500 focus:outline-none font-bold text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-4">
                    <label htmlFor="investment-years" className="font-bold text-gray-700 block text-xs sm:text-sm">Time (Years)</label>
                    <input
                      id="investment-years"
                      type="number" placeholder="10"
                      value={years} onChange={(e) => setYears(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-100 focus:border-teal-500 focus:outline-none font-bold text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              layout
              className="bg-black p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-white relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <p className="text-teal-400 font-black text-xs uppercase tracking-widest mb-4">Projected Balance</p>
                <motion.h4
                  key={futureValue}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter mb-12 wrap-break-word"
                >
                  ₦{futureValue.toLocaleString()}
                </motion.h4>

                <div className="space-y-6 border-t border-white/10 pt-10">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gray-600" />
                      <span className="text-gray-400 font-bold">Total Invested</span>
                    </div>
                    <span className="font-black">₦{(p + totalContributions).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-teal-500" />
                      <span className="text-gray-400 font-bold">Total Interest</span>
                    </div>
                    <span className="font-black text-teal-400">₦{totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="mt-8 p-6 bg-white/5 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase">Growth Multiple</p>
                      <p className="text-2xl font-black text-white">{growthMultiple}x</p>
                    </div>
                    <PieChart className="text-teal-500" size={40} />
                  </div>
                </div>

                <p className="text-[10px] text-gray-500 mt-12 text-center uppercase tracking-widest font-bold">
                  * Based on monthly compounding. Returns not guaranteed.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-32 bg-teal-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeading title="What our members say" subtitle="Social Proof" />

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] text-left shadow-sm border border-gray-100"
              >
                <div className="flex gap-1 text-yellow-500 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} className="w-14 h-14 rounded-full object-cover border-2 border-teal-100" alt={t.name} />
                  <div>
                    <p className="font-black">{t.name}</p>
                    <p className="text-xs font-bold text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-20 px-6">
        <motion.div
          whileInView={{ scale: [0.95, 1] }}
          className="max-w-5xl mx-auto bg-black text-white rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to break the <br />cycle for good?</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of Africans building sustainable wealth. No shortcuts, just solid financial wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="bg-teal-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-teal-500 transition-all hover:scale-105 shadow-xl shadow-teal-600/30">
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col gap-3 md:gap-4 z-50">
        <motion.a
          href="https://wa.me/2348066151793"
          target="_blank"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl hover:opacity-90 transition-all active:scale-95 group"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="hidden md:block absolute right-full mr-4 px-3 py-1 bg-black text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </motion.a>

        <motion.button
          type="button"
          onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 md:w-14 md:h-14 bg-teal-600 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl hover:bg-teal-500 transition-all active:scale-95 group"
          aria-label="Scroll to Investment Calculator"
          title="Investment Calculator"
        >
          <Calculator size={20} className="md:w-6 md:h-6" />
          <span className="hidden md:block absolute right-full mr-4 px-3 py-1 bg-black text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Investment Calculator
          </span>
        </motion.button>

        <motion.button
          type="button"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl hover:bg-gray-800 transition-all active:scale-95 group"
          aria-label="Back to Top"
          title="Back to Top"
        >
          <ArrowRight size={20} className="md:w-6 md:h-6 -rotate-90" />
          <span className="hidden md:block absolute right-full mr-4 px-3 py-1 bg-black text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Back to Top
          </span>
        </motion.button>
      </div>
    </div>
  );
}