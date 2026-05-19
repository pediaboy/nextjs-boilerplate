"use client";

import React, { useState, useEffect } from "react";
// Pastikan donationConfig juga di-import dari data.ts
import { classSignals, donationConfig } from "./data";

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  titleClean: string;
};

export default function TerminalWeb() {
  const [activeTab, setActiveTab] = useState("market");
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("Syncing...");

  const fetchNews = async () => {
    try {
      setLoadingNews(true);
      const rssQuery = encodeURIComponent("https://news.google.com/rss/search?q=saham+OR+IHSG+OR+bursa+efek+indonesia+when:1d&hl=id&gl=ID&ceid=ID:id");
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssQuery}`;
      
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data && data.items) {
        const formattedNews = data.items.slice(0, 15).map((item: any) => ({
          title: item.title,
          link: item.link,
          source: item.title.split(" - ").pop() || "Google News",
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
    const interval = setInterval(fetchNews, 300000); 
    return () => clearInterval(interval);
  }, []);

  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString("id-ID") + " WIB"), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans pb-28 selection:bg-emerald-500/30">
      
      {/* HEADER ELEGAN */}
      <header className="px-6 py-4 border-b border-zinc-800 bg-[#050505]/95 backdrop-blur-xl sticky top-0 z-50 shadow-md">
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
                        {item.titleClean}
                      </h3>
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                        <span className="text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded">{item.source}</span>
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
            TAB PLAN: EXCLUSIVE TRADING PLAN
            ============================================== */}
        {activeTab === "plan" && (
          <div className="space-y-4 animate-fade-in pt-2">
             <h2 className="text-sm font-black text-zinc-500 uppercase tracking-[0.4em] mb-6 text-center">Exclusive Trading Plan</h2>
             {classSignals.map((sig, i) => (
              <div key={i} className="bg-[#161616] border-l-4 border-l-blue-500 border border-zinc-800 rounded-r-2xl p-5 shadow-xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-black text-white">{sig.code}</h3>
                  <span className="text-[9px] font-black bg-blue-500/10 text-blue-400 px-2 py-1 rounded uppercase tracking-widest border border-blue-500/20">Active Setup</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 italic">"{sig.desc}"</p>
                <div className="grid grid-cols-4 gap-2 text-center uppercase font-bold text-[10px]">
                  <div className="bg-black/40 p-2 rounded-xl border border-zinc-800 shadow-inner">
                    <p className="text-[8px] text-zinc-500 mb-1">Entry</p>
                    <p className="text-white">{sig.entry}</p>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl border border-zinc-800 shadow-inner">
                    <p className="text-[8px] text-zinc-500 mb-1">Antri</p>
                    <p className="text-zinc-400">{sig.antri}</p>
                  </div>
                  <div className="bg-red-500/5 p-2 rounded-xl border border-red-500/10 shadow-inner">
                    <p className="text-[8px] text-red-500 mb-1">SL</p>
                    <p className="text-red-400">{sig.sl}</p>
                  </div>
                  <div className="bg-emerald-500/5 p-2 rounded-xl border border-emerald-500/10 shadow-inner">
                    <p className="text-[8px] text-emerald-500 mb-1">TP</p>
                    <p className="text-emerald-400">{sig.tp}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="p-6 text-center text-[10px] text-zinc-600 font-bold tracking-widest uppercase leading-loose border border-dashed border-zinc-800 rounded-3xl mt-10">
              ⚠️ Postingan ini bukan ajakan, sesuaikan sama money management masing-masing.
            </div>
          </div>
        )}

        {/* ==============================================
            TAB INFO: DONASI & DISCLAIMER (BALIK LAGI)
            ============================================== */}
        {activeTab === "info" && (
          <div className="animate-fade-in pt-4 max-w-sm mx-auto space-y-6">
            
            {/* Kartu Donasi */}
            <div className="bg-[#161616] border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl text-center">
               <div className="text-yellow-500 text-2xl mb-2">💛</div>
               <h2 className="text-lg font-black text-white uppercase tracking-widest mb-2">{donationConfig.title}</h2>
               <p className="text-[11px] text-zinc-500 leading-relaxed mb-8 px-4 font-medium italic">"{donationConfig.description}"</p>
               
               <div className="bg-white p-4 rounded-3xl inline-block mb-8 border-4 border-[#121212]">
                  <img src={donationConfig.qrisUrl} alt="QRIS" className="w-52 h-auto" onError={(e) => {(e.target as any).src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DonasiServerThirafi";}}/>
               </div>
               
               <a href={donationConfig.contactUrl} target="_blank" className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] tracking-[0.2em] uppercase py-3.5 rounded-xl shadow-lg transition-all">Support & Contact</a>
            </div>

            {/* Disclaimer */}
            <div className="text-left space-y-3 px-2 pb-10">
               <div className="flex items-center gap-2 text-yellow-500">
                 <span className="text-lg font-bold">◈</span>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">Disclaimer</p>
               </div>
               <div className="bg-[#161616]/50 border-l-2 border-yellow-500/50 p-4 rounded-r-xl">
                  <p className="text-[12px] font-black text-yellow-500 mb-2 flex items-center gap-2"><span className="text-lg">⚠️</span> {donationConfig.disclaimer.title}</p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">{donationConfig.disclaimer.content}</p>
               </div>
            </div>
          </div>
        )}

      </main>

      {/* NAVBAR BAWAH (3 Menu) */}
      <nav className="fixed bottom-0 w-full bg-[#050505]/95 backdrop-blur-2xl border-t border-zinc-800 py-4 px-10 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab("market")} className={`flex flex-col items-center gap-1.5 transition-all w-1/3 ${activeTab === 'market' ? 'text-white scale-110' : 'text-zinc-600 opacity-50'}`}>
          <span className="text-xl">📊</span><span className="text-[8px] font-black uppercase tracking-widest">Market</span>
        </button>
        <button onClick={() => setActiveTab("plan")} className={`flex flex-col items-center gap-1.5 transition-all w-1/3 ${activeTab === 'plan' ? 'text-white scale-110' : 'text-zinc-600 opacity-50'}`}>
          <span className="text-xl">🎯</span><span className="text-[8px] font-black uppercase tracking-widest">Plan</span>
        </button>
        <button onClick={() => setActiveTab("info")} className={`flex flex-col items-center gap-1.5 transition-all w-1/3 ${activeTab === 'info' ? 'text-white scale-110' : 'text-zinc-600 opacity-50'}`}>
          <span className="text-xl">❓</span><span className="text-[8px] font-black uppercase tracking-widest">Info</span>
        </button>
      </nav>
    </div>
  );
}
