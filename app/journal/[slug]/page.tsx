"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeft, Calendar, Clock, Share2, Bookmark,
  MessageSquare, Globe, Link2, Mail, Menu, X, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

const BackgroundBlobs = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-100/30 blur-[120px]" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/30 blur-[120px]" />
  </div>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="relative group text-sm font-medium text-gray-600 hover:text-black transition-colors">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full" />
  </Link>
);

const components = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-black mb-6 mt-12">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-black mb-6 mt-10">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-black mb-4 mt-8">{children}</h3>,
    normal: ({ children }: any) => <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-8 border-teal-600 pl-8 my-12 py-4 italic text-2xl font-black bg-gray-50 rounded-r-3xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-8 mb-8 space-y-4 text-xl text-gray-600 font-medium">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-8 mb-8 space-y-4 text-xl text-gray-600 font-medium">{children}</ol>,
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-12 rounded-4xl overflow-hidden shadow-2xl">
        <img
          src={urlForImage(value)?.url()}
          alt={value.alt || 'Blog image'}
          className="w-full h-auto"
        />
        {value.caption && (
          <figcaption className="text-center mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

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
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Investing in Nigeria presents a unique set of challenges and opportunities. With a burgeoning population and a dynamic economy, the potential for high returns is significant, yet volatility remains a constant companion for any investor." }]
      }
    ],
    mainImage: null
  },
  {
    _id: "2",
    title: "Financial Planning Across Generations: 20s to 50s",
    categories: ["Personal Finance"],
    publishedAt: "2026-02-15T00:00:00Z",
    excerpt: "A practical guide to setting the right financial goals at every stage of life in the African context.",
    author: "Dr. Temilola Adeyemi",
    slug: "financial-planning-generations",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Financial planning is not a one-size-fits-all endeavor. As you move through different stages of life, your priorities, risk tolerance, and goals naturally evolve." }]
      }
    ],
    mainImage: null
  },
  {
    _id: "3",
    title: "The Power of Compounding: Why Time is Your Greatest Asset",
    categories: ["Wealth Building"],
    publishedAt: "2026-01-10T00:00:00Z",
    excerpt: "Understand the magic of compounding and how small consistent actions today can transform your future wealth.",
    author: "Dr. Temilola Adeyemi",
    slug: "power-of-compounding",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Albert Einstein famously called compound interest the 'eighth wonder of the world.' For the African investor, understanding and harnessing this power is the difference between struggling for survival and achieving true financial independence." }]
      }
    ],
    mainImage: null
  }
];

export default function PostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const fetchPost = async () => {
      try {
        // Only fetch if Project ID is configured
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
            process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "yourprojectid") {
          const data = await client.fetch(postBySlugQuery, { slug });
          if (data) {
            setPost(data);
            setIsLoading(false);
            return;
          }
        }

        // Fallback to mock data if Sanity not configured or post not found
        const mockPost = MOCK_POSTS.find(p => p.slug === slug);
        if (mockPost) {
          setPost(mockPost);
        } else {
          router.push('/journal');
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        // Fallback to mock data on error
        const mockPost = MOCK_POSTS.find(p => p.slug === slug);
        if (mockPost) setPost(mockPost);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return null;

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
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-16">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-teal-600 mb-8 hover:translate-x-[-4px] transition-transform"
            >
              <ArrowLeft size={16} />
              Back to Journal
            </Link>
            <div className="flex items-center gap-3 mb-6">
              {post.categories?.map((cat: string) => (
                <span key={cat} className="px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-teal-50 text-teal-600 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.95]">
              {post.title}
            </h1>
            <p className="text-2xl text-gray-500 font-medium mb-10 leading-relaxed italic">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white font-black text-xl">
                  {post.author?.charAt(0)}
                </div>
                <div>
                  <div className="font-black text-lg">{post.author}</div>
                  <div className="text-gray-500 text-sm font-bold uppercase tracking-widest">Wealth Consultant</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-widest text-xs">
                  <Calendar size={14} className="text-teal-600" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-widest text-xs">
                  <Clock size={14} className="text-teal-600" />
                  8 min read
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-16/9 rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
            <img
              src={post.mainImage ? urlForImage(post.mainImage)?.url() : "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-xl prose-teal max-w-none">
            <PortableText value={post.body} components={components} />
          </div>

          {/* Article Footer */}
          <div className="mt-24 pt-12 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-black uppercase tracking-widest">Share this insight:</span>
              <div className="flex gap-2">
                {[Share2, Link2, Mail].map((Icon, i) => (
                  <button key={i} className="p-3 rounded-full bg-gray-50 text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-all">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-teal-600 transition-all">
              <Bookmark size={18} />
              Save Article
            </button>
          </div>
        </article>
      </main>

      {/* --- CTA Section --- */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="bg-teal-600 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-teal-600/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none">
                Ready to rewrite your <br /> financial story?
              </h2>
              <p className="text-xl text-teal-50 font-medium mb-12 leading-relaxed">
                Join 5,000+ Africans receiving weekly wealth insights and exclusive financial planning resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://calendly.com/dr-temilola-adeyemi/15min" target="_blank" className="bg-white text-teal-600 px-10 py-5 rounded-full text-lg font-black hover:bg-black hover:text-white transition-all shadow-xl">
                  Book a Consult
                </Link>
                <Link href="/contact" className="bg-teal-700 text-white border-2 border-teal-500/30 px-10 py-5 rounded-full text-lg font-black hover:bg-teal-800 transition-all">
                  Join Newsletter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
