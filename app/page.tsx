"use client";

import React, { useState, useEffect } from "react";
import { scalpingSignals, swingSignals, donationConfig } from "./data";

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  titleClean: string;
};

export default function TerminalWeb() {
  const [activeTab, setActiveTab] = useState("market");
  const [planType, setPlanType] = useState<"scalping" | "swing">("scalping");
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("Syncing...");

  const fetchNews = async () => {
    try {
      setLoadingNews(true);
      const timestamp = Date.now();
      const rssQuery = encodeURIComponent(`https://news.google.com/rss/search?q=saham+OR+IHSG+OR+bursa+efek+indonesia+when:1d&hl=id&gl=ID&ceid=ID:id&_t=${timestamp}`);
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssQuery}&t=${timestamp}`;
      
      const res = await fetch(apiUrl, { cache: 'no-store' });
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
      console.error("Gagal menarik berita realtime:", error);
      setLastUpdate("Offline");
    } finally {
      setLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 120000); 
    return () => clearInterval(interval);
  }, []);

  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString("id-ID") + " WIB"), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentSignals = planType === "scalping" ? scalpingSignals : swingSignals;

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 font-sans pb-28 selection:bg-[#D4AF37]/30">
      
      <header className="px-6 py-4 border-b border-[#D4AF37]/20 bg-[#080808]/95 backdrop-blur-xl sticky top-0 z-50 shadow-md">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-white font-bold text-lg tracking-wide uppercase font-serif">
              Thirafi Thariq
            </h1>
            <p className="text-[9px] text-[#D4AF37] font-bold tracking-[0.3em] uppercase mt-0.5">
              Executive Terminal
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20">
            <span className={`w-1.5 h-1.5 rounded-full ${loadingNews ? 'bg-zinc-500' : 'bg-[#D4AF37] animate-pulse'}`}></span>
            <span className="text-[10px] font-mono text-[#D4AF37]">{currentTime || "Loading..."}</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 mt-2">
        
        {/* ==============================================
            TAB MARKET: CHART IHSG & REALTIME NEWS
            ============================================== */}
        {activeTab === "market" && (
          <div className="space-y-6 animate-fade-in">
            <section className="bg-[#111111] border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-5 py-3 border-b border-[#D4AF37]/10 flex items-center justify-between bg-[#111]">
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37] text-sm">📊</span>
                  <h2 className="text-xs font-bold text-white uppercase tracking-widest">IHSG Composite</h2>
                </div>
                <span className="text-[9px] font-black bg-[#1a1a1a] text-[#D4AF37] px-2 py-1 rounded tracking-widest uppercase border border-[#D4AF37]/30">Daily</span>
              </div>
              <div className="h-[280px] w-full bg-[#0d0d0d]">
                <iframe 
                  src="https://s.tradingview.com/widgetembed/?symbol=IDX:COMPOSITE&interval=D&theme=dark&hidesidetoolbar=1" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                ></iframe>
              </div>
            </section>

            <section className="bg-[#111111] border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-[#D4AF37]/10 flex items-center justify-between bg-[#111] sticky top-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37] text-sm">📰</span>
                  <h2 className="text-xs font-bold text-white uppercase tracking-widest">Market News</h2>
                </div>
                <button onClick={fetchNews} className="text-[10px] text-zinc-400 hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
                  <i className="fa-solid fa-rotate"></i> {loadingNews ? "Updating..." : "Refresh"}
                </button>
              </div>

              <div className="p-4 space-y-3 h-[400px] overflow-y-auto">
                {loadingNews && news.length === 0 ? (
                  <div className="text-center py-10 text-[#D4AF37] text-sm font-mono animate-pulse">
                    Memuat berita pasar terbaru...
                  </div>
                ) : (
                  news.map((item, idx) => (
                    <a 
                      key={idx} 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-[#0d0d0d] border border-zinc-800 p-4 rounded-xl hover:border-[#D4AF37]/50 transition-all group"
                    >
                      <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-[#D4AF37] transition-colors leading-snug mb-3">
                        {item.titleClean}
                      </h3>
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                        <span className="text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded">{item.source}</span>
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
            TAB PLAN: EXCLUSIVE TRADING PLAN (SWING & SCALPING)
            ============================================== */}
        {activeTab === "plan" && (
          <div className="space-y-4 animate-fade-in pt-2">
             
             {/* TOGGLE BUTTONS SCALPING / SWING */}
             <div className="flex bg-[#111111] rounded-xl p-1.5 border border-[#D4AF37]/20 mb-4 shadow-xl">
               <button 
                 onClick={() => setPlanType("scalping")} 
                 className={`flex-1 py-3 text-[11px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${planType === "scalping" ? "bg-[#D4AF37] text-black shadow-md" : "text-zinc-500 hover:text-zinc-300"}`}
               >
                 Scalping
               </button>
               <button 
                 onClick={() => setPlanType("swing")} 
                 className={`flex-1 py-3 text-[11px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${planType === "swing" ? "bg-[#D4AF37] text-black shadow-md" : "text-zinc-500 hover:text-zinc-300"}`}
               >
                 Swing
               </button>
             </div>

             {/* DESKRIPSI KATEGORI */}
             <div className="mb-6 text-center bg-[#111] border border-zinc-800 p-4 rounded-2xl shadow-inner">
                <p className="text-[10px] md:text-xs text-zinc-400 italic leading-relaxed">
                   {planType === "scalping"
                     ? '"Buat yg pergerakannya liar, saham gorengan, atau yg likuiditasnya tipis. Wajib fast in fast out, jgn di-hold kalo kaga sesuai plan."'
                     : '"Buat bluechip atau saham yg kapitalisasinya lumayan gede, pergerakan lebih lambat, asik buat nunggu pijakan mantul di support."'}
                </p>
             </div>

             {/* LIST SAHAM SESUAI KATEGORI YANG DIPILIH */}
             {currentSignals.map((sig, i) => (
              <div key={i} className="bg-[#111111] border-l-4 border-l-[#D4AF37] border border-zinc-800 rounded-r-2xl p-5 shadow-xl transition-all hover:border-zinc-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white tracking-widest">{sig.code}</h3>
                  <span className="text-[9px] font-black bg-[#D4AF37]/10 text-[#D4AF37] px-2.5 py-1.5 rounded uppercase tracking-widest border border-[#D4AF37]/20 shadow-sm">
                    {planType.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-center uppercase font-bold text-[10px]">
                  <div className="bg-[#0d0d0d] p-2 rounded-lg border border-zinc-800 shadow-inner">
                    <p className="text-[8px] text-zinc-500 mb-1">Entry</p>
                    <p className="text-[#D4AF37]">{sig.entry}</p>
                  </div>
                  <div className="bg-[#0d0d0d] p-2 rounded-lg border border-zinc-800 shadow-inner">
                    <p className="text-[8px] text-zinc-500 mb-1">Antri</p>
                    <p className="text-zinc-400">{sig.antri}</p>
                  </div>
                  <div className="bg-red-500/5 p-2 rounded-lg border border-red-500/10 shadow-inner">
                    <p className="text-[8px] text-red-500 mb-1">SL</p>
                    <p className="text-red-400">{sig.sl}</p>
                  </div>
                  <div className="bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10 shadow-inner">
                    <p className="text-[8px] text-emerald-500 mb-1">TP</p>
                    <p className="text-emerald-400">{sig.tp}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* DISCLAIMER PLAN */}
            <div className="p-5 text-center text-[10px] text-zinc-600 font-bold tracking-widest uppercase leading-loose border border-dashed border-zinc-800 rounded-3xl mt-8">
              ⚠️ Postingan ini bukan ajakan ya atur aja mm masing".
            </div>
          </div>
        )}

        {/* ==============================================
            TAB INFO: DONASI & DISCLAIMER
            ============================================== */}
        {activeTab === "info" && (
          <div className="animate-fade-in pt-2 max-w-sm mx-auto space-y-6">
            
            <div className="bg-[#0d0d0d] border border-[#D4AF37]/20 rounded-3xl p-8 text-center shadow-2xl relative">
               <h2 className="text-sm font-bold text-[#D4AF37] mb-3 flex items-center justify-center gap-2">
                 <span className="text-lg">💛</span> Donasi Server
               </h2>
               <p className="text-[11px] text-zinc-400 leading-relaxed mb-8 px-2">
                 Agar website analisa ini tetap aktif dan bebas diakses oleh semua trader.
               </p>
               
               <div className="bg-white p-3 rounded-2xl inline-block mb-8 w-48 h-48 border-[6px] border-[#1a1a1a] shadow-inner">
                  <img src={donationConfig.qrisUrl} alt="QRIS" className="w-full h-full object-cover" onError={(e) => {(e.target as any).src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DonasiServerThirafi";}}/>
               </div>
               
               <a href={donationConfig.contactUrl} target="_blank" className="block w-4/5 mx-auto bg-[#3b82f6] hover:bg-blue-500 text-white font-bold text-[12px] py-3 rounded-xl transition-all shadow-md">
                 Support & Contact
               </a>
            </div>

            <div className="px-2 pb-10">
               <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
                 <span className="text-[#D4AF37] text-lg">♦</span> DISCLAIMER
               </p>
               <div className="text-left space-y-4">
                  <h3 className="text-sm font-bold text-red-500 flex items-center gap-2">
                    <span className="text-lg">⚠️</span> Trading Berisiko Tinggi
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed text-justify">
                    Seluruh informasi, analisa, dan signal pada website ini hanya untuk edukasi dan referensi umum.
                  </p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed text-justify">
                    Trading forex, gold XAUUSD, crypto BTCUSD, dan instrumen keuangan lain memiliki risiko tinggi. Semua keputusan trading adalah tanggung jawab masing-masing pengguna.
                  </p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed text-justify pb-10">
                    Tidak ada jaminan profit. Website ini tidak berafiliasi dengan broker manapun, tidak menjalankan IB, tidak menjual kelas, dan tidak menawarkan pengelolaan dana.
                  </p>
               </div>
            </div>
          </div>
        )}

      </main>

      {/* NAVBAR BAWAH TEMA GOLD */}
      <nav className="fixed bottom-0 w-full bg-[#080808]/95 backdrop-blur-2xl border-t border-[#D4AF37]/20 py-4 px-10 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab("market")} className={`flex flex-col items-center gap-1.5 transition-all w-1/3 ${activeTab === 'market' ? 'text-[#D4AF37] scale-110' : 'text-zinc-600 opacity-60 hover:text-zinc-400'}`}>
          <span className="text-xl">📊</span><span className="text-[8px] font-bold uppercase tracking-widest">Market</span>
        </button>
        <button onClick={() => setActiveTab("plan")} className={`flex flex-col items-center gap-1.5 transition-all w-1/3 ${activeTab === 'plan' ? 'text-[#D4AF37] scale-110' : 'text-zinc-600 opacity-60 hover:text-zinc-400'}`}>
          <span className="text-xl">🏆</span><span className="text-[8px] font-bold uppercase tracking-widest">Plan</span>
        </button>
        <button onClick={() => setActiveTab("info")} className={`flex flex-col items-center gap-1.5 transition-all w-1/3 ${activeTab === 'info' ? 'text-[#D4AF37] scale-110' : 'text-zinc-600 opacity-60 hover:text-zinc-400'}`}>
          <span className="text-xl">⭐</span><span className="text-[8px] font-bold uppercase tracking-widest">Info</span>
        </button>
      </nav>
    </div>
  );
}
