# 💚 FinWise Egypt
### Smart Financial Manager for Egyptian Youth

<p align="center">
  <img src="assets/favicon.svg" width="80" alt="FinWise Logo"/>
</p>

> A web application designed to address financial illiteracy among Egyptian youth by providing an intuitive expense tracker, personalized budget planner, and financial education platform.

---

## 🎯 Problem Statement

Over **73% of Egyptian youth** have no monthly budget and lack basic financial literacy skills. Without accessible tools and guidance, young people struggle to manage income, build savings, or plan for the future.

**FinWise** solves this by providing a free, private, Arabic/English financial management platform tailored to Egyptian economic realities.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Daily Expense Tracker** | Log every expense with categories, notes, and dates |
| 💰 **Smart Budget Plan** | AI-driven allocation based on income level (50/60/70 splits) |
| 🎯 **Financial Goals** | Set targets, track progress, celebrate with confetti 🎉 |
| 💱 **Currency Converter** | Live rates — EGP, USD, EUR, SAR, ILS |
| 🔄 **Recurring Expenses** | Fixed monthly bills with due-date alerts |
| 📈 **Smart Insights** | Automatic spending analysis and month-over-month comparison |
| 📚 **Financial Education** | 6 articles covering budgeting, investing, debt, and more |
| 🌙 **Dark / Light Mode** | Full theme support |
| 🌐 **Arabic / English** | Complete bilingual support with RTL layout |
| 📱 **Mobile First** | Expanding bottom navigation bar |
| ⚡ **Quick Add** | Add expenses in 2 seconds from any page |
| 🧮 **Mini Calculator** | Built-in calculator inside the expense tracker |
| 📄 **Export PDF & Excel** | Monthly reports with one click |

---

## 🗂️ Project Structure

```
finwise/
├── index.html                  # Main entry point
├── README.md                   # This file
│
├── css/
│   └── main.css                # All styles (variables, components, animations)
│
├── js/
│   ├── app.js                  # Root App component + ReactDOM render
│   ├── data/
│   │   └── constants.js        # Translations (EN/AR), categories, articles
│   ├── utils/
│   │   └── helpers.js          # Utility functions + ScrollTopBtn + Confetti + Insights
│   └── components/
│       ├── Navigation.js       # Navbar + Expanding bottom nav
│       ├── Home.js             # Dashboard / landing page
│       ├── Tracker.js          # Daily expense tracker + mini calculator
│       ├── History.js          # Transaction history + charts + export
│       ├── Plan.js             # Budget plan + health score + advice
│       ├── Goals.js            # Financial goals tracker
│       ├── Converter.js        # Live currency converter
│       ├── Recurring.js        # Recurring expenses + due alerts
│       ├── Learn.js            # Financial education articles
│       └── Onboarding.js       # First-time setup wizard
│
└── assets/
    ├── favicon.svg             # App icon
    ├── manifest.json           # PWA manifest
    └── og-image.png            # Social sharing preview image
```

---

## 🚀 Getting Started

### Option 1 — Open locally
Simply open `index.html` in any modern browser. No server needed.

### Option 2 — Deploy to ZAP Hosting (recommended)
1. Upload all files to your webspace root via the ZAP control panel
2. Point your domain to the webspace using EasyDNS
3. Done — your site is live!

### Option 3 — Any web server
```bash
# Python quick server (for local testing)
python3 -m http.server 8080
# Then open http://localhost:8080
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI component architecture |
| **Babel Standalone** | JSX compilation in browser |
| **Bootstrap 5.3** | Responsive grid system |
| **Bootstrap Icons** | Icon library |
| **Chart.js 4.4** | Bar charts and doughnut charts |
| **jsPDF 2.5** | PDF report generation |
| **SheetJS (XLSX)** | Excel report generation |
| **ExchangeRate-API** | Live currency rates |
| **localStorage** | Client-side data persistence |
| **CSS Custom Properties** | Dark/Light theme system |

---

## 📱 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Mobile Chrome | ✅ Full support |
| Mobile Safari | ✅ Full support |

---

## 🔐 Privacy

- **Zero data collection** — all data stays in your browser (localStorage)
- **No account required** — works instantly
- **No ads** — completely free
- Currency rates fetched anonymously from ExchangeRate-API

---

## 📖 Research Context

This project was developed as a solution to the problem of **financial illiteracy among Egyptian youth**, submitted as part of a university course project.

**Research findings:**
- 73% of Egyptian youth have no monthly budget
- Lack of accessible Arabic-language financial tools
- High inflation makes traditional budgeting advice (50/30/20) unrealistic for Egypt
- Need for culturally adapted financial education

**Solution approach:**
FinWise adapts global financial management best practices to the Egyptian context — adjusting budget splits for local cost of living, focusing on EGP-denominated goals, and providing education in Arabic.

---

## 👨‍💻 Development

Built with ❤️ for Egyptian youth financial empowerment.

*FinWise Egypt — "Take control of your money before it controls you."*
