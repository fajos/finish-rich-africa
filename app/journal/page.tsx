"use client";

import { useState, useEffect } from "react";
import {
  Menu, X, ArrowRight, BookOpen, Calendar, Clock,
  Search, ChevronRight, Share2, Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

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

// --- Mock Data Fallback ---
const MOCK_POSTS = [
  {
    _id: "1",
    title: "Investing in Nigeria: Navigating Volatility with Confidence",
    categories: ["Investing"],
    publishedAt: "2026-03-01T00:00:00Z",
    excerpt: "Discover proven strategies to navigate Nigeria's economic landscape and build a resilient investment portfolio.",
    author: "Dr. Temilola Adeyemi",
    slug: "investing-in-nigeria",
    mainImage: null,
    isMock: true
  },
  {
    _id: "2",
    title: "Financial Planning Across Generations: 20s to 50s",
    categories: ["Personal Finance"],
    publishedAt: "2026-02-15T00:00:00Z",
    excerpt: "A practical guide to setting the right financial goals at every stage of life in the African context.",
    author: "Dr. Temilola Adeyemi",
    slug: "financial-planning-generations",
    mainImage: null,
    isMock: true
  },
  {
    _id: "3",
    title: "The Power of Compounding: Why Time is Your Greatest Asset",
    categories: ["Wealth Building"],
    publishedAt: "2026-01-10T00:00:00Z",
    excerpt: "Understand the magic of compounding and how small consistent actions today can transform your future wealth.",
    author: "Dr. Temilola Adeyemi",
    slug: "power-of-compounding",
    mainImage: null,
    isMock: true
  }
];

export default function JournalPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [posts, setPosts] = useState<any[]>(MOCK_POSTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const fetchPosts = async () => {
      try {
        // Only attempt fetch if a valid-looking Project ID is configured
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
            process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "yourprojectid") {
          const data = await client.fetch(postsQuery);
          if (data && data.length > 0) {
            setPosts(data);
          }
        }
      } catch (error) {
        console.error("Sanity fetch failed, using mock data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href + `/${post.slug}`,
      });
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.categories.some((cat: string) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
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

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length > 0 ? (
            <>
              {/* Featured Post */}
              {!searchQuery && posts[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-24 group relative"
                >
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <Link href={`/journal/${posts[0].slug}`} className="relative aspect-16/10 lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                      <img
                        src={posts[0].mainImage ? urlForImage(posts[0].mainImage)?.url() : "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"}
                        alt={posts[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                        Featured Article
                      </div>
                    </Link>
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <span className="text-teal-600 font-black text-sm uppercase tracking-widest">{posts[0].categories?.[0]}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          <span className="text-gray-500 font-bold text-sm">
                            {new Date(posts[0].publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleShare(posts[0])}
                            className="p-2.5 rounded-full bg-gray-50 text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-all"
                          >
                            <Share2 size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleBookmark(posts[0]._id)}
                            className={`p-2.5 rounded-full bg-gray-50 transition-all ${bookmarkedIds.includes(posts[0]._id) ? "text-teal-600 bg-teal-50" : "text-gray-400 hover:text-teal-600 hover:bg-teal-50"}`}
                          >
                            <Bookmark size={18} fill={bookmarkedIds.includes(posts[0]._id) ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>
                      <Link href={`/journal/${posts[0].slug}`}>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight group-hover:text-teal-600 transition-colors">
                          {posts[0].title}
                        </h2>
                      </Link>
                      <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                        {posts[0].excerpt}
                      </p>
                      <Link
                        href={`/journal/${posts[0].slug}`}
                        className="inline-flex items-center gap-3 text-lg font-black group/btn"
                      >
                        Read Full Story
                        <div className="p-3 rounded-full bg-black text-white group-hover/btn:bg-teal-600 transition-colors">
                          <ArrowRight size={20} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredPosts.slice(searchQuery ? 0 : 1).map((post, index) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/journal/${post.slug}`} className="block relative aspect-16/10 rounded-3xl overflow-hidden mb-8 shadow-lg">
                      <img
                        src={post.mainImage ? urlForImage(post.mainImage)?.url() : "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {post.categories?.[0]}
                      </div>
                    </Link>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-200" />
                        <span className="text-teal-600">{post.author}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleBookmark(post._id)}
                        className={`${bookmarkedIds.includes(post._id) ? "text-teal-600" : "text-gray-300 hover:text-teal-600"} transition-colors`}
                      >
                        <Bookmark size={16} fill={bookmarkedIds.includes(post._id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <Link href={`/journal/${post.slug}`}>
                      <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-teal-600 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-6 line-clamp-2 font-medium">
                      {post.excerpt}
                    </p>
                    <Link href={`/journal/${post.slug}`} className="flex items-center gap-2 text-sm font-black uppercase tracking-widest group/more">
                      Read Article
                      <ChevronRight size={14} className="transition-transform group-hover/more:translate-x-1" />
                    </Link>
                  </motion.article>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-black mb-4">No articles found</h3>
              <p className="text-gray-600 mb-8">Try searching for something else or check back later.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="bg-black text-white px-8 py-3 rounded-full font-bold"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-black text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-8">
                <img src="/logo.png" alt="Finish Rich Africa" className="h-12 w-auto brightness-0 invert" />
                <div className="flex flex-col">
                  <span className="font-black text-2xl leading-none tracking-tight">FINISH RICH</span>
                  <span className="text-[11px] font-bold text-teal-500 tracking-[0.2em]">AFRICA</span>
                </div>
              </Link>
              <p className="text-gray-400 text-lg font-medium max-w-md mb-10 leading-relaxed">
                Empowering the modern African with the tools, knowledge, and mindset to build sustainable wealth and financial independence.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                  <Link key={social} href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:border-teal-500 hover:text-teal-500 transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current mask-icon" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-xl mb-8">Navigation</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-all text-base font-bold">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-all text-base font-bold">About Us</Link></li>
                <li><Link href="/journal" className="text-gray-400 hover:text-white transition-all text-base font-bold">Web Journal</Link></li>
                <li><Link href="/#services" className="text-gray-400 hover:text-white transition-all text-base font-bold">Services</Link></li>
                <li><Link href="/#calculator" className="text-gray-400 hover:text-white transition-all text-base font-bold">Wealth Calculator</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xl mb-8">Contact</h4>
              <ul className="space-y-4">
                <li className="text-gray-400 text-base font-bold underline underline-offset-4"><Link href="mailto:hello@finishrich.africa">hello@finishrich.africa</Link></li>
                <li className="text-gray-400 text-base font-bold underline underline-offset-4"><Link href="tel:+2348066151793">+234 806 615 1793</Link></li>
                <li className="text-gray-400 text-base font-bold">Lagos, Nigeria</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 font-bold text-base">&copy; 2026 Finish Rich Africa. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="text-gray-500 hover:text-white transition-all text-base font-bold">Privacy Policy</Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-all text-base font-bold">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
