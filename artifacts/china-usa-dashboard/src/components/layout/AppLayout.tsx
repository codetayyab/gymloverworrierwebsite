import { Link, useLocation } from "wouter";
import { ReactNode } from "react";
import { Activity, BarChart2, Globe, Home, Info, Newspaper, Scale } from "lucide-react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <Navbar />
      <main className="flex-1 w-full pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [location] = useLocation();
  
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: Activity },
    { href: "/compare", label: "Compare", icon: Scale },
    { href: "/charts", label: "Charts", icon: BarChart2 },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">GlobalAsset</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-slate-400"}`}>
                  <Icon className="w-4 h-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400">LIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 bg-slate-950/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm">
          Disclaimer: Not financial advice. Educational tool only. Data may be delayed or mocked.
        </p>
        <p className="text-slate-600 text-xs mt-2">
          &copy; {new Date().getFullYear()} GlobalAsset Intelligence
        </p>
      </div>
    </footer>
  );
}
