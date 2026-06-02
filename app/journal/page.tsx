"use client";

import { useState, useEffect } from "react";
import {
  Menu, X, ArrowRight, BookOpen, Calendar, Clock,
  Search, ChevronRight, Share2, Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Components ---

const BackgroundBlobs = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 30, 0],
        y: [0, 20, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-100/30 blur-[120px]"
    />
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        x: [0, -30, 0],
        y: [0, -20, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/30 blur-[120px]"
    />
  </div>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="relative group text-sm font-medium text-gray-600 hover:text-black transition-colors">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full" />
  </Link>
);

const journalPosts = [
  {
    id: 1,
    title: "Investing in Nigeria: Navigating Volatility with Confidence",
    category: "Investing",
    date: "March 2026",
    readTime: "8 min read",
    author: "Dr. Temilola Adeyemi",
    excerpt: "Discover proven strategies to navigate Nigeria's economic landscape and build a resilient investment portfolio. We look at inflation-hedging assets and the role of diversification.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Financial Planning Across Generations: 20s to 50s",
    category: "Personal Finance",
    date: "February 2026",
    readTime: "12 min read",
    author: "Dr. Temilola Adeyemi",
    excerpt: "A practical guide to setting the right financial goals at every stage of life in the African context. From emergency funds to retirement planning.",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Power of Compounding: Why Time is Your Greatest Asset",
    category: "Wealth Building",
    date: "January 2026",
    readTime: "6 min read",
    author: "Dr. Temilola Adeyemi",
    excerpt: "Understand the magic of compounding and how small consistent actions today can transform your future wealth. See the math behind the harvest.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Understanding Treasury Bills and Bonds in a High-Interest Rate Environment",
    category: "Fixed Income",
    date: "December 2025",
    readTime: "10 min read",
    author: "Dr. Temilola Adeyemi",
    excerpt: "How to take advantage of rising yields while managing risk in your fixed-income portfolio.",
    image: "https://images.unsplash.com/photo-1512075135822-67cdd9dd7314?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Psychology of Money: Why Your Mindset is Your First Investment",
    category: "Mindset",
    date: "November 2025",
    readTime: "7 min read",
    author: "Dr. Temilola Adeyemi",
    excerpt: "The emotional side of money management. Overcoming fear, greed, and the 'poverty mindset'.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Legacy Planning: Beyond Just a Will",
    category: "Wealth Preservation",
    date: "October 2025",
    readTime: "15 min read",
    author: "Dr. Temilola Adeyemi",
    excerpt: "Building a structure that ensures your wealth outlives you. Trusts, foundations, and family governance.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function JournalPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = (post: typeof journalPosts[0]) => {
    const url = `${window.location.origin}/journal/${post.id}`;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: url,
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Article link copied to clipboard!");
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredPosts = journalPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {/* Header */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 rounded-full"
            >
              The Web Journal
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-black tracking-tighter mb-8"
            >
              Wealth wisdom <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-600">for the modern African.</span>
            </motion.h1>

            <div className="max-w-2xl relative mt-12">
              <label htmlFor="search-journal" className="sr-only">Search articles</label>
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="search-journal"
                type="text"
                placeholder="Search articles, topics, or insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-4xl bg-gray-50 border-2 border-gray-100 focus:border-teal-500 focus:outline-none focus:bg-white transition-all font-medium text-lg"
              />
            </div>
          </div>

          {/* Featured Post */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-24 group relative"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <Link href={`/journal/${journalPosts[0].id}`} className="relative aspect-16/10 lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                  <img
                    src={journalPosts[0].image}
                    alt={journalPosts[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                    Featured Article
                  </div>
                </Link>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-teal-600 font-black text-sm uppercase tracking-widest">{journalPosts[0].category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <span className="text-gray-500 font-bold text-sm">{journalPosts[0].readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleShare(journalPosts[0])}
                        aria-label="Share article"
                        title="Share article"
                        className="p-2.5 rounded-full bg-gray-50 text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-all"
                      >
                        <Share2 size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleBookmark(journalPosts[0].id)}
                        aria-label={bookmarkedIds.includes(journalPosts[0].id) ? "Remove bookmark" : "Bookmark article"}
                        title={bookmarkedIds.includes(journalPosts[0].id) ? "Remove bookmark" : "Bookmark article"}
                        className={`p-2.5 rounded-full bg-gray-50 transition-all ${bookmarkedIds.includes(journalPosts[0].id) ? "text-teal-600 bg-teal-50" : "text-gray-400 hover:text-teal-600 hover:bg-teal-50"}`}
                      >
                        <Bookmark size={18} fill={bookmarkedIds.includes(journalPosts[0].id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                  <Link href={`/journal/${journalPosts[0].id}`}>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight group-hover:text-teal-600 transition-colors">
                      {journalPosts[0].title}
                    </h2>
                  </Link>
                  <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                    {journalPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src="/temmy.jpg" className="w-12 h-12 rounded-full object-cover" alt="Author" />
                      <div>
                        <p className="font-black text-sm">{journalPosts[0].author}</p>
                        <p className="text-xs font-bold text-gray-500">{journalPosts[0].date}</p>
                      </div>
                    </div>
                    <Link href={`/journal/${journalPosts[0].id}`} className="flex items-center gap-2 font-black text-sm group/btn">
                      Read More
                      <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPosts.slice(searchQuery ? 0 : 1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative aspect-4/3 rounded-[2.5rem] overflow-hidden mb-8 shadow-sm">
                  <Link href={`/journal/${post.id}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <button
                      type="button"
                      onClick={() => handleShare(post)}
                      aria-label="Share article"
                      title="Share article"
                      className="p-3 rounded-2xl bg-white/90 backdrop-blur-md text-gray-900 hover:bg-teal-600 hover:text-white transition-all shadow-lg"
                    >
                      <Share2 size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(post.id)}
                      aria-label={bookmarkedIds.includes(post.id) ? "Remove bookmark" : "Bookmark article"}
                      title={bookmarkedIds.includes(post.id) ? "Remove bookmark" : "Bookmark article"}
                      className={`p-3 rounded-2xl bg-white/90 backdrop-blur-md transition-all shadow-lg ${bookmarkedIds.includes(post.id) ? "bg-teal-600 text-white" : "text-gray-900 hover:bg-teal-600 hover:text-white"}`}
                    >
                      <Bookmark size={18} fill={bookmarkedIds.includes(post.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-teal-600 font-black text-xs uppercase tracking-widest">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-gray-500 font-bold text-xs">{post.readTime}</span>
                </div>
                <Link href={`/journal/${post.id}`}>
                  <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 line-clamp-3 mb-6 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-black text-[10px] text-teal-600">
                      TA
                    </div>
                    <span className="text-xs font-bold text-gray-500">{post.date}</span>
                  </div>
                  <Link href={`/journal/${post.id}`}>
                    <ArrowRight size={18} className="text-gray-300 group-hover:text-black transition-colors group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter */}
          <section className="mt-32">
            <div className="bg-black rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-teal-600/20 rounded-full blur-[100px]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Join the Wealth Inner Circle</h2>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
                  Get weekly financial insights, market analysis, and wealth-building tips delivered straight to your inbox.
                </p>
                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                  <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-8 py-5 rounded-2xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-teal-500 transition-all font-bold"
                  />
                  <button className="bg-teal-600 text-white px-8 py-5 rounded-2xl font-black hover:bg-teal-500 transition-all">
                    Subscribe
                  </button>
                </form>
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
                  { name: "Journal", href: "/journal" }
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