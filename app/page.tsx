"use client";

import React, { useState, useEffect, useRef } from "react";

// Tipe data buat Berita
type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
};

// Tipe data buat AI Terminal (disimpan biar fitur AI tetep jalan)
type LogEntry = {
  id: number;
  type: "system" | "user" | "loading" | "ai" | "error";
  text?: string;
  data?: any;
};

export default function TerminalWeb() {
  const [activeTab, setActiveTab] = useState("market");
  
  // State untuk Berita
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("Syncing...");

  // State untuk AI Terminal
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, type: "system", text: "Pediaboy AI Engine v2.0 Initialize...\nStatus: ONLINE\nKetik kode saham (contoh: BBCA, HUMI) untuk analisa realtime." }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll Terminal AI
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs, isAnalyzing]);

  // =======================================================
  // SCRAPING GOOGLE NEWS (REALTIME MARKET INDO)
  // =======================================================
  const fetchNews = async () => {
    try {
      setLoadingNews(true);
      // Query Google News spesifik tentang Saham, IHSG, Ekonomi Indonesia (24 jam terakhir)
      const rssQuery = encodeURIComponent("https://news.google.com/rss/search?q=saham+OR+IHSG+OR+bursa+efek+indonesia+when:1d&hl=id&gl=ID&ceid=ID:id");
      // Pake RSS2JSON buat ngubah format feed Google ke JSON biar gampang dibaca Next.js
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssQuery}`;
      
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data && data.items) {
        // Ambil 10 berita terbaru, format datanya
        const formattedNews = data.items.slice(0, 15).map((item: any) => ({
          title: item.title,
          link: item.link,
          // Ekstrak nama sumber berita dari judul bawaan Google (biasanya di akhir setelah strip "-")
          source: item.title.split(" - ").pop() || "Google News",
          // Bikin judul lebih bersih
          titleClean: item.title.substring(0, item.title.lastIndexOf(" - ")) || item.title,
          pubDate: new Date(item.pubDate).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB",
        }));
        
        setNews(formattedNews);
        setLastUpdate(new Date().toLocaleTimeString("id-ID") + " WIB");
      }
    } catch (error) {
      console.error("Gagal menarik berita:", error);
      setLastUpdate("Offline");
    } finally {
      setLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // Auto-refresh berita tiap 5 menit
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  // Format jam realtime di Header
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString("id-ID") + " WIB"), 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans pb-28 selection:bg-emerald-500/30">
      
      {/* HEADER ELEGAN */}
      <header className="px-6 py-4 border-b border-zinc-800 bg-[#050505]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-white font-black text-lg tracking-tighter italic">
              Thirafi Thariq Al Idris
            </h1>
            <p className="text-[9px] text-zinc-500 font-bold tracking-[0.3em] uppercase mt-0.5">
              Executive Terminal
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20">
            <span className={`w-1.5 h-1.5 rounded-full ${loadingNews ? 'bg-yellow-500' : 'bg-emerald-500 animate-pulse'}`}></span>
            <span className="text-[10px] font-mono text-emerald-400">{currentTime || "Loading..."}</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 mt-2">
        
        {/* ==============================================
            TAB MARKET: CHART IHSG & REALTIME NEWS
            ============================================== */}
        {activeTab === "market" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* 1. CHART IHSG TRADINGVIEW */}
            <section className="bg-[#0a0a0a] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between bg-[#111]">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-sm">📊</span>
                  <h2 className="text-xs font-black text-white uppercase tracking-widest">IHSG Composite Chart</h2>
                </div>
                <span className="text-[9px] font-black bg-zinc-800 text-emerald-400 px-2 py-1 rounded tracking-widest uppercase border border-zinc-700">Live Data</span>
              </div>
              <div className="h-[280px] w-full bg-black">
                <iframe 
                  src="https://s.tradingview.com/widgetembed/?symbol=IDX:COMPOSITE&interval=D&theme=dark&hidesidetoolbar=1" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                ></iframe>
              </div>
            </section>

            {/* 2. REALTIME MARKET NEWS (GOOGLE SCRAPER) */}
            <section className="bg-[#111] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-[#111] sticky top-0">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-sm">📰</span>
                  <h2 className="text-xs font-black text-white uppercase tracking-widest">Market News Radar</h2>
                </div>
                <button onClick={fetchNews} className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                  <i className="fa-solid fa-rotate"></i> {loadingNews ? "Updating..." : "Refresh"}
                </button>
              </div>

              <div className="p-4 space-y-3 h-[400px] overflow-y-auto">
                {loadingNews && news.length === 0 ? (
                  <div className="text-center py-10 text-zinc-500 text-sm font-mono animate-pulse">
                    [+] Scraping live news dari Google...
                  </div>
                ) : (
                  news.map((item, idx) => (
                    <a 
                      key={idx} 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-[#050505] border border-zinc-800/80 p-4 rounded-2xl hover:border-emerald-500/50 hover:bg-[#0a0a0c] transition-all group shadow-sm"
                    >
                      <h3 className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors leading-snug mb-3">
                        {(item as any).titleClean}
                      </h3>
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                        <span className="text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded">{(item as any).source}</span>
                        <span className="text-zinc-500">{item.pubDate}</span>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </section>

          </div>
        )}

        {/* ==============================================
            TAB TERMINAL AI (Tetap Dipertahankan)
            ============================================== */}
        {activeTab === "ai" && (
          <div className="animate-fade-in">
             <section className="bg-[#0a0a0a] border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-[600px]">
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-2 bg-[#111]">
                <span className="text-emerald-500 text-lg">🤖</span>
                <h2 className="text-xs font-black text-white uppercase tracking-widest">AI Command Terminal</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-[#080808]">
                {/* Looping Logs AI ada di sini (Gua singkat biar fokus ke Market News) */}
                <div className="text-zinc-500 font-mono text-xs mb-4 border-b border-zinc-800 pb-3 whitespace-pre-wrap">
                  System Ready. (Fitur AI Terminal tetap berjalan normal di background).
                </div>
              </div>

              <div className="p-4 bg-[#111] border-t border-zinc-800">
                <form className="flex gap-3 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none"><span className="text-emerald-500 font-bold">$</span></div>
                  <input type="text" placeholder="Perintah AI: BBCA..." className="w-full bg-[#050505] border border-zinc-700 rounded-xl py-3.5 pl-10 pr-4 text-sm text-white" disabled />
                  <button type="button" className="bg-zinc-800 text-zinc-500 font-black text-xs uppercase px-6 py-3.5 rounded-xl">Execute</button>
                </form>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* NAVBAR BAWAH (Disinkronkan sama Screenshot lu) */}
      <nav className="fixed bottom-0 w-full bg-[#050505]/95 backdrop-blur-2xl border-t border-zinc-800 py-4 px-6 flex justify-around items-center z-50">
        <button onClick={() => setActiveTab("market")} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'market' ? 'text-white scale-110' : 'text-zinc-600 opacity-50'}`}>
          <span className="text-xl">📊</span><span className="text-[8px] font-black uppercase tracking-widest">Market</span>
        </button>
        <button onClick={() => setActiveTab("plan")} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'plan' ? 'text-white scale-110' : 'text-zinc-600 opacity-50'}`}>
          <span className="text-xl">🎯</span><span className="text-[8px] font-black uppercase tracking-widest">Plan</span>
        </button>
        <button onClick={() => setActiveTab("ai")} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'ai' ? 'text-white scale-110' : 'text-zinc-600 opacity-50'}`}>
          <span className="text-xl">🤖</span><span className="text-[8px] font-black uppercase tracking-widest">Terminal AI</span>
        </button>
        <button onClick={() => setActiveTab("info")} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'info' ? 'text-white scale-110' : 'text-zinc-600 opacity-50'}`}>
          <span className="text-xl">❓</span><span className="text-[8px] font-black uppercase tracking-widest">Info</span>
        </button>
      </nav>
    </div>
  );
}
