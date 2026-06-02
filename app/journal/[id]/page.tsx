"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeft, Calendar, Clock, Share2, Bookmark,
  MessageSquare, Globe, Link2, Mail, Menu, X, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Mock data (in a real app, this would come from a CMS or API)
const journalPosts = [
  {
    id: 1,
    title: "Investing in Nigeria: Navigating Volatility with Confidence",
    category: "Investing",
    date: "March 2026",
    readTime: "8 min read",
    author: "Dr. Temilola Adeyemi",
    authorRole: "Founder, Finish Rich Africa",
    excerpt: "Discover proven strategies to navigate Nigeria's economic landscape and build a resilient investment portfolio. We look at inflation-hedging assets and the role of diversification.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    content: `
      <p>Investing in Nigeria presents a unique set of challenges and opportunities. With a burgeoning population and a dynamic economy, the potential for high returns is significant, yet volatility remains a constant companion for any investor.</p>

      <h2>Understanding the Landscape</h2>
      <p>The Nigerian market is characterized by its resilience. Despite currency fluctuations and inflationary pressures, key sectors like telecommunications, financial services, and agriculture continue to show robust growth. Navigating this landscape requires a deep understanding of local market drivers and a long-term perspective.</p>

      <blockquote>
        "The best time to plant a tree was 20 years ago. The second best time is now. This proverb holds especially true for investing in emerging markets."
      </blockquote>

      <h2>Strategies for Volatility</h2>
      <p>To succeed in a volatile environment, diversification is not just a strategy; it's a necessity. Investors should look beyond traditional equities and consider fixed-income instruments like Treasury Bills and FGN Bonds, which often offer attractive yields during periods of high interest rates.</p>

      <ul>
        <li><strong>Asset Allocation:</strong> Balance your portfolio between growth assets and defensive plays.</li>
        <li><strong>Currency Hedging:</strong> Consider assets that provide a hedge against Naira depreciation.</li>
        <li><strong>Continuous Learning:</strong> Stay informed about policy changes and global economic trends.</li>
      </ul>

      <h2>The Role of Mindset</h2>
      <p>Success in investing is as much about psychology as it is about analysis. Fear and greed are the two greatest enemies of the investor. Developing a disciplined approach and sticking to your investment plan, even when markets are turbulent, is essential for long-term wealth creation.</p>
    `
  },
  {
    id: 2,
    title: "Financial Planning Across Generations: 20s to 50s",
    category: "Personal Finance",
    date: "February 2026",
    readTime: "12 min read",
    author: "Dr. Temilola Adeyemi",
    authorRole: "Founder, Finish Rich Africa",
    excerpt: "A practical guide to setting the right financial goals at every stage of life in the African context.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    content: `
      <p>Financial planning is not a one-size-fits-all endeavor. As you move through different stages of life, your priorities, risk tolerance, and goals naturally evolve. In the African context, these transitions are often coupled with unique cultural and familial expectations.</p>

      <h2>In Your 20s: The Foundation Phase</h2>
      <p>This is the time to build your financial engine. Your greatest asset is time. Focus on building an emergency fund, eliminating high-interest debt, and starting the habit of consistent investing, no matter how small the amount.</p>

      <h2>In Your 30s: The Growth Phase</h2>
      <p>Often characterized by career advancement and starting families. This is the period to scale your investments and begin serious retirement planning. It's also critical to have adequate insurance and a clear plan for major life expenses like home ownership or education for children.</p>

      <h2>In Your 40s: The Peak Earning Phase</h2>
      <p>Usually your highest-earning years. The focus shifts toward maximizing contributions to retirement accounts and diversifying into more stable, cash-flow-generating assets. It's also the time to revisit your estate planning and ensure your wealth is protected.</p>

      <h2>In Your 50s: The Preservation Phase</h2>
      <p>As retirement approaches, the priority moves from aggressive growth to capital preservation. Focus on fine-tuning your retirement income strategy and ensuring your health care costs are covered. This is also the time to mentor the next generation on financial stewardship.</p>
    `
  },
  {
    id: 3,
    title: "The Power of Compounding: Why Time is Your Greatest Asset",
    category: "Wealth Building",
    date: "January 2026",
    readTime: "6 min read",
    author: "Dr. Temilola Adeyemi",
    authorRole: "Founder, Finish Rich Africa",
    excerpt: "Understand the magic of compounding and how small consistent actions today can transform your future wealth.",
    image: "https://images.unsplash.com/photo-1591696208162-a9774de46944?q=80&w=2070&auto=format&fit=crop",
    content: `
      <p>Albert Einstein famously called compound interest the "eighth wonder of the world." For the African investor, understanding and harnessing this power is the difference between struggling for survival and achieving true financial independence.</p>

      <h2>The Math of the Harvest</h2>
      <p>Compounding occurs when the returns on your investment start to generate their own returns. Over long periods, this creates an exponential growth curve that can turn modest savings into significant fortunes.</p>

      <blockquote>
        "Wealth is not built in a day, but it is built every day."
      </blockquote>

      <h2>The Cost of Waiting</h2>
      <p>The most important factor in the compounding equation is not the amount of money you start with, but the amount of time you give it to work. Delaying your investment journey by even five years can result in a significantly smaller final portfolio, requiring much larger monthly contributions to catch up.</p>

      <h2>Patience as a Strategy</h2>
      <p>Compounding requires discipline and patience. The early years of an investment often feel slow and unrewarding. However, those who stay the course and reinvest their dividends eventually reach the "tipping point" where their money works harder than they do.</p>
    `
  },
  {
    id: 4,
    title: "Understanding Treasury Bills and Bonds in a High-Interest Rate Environment",
    category: "Fixed Income",
    date: "December 2025",
    readTime: "10 min read",
    author: "Dr. Temilola Adeyemi",
    authorRole: "Founder, Finish Rich Africa",
    excerpt: "How to take advantage of rising yields while managing risk in your fixed-income portfolio.",
    image: "https://images.unsplash.com/photo-1512075135822-67cdd9dd7314?q=80&w=2070&auto=format&fit=crop",
    content: `
      <p>In an environment where interest rates are high, fixed-income instruments like Treasury Bills and FGN Bonds become highly attractive components of a balanced investment portfolio.</p>

      <h2>What are Treasury Bills?</h2>
      <p>T-Bills are short-term debt instruments issued by the government to fund its operations. They are sold at a discount and are considered one of the safest investments because they are backed by the full faith and credit of the government.</p>

      <h2>The Advantage of Bonds</h2>
      <p>FGN Bonds offer longer-term investment horizons and regular interest payments (coupons). They are excellent for investors seeking predictable cash flow and preservation of capital over several years.</p>

      <h2>Managing Reinvestment Risk</h2>
      <p>While high rates are good for new investments, they also mean that when your current bills mature, you may be reinvesting at lower rates if the economic environment changes. A "laddering" strategy—buying instruments with different maturity dates—can help mitigate this risk and ensure consistent returns.</p>
    `
  },
  {
    id: 5,
    title: "Psychology of Money: Why Your Mindset is Your First Investment",
    category: "Mindset",
    date: "November 2025",
    readTime: "7 min read",
    author: "Dr. Temilola Adeyemi",
    authorRole: "Founder, Finish Rich Africa",
    excerpt: "The emotional side of money management. Overcoming fear, greed, and the 'poverty mindset'.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1974&auto=format&fit=crop",
    content: `
      <p>You can have the best investment strategy in the world, but if your mindset is not aligned with your goals, you will likely sabotage your own success. Wealth is built in the mind before it is reflected in the bank account.</p>

      <h2>Overcoming the Scarcity Mindset</h2>
      <p>Many of us grew up in environments where money was seen as a limited, fleeting resource. This "scarcity mindset" leads to short-term thinking and fear-based decision-making. Transitioning to an "abundance mindset" allows you to see opportunities where others see risks.</p>

      <h2>The Danger of Social Comparison</h2>
      <p>In the age of social media, the pressure to "keep up with the Joneses" has never been higher. True wealth is often invisible—it's the assets you own, not the liabilities you display. Focus on your internal financial peace rather than external validation.</p>

      <h2>Building Emotional Resilience</h2>
      <p>Market downturns are inevitable. Investors who lack emotional resilience often panic and sell at the worst possible time. Understanding your relationship with risk and developing the discipline to stick to your plan is the ultimate competitive advantage.</p>
    `
  },
  {
    id: 6,
    title: "Legacy Planning: Beyond Just a Will",
    category: "Wealth Preservation",
    date: "October 2025",
    readTime: "15 min read",
    author: "Dr. Temilola Adeyemi",
    authorRole: "Founder, Finish Rich Africa",
    excerpt: "Building a structure that ensures your wealth outlives you. Trusts, foundations, and family governance.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    content: `
      <p>Legacy planning is about more than just distributing assets after you're gone; it's about ensuring your values and your vision for your family's future are preserved for generations.</p>

      <h2>The Limitations of a Will</h2>
      <p>While a will is a necessary starting point, it is often insufficient for complex estates and can be subject to lengthy probate processes. A will tells people where things go; a legacy plan tells them why and how they should be managed.</p>

      <h2>The Power of Trusts</h2>
      <p>Trusts provide a robust framework for asset protection and can ensure that your wealth is used for specific purposes, such as education or supporting a family business, long after you are gone. They also offer privacy and can help minimize estate taxes.</p>

      <h2>Family Governance and Education</h2>
      <p>The greatest threat to generational wealth is not taxes or market crashes; it's the lack of preparation among heirs. Legacy planning must include the financial education of the next generation and the establishment of clear family governance structures to manage shared assets and resolve conflicts.</p>
    `
  }
];

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="relative group text-sm font-medium text-gray-600 hover:text-black transition-colors">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full" />
  </Link>
);

const BackgroundBlobs = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-50/50 blur-[120px]" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-50/50 blur-[120px]" />
  </div>
);

export default function ArticlePage() {
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const post = journalPosts.find(p => p.id === Number(params.id)) || journalPosts[0];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {
        // Fallback to clipboard if share is cancelled or fails
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Article link copied to clipboard!");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(post.title);
    const body = encodeURIComponent(`Check out this article: ${post.title}\n\n${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-teal-100">
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

      <main className="pt-32 pb-32">
        <article className="max-w-4xl mx-auto px-6">
          {/* Article Header */}
          <header className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest text-teal-600 uppercase bg-teal-50 rounded-full"
            >
              {post.category}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1]"
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-8 text-sm font-bold text-gray-500 mb-8"
            >
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center justify-center gap-4 lg:hidden"
            >
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share article"
                title="Share article"
                className="p-3 bg-gray-50 hover:bg-teal-50 hover:text-teal-600 rounded-full transition-all"
              >
                <Share2 size={20} />
              </button>
              <button
                type="button"
                onClick={() => setIsBookmarked(!isBookmarked)}
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
                title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
                className={`p-3 bg-gray-50 hover:bg-teal-50 hover:text-teal-600 rounded-full transition-all ${isBookmarked ? "text-teal-600 bg-teal-50" : "text-gray-400"}`}
              >
                <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
              </button>
            </motion.div>
          </header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-[21/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl"
          >
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Article Content */}
          <div className="grid lg:grid-cols-[1fr_200px] gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg prose-teal max-w-none
                prose-headings:font-black prose-headings:tracking-tight
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/50 prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:font-bold prose-blockquote:text-xl prose-blockquote:not-italic"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Sidebar / Author */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Written By</h4>
                  <img src="/temmy.jpg" className="w-16 h-16 rounded-2xl object-cover mb-4" alt="Author" />
                  <p className="font-black text-sm mb-1">{post.author}</p>
                  <p className="text-xs font-bold text-teal-600">{post.authorRole}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Share Story</h4>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleShare}
                      aria-label="Share on Website"
                      className="flex items-center gap-3 text-xs font-bold hover:text-teal-600 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"><Globe size={14} /></div>
                      Share
                    </button>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      aria-label="Copy article link"
                      className="flex items-center gap-3 text-xs font-bold hover:text-teal-600 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"><Link2 size={14} /></div>
                      Copy Link
                    </button>
                    <button
                      type="button"
                      onClick={handleEmailShare}
                      aria-label="Share via Email"
                      className="flex items-center gap-3 text-xs font-bold hover:text-teal-600 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"><Mail size={14} /></div>
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
                      className={`flex items-center gap-3 text-xs font-bold hover:text-teal-600 transition-colors ${isBookmarked ? "text-teal-600" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isBookmarked ? "bg-teal-50" : "bg-gray-50"}`}>
                        <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
                      </div>
                      {isBookmarked ? "Bookmarked" : "Bookmark"}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Never miss an insight.</h2>
          <p className="text-lg text-gray-600 mb-10 font-medium">Join 10,000+ others receiving our weekly wealth wisdom.</p>
          <form className="max-w-md mx-auto flex gap-4">
            <label htmlFor="article-newsletter-email" className="sr-only">Email address</label>
            <input
              id="article-newsletter-email"
              type="email"
              placeholder="Email address"
              className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-teal-500 outline-none font-bold"
            />
            <button className="bg-black text-white px-8 py-4 rounded-2xl font-black hover:bg-teal-600 transition-all">
              Join
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
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
