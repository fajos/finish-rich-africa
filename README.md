# Finish Rich Africa 🚀

**Building a future where every African has the financial literacy and tools to thrive.**

Finish Rich Africa is a modern, fintech-inspired platform dedicated to wealth education, financial advisory, and generational wealth preservation tailored for the African context.

---

## ✨ Features

### 🏦 Financial Ecosystem
- **Interactive Investment Calculator**: Real-time compound interest visualization to project future wealth based on principal, monthly contributions, and market rates.
- **Membership Tiers**: Comprehensive service levels ranging from Corporate Training and Monthly Stock Classes to bespoke **Platinum Elite** and **VIP Wealth Management** for High Net Worth Individuals.
- **Dynamic Blog**: A content-hub powered by **Sanity.io**, featuring dynamic slug-based routing, search functionality, local article bookmarking (`localStorage`), and rich-text rendering.

### 🎨 Design & Experience
- **Modern Fintech Aesthetic**: High-contrast UI built with Tailwind CSS 4, featuring a sophisticated Teal/Emerald/Black palette and the Inter font family.
- **Interactive Motion**: Powered by **Framer Motion**, including staggered entry animations, smooth section transitions, and an animated "Platinum Elite" card shimmer effect.
- **Responsive Navigation**: Seamless flow across desktop and mobile, with a persistent "Calculator" shortcut and synchronized navigation links.
- **Floating Action Suite**: Instant access to WhatsApp support, the Investment Calculator, and navigation shortcuts.

### 🛠 Technical Excellence
- **Next.js 16 (App Router)**: Utilizing the latest React 19 features and server-side optimization.
- **Headless CMS**: Integrated with **Sanity.io** for real-time content management, featuring an embedded Studio at `/studio`.
- **Dynamic Routing**: Individual article pages (`/journal/[slug]`) with optimized layout and SEO metadata.
- **SEO Optimized**: Global OpenGraph and Twitter card configurations with metadata optimization in `layout.tsx`.
- **Contact Integration**: Integrated communication channels via EmailJS and WhatsApp API.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Inter (Google Fonts)

---

## 📂 Project Structure

```bash
├── app/
│   ├── about/            # About page
│   ├── contact/          # Contact & Inquiry form
│   ├── journal/          # Blog main grid & search
│   │   └── [slug]/       # Dynamic articles (Sanity Integration)
│   ├── studio/           # Embedded Sanity Studio
│   ├── layout.tsx        # Global layout & SEO
│   └── page.tsx          # Homepage
├── sanity/               # Sanity schemas, client, & queries
├── public/               # Static assets
└── globals.css           # Tailwind 4 configuration
```

---

## 🛠 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/finish-rich-africa.git
cd finish-rich-africa
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🗺 Roadmap

- [x] **Phase 1**: UI Redesign with modern fintech aesthetic.
- [x] **Phase 2**: Implementation of the Interactive Investment Calculator.
- [x] **Phase 3**: Development of the Blog with dynamic article routing.
- [x] **Phase 4**: Premium "Platinum Elite" subscription visualization.
- [x] **Phase 5**: Integration of a Headless CMS (Sanity) for journal management.
- [ ] **Phase 6**: Final performance audit & mobile responsiveness fine-tuning.

---

## 📝 Design Principles

- **Trust & Contrast**: Bold black backgrounds with sharp teal highlights to evoke reliability and modern financial stability.
- **Clarity**: High readability through Inter typography and generous whitespace.
- **Engagement**: Subtle micro-interactions on buttons and cards to provide tactile feedback and a premium feel.
- **Accessibility**: Optimized for all devices with a mobile-first approach and clear interactive cues.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

© 2026 Finish Rich Africa. All rights reserved.
"The poverty cycle ends with you."
