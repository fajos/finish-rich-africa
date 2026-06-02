"use client";

import { useState, useRef, useEffect } from "react";
import {
  Menu, X, ArrowRight, Send, Phone, Mail,
  MapPin, CheckCircle2, MessageSquare, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import emailjs from "@emailjs/browser";

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

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    service_interest: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.sendForm(
        "service_l0g1uf4",
        "template_m3tbwqs",
        formRef.current,
        "e1tlx_HY82rHLeK6n"
      );

      setSubmitStatus("success");
      setFormData({ from_name: "", from_email: "", phone: "", service_interest: "", message: "" });
      formRef.current.reset();
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <NavLink href="/journal">Journal</NavLink>
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
              <Link href="/journal" onClick={() => setIsMenuOpen(false)}>Journal</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="https://calendly.com/dr-temilola-adeyemi/15min" target="_blank" onClick={() => setIsMenuOpen(false)} className="text-teal-600">Book Session</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-44 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-20">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 rounded-full">
                  Contact Us
                </div>
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                  Let's start your <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-600">wealth journey.</span>
                </h1>
                <p className="text-xl text-gray-600 mb-12 font-medium">
                  Whether you're looking for advisory, corporate training, or just have a question, we're here to help.
                </p>

                <div className="space-y-8">
                  <div className="flex gap-6 items-start group">
                    <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-1">Call / WhatsApp</p>
                      <p className="text-xl font-black">+234 806 615 1793</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                    <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-1">Email Us</p>
                      <p className="text-xl font-black">temilolaoyewale.c@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                    <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-1">Location</p>
                      <p className="text-xl font-black">Lagos, Nigeria</p>
                      <p className="text-gray-500 font-medium">Serving clients globally.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 p-8 bg-gray-950 rounded-[2.5rem] text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-teal-600 rounded-xl">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="font-black text-sm">Response Time</p>
                      <p className="text-gray-400 text-xs font-bold">Within 24 business hours</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-teal-600/5 border border-gray-100"
              >
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="from_name" className="text-sm font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                      <input
                        id="from_name"
                        type="text"
                        name="from_name"
                        placeholder="John Doe"
                        value={formData.from_name}
                        onChange={handleChange}
                        required
                        className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-teal-500 focus:bg-white focus:outline-none transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="from_email" className="text-sm font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                      <input
                        id="from_email"
                        type="email"
                        name="from_email"
                        placeholder="john@example.com"
                        value={formData.from_email}
                        onChange={handleChange}
                        required
                        className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-teal-500 focus:bg-white focus:outline-none transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="phone" className="text-sm font-black uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="+234"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-teal-500 focus:bg-white focus:outline-none transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="service_interest" className="text-sm font-black uppercase tracking-widest text-gray-500 ml-1">Interested In</label>
                      <select
                        id="service_interest"
                        name="service_interest"
                        value={formData.service_interest}
                        onChange={handleChange}
                        className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-teal-500 focus:bg-white focus:outline-none transition-all font-bold appearance-none cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        <option value="Financial Wellness Training">Corporate Training</option>
                        <option value="Financial Planning & Advisory">1-on-1 Advisory</option>
                        <option value="Stock Planning & Investment Class">Stock Classes</option>
                        <option value="Platinum Advisory Service">Platinum Service</option>
                        <option value="VIP Wealth Management">VIP Management</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="message" className="text-sm font-black uppercase tracking-widest text-gray-500 ml-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange} 
                      required
                      rows={6}
                      className="w-full px-8 py-6 rounded-4xl bg-gray-50 border-2 border-gray-100 focus:border-teal-500 focus:bg-white focus:outline-none transition-all font-bold resize-none"
                      placeholder="How can we help you achieve your goals?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-6 rounded-4xl font-black text-lg flex items-center justify-center gap-4 hover:bg-teal-600 transition-all hover:scale-[1.02] active:scale-95 disabled:bg-gray-400 shadow-xl shadow-black/10"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <ArrowRight size={20} />}
                  </button>

                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-6 bg-teal-50 text-teal-700 rounded-2xl flex items-center gap-4 font-bold border border-teal-100"
                      >
                        <div className="bg-teal-600 text-white p-1 rounded-full">
                          <CheckCircle2 size={16} />
                        </div>
                        Message sent successfully! We'll get back to you soon.
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-6 bg-red-50 text-red-700 rounded-2xl flex items-center gap-4 font-bold border border-red-100"
                      >
                        <div className="bg-red-600 text-white p-1 rounded-full">
                          <X size={16} />
                        </div>
                        Failed to send. Please check your connection or email us directly.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </div>
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
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
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
              { title: "Navigation", links: ["Home", "Services", "Programs", "Calculator", "Journal"] },
              { title: "Support", links: ["About Us", "Contact", "FAQs", "Privacy Policy"] },
              { title: "Contact", links: ["Lagos, Nigeria", "hello@finishrich.africa", "+234 806 615 1793"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-teal-400">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">{link}</Link>
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