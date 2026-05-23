"use client";

import React, { useState, useEffect } from "react";
import { mondaySignals, mappingIntro, donationConfig, eduPackages } from "./data";

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  titleClean: string;
};

export default function TerminalWeb() {
  const [activeTab, setActiveTab] = useState("edu"); // Buka tab edukasi buat preview
  const [planView, setPlanView] = useState<"entry" | "deskripsi">("entry");
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("Syncing...");

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

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

  return (
    {/* TEMA BARU: Midnight Navy (bg-[#0B1120]) dengan teks slate dan aksen Cyan */}
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans pb-28 selection:bg-cyan-500/30">
      
      {/* HEADER TEMA FINTECH */}
      <header className="px-6 py-4 border-b border-cyan-500/20 bg-[#0B1120]/95 backdrop-blur-xl sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,230,243,0.05)]">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-black text-xl tracking-wide uppercase">
              Thirafi Thariq
            </h1>
            <p className="text-[9px] text-cyan-400/80 font-bold tracking-[0.3em] uppercase mt-0.5">
              Pro Trading Terminal
            </p>
          </div>
          <div className="flex items-center gap-2 bg-cyan-950/30 px-3 py-1.5 rounded-full border border-cyan-500/20">
            <span className={`w-1.5 h-1.5 rounded-full ${loadingNews ? 'bg-slate-500' : 'bg-cyan-400 animate-pulse shadow-[0_0_8px_#00E6F3]'}`}></span>
            <span className="text-[10px] font-mono text-cyan-300">{currentTime || "Loading..."}</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 mt-2">
        
        {/* ==============================================
            TAB MARKET
            ============================================== */}
        {activeTab === "market" && (
          <div className="space-y-6 animate-fade-in">
            <section className="bg-[#131C31] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-5 py-3 border-b border-cyan-500/10 flex items-center justify-between bg-[#0B1120]/50">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 text-sm">📊</span>
                  <h2 className="text-xs font-bold text-white uppercase tracking-widest">IHSG Composite</h2>
                </div>
                <span className="text-[9px] font-black bg-cyan-950 text-cyan-300 px-2 py-1 rounded tracking-widest uppercase border border-cyan-500/30">Daily</span>
              </div>
              <div className="h-[280px] w-full bg-[#050810]">
                <iframe src="https://s.tradingview.com/widgetembed/?symbol=IDX:COMPOSITE&interval=D&theme=dark&hidesidetoolbar=1" width="100%" height="100%" frameBorder="0"></iframe>
              </div>
            </section>

            <section className="bg-[#131C31] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-cyan-500/10 flex items-center justify-between bg-[#0B1120]/50 sticky top-0">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 text-sm">📰</span>
                  <h2 className="text-xs font-bold text-white uppercase tracking-widest">Market News</h2>
                </div>
                <button onClick={fetchNews} className="text-[10px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors">
                  <i className="fa-solid fa-rotate"></i> {loadingNews ? "Updating..." : "Refresh"}
                </button>
              </div>

              <div className="p-4 space-y-3 h-[400px] overflow-y-auto">
                {loadingNews && news.length === 0 ? (
                  <div className="text-center py-10 text-cyan-500/60 text-sm font-mono animate-pulse">Memuat berita pasar terbaru...</div>
                ) : (
                  news.map((item, idx) => (
                    <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block bg-[#0B1120] border border-slate-800 p-4 rounded-xl hover:border-cyan-500/50 transition-all group">
                      <h3 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors leading-snug mb-3">
                        {item.titleClean}
                      </h3>
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                        <span className="text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-500/20">{item.source}</span>
                        <span className="text-slate-500">{item.pubDate}</span>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        {/* ==============================================
            TAB PLAN
            ============================================== */}
        {activeTab === "plan" && (
          <div className="space-y-4 animate-fade-in pt-2">
             <div className="flex bg-[#131C31] rounded-xl p-1.5 border border-cyan-500/20 mb-4 shadow-xl">
               <button onClick={() => setPlanView("entry")} className={`flex-1 py-3 text-[11px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${planView === "entry" ? "bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(0,230,243,0.3)]" : "text-slate-500 hover:text-slate-300"}`}>
                 Data Entry
               </button>
               <button onClick={() => setPlanView("deskripsi")} className={`flex-1 py-3 text-[11px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${planView === "deskripsi" ? "bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(0,230,243,0.3)]" : "text-slate-500 hover:text-slate-300"}`}>
                 Mapping
               </button>
             </div>

             {planView === "entry" && (
               <div className="space-y-4 animate-fade-in">
                 {mondaySignals.map((sig, i) => (
                  <div key={i} className="bg-[#131C31] border-l-4 border-l-cyan-400 border border-slate-800 rounded-r-2xl p-5 shadow-xl transition-all hover:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-white tracking-widest">{sig.code}</h3>
                      <span className="text-[9px] font-black bg-cyan-950/50 text-cyan-400 px-2.5 py-1.5 rounded uppercase tracking-widest border border-cyan-500/20 shadow-sm">Watchlist</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center uppercase font-bold text-[10px]">
                      <div className="bg-[#0B1120] p-2 rounded-lg border border-slate-800 shadow-inner flex flex-col justify-center">
                        <p className="text-[8px] text-slate-500 mb-1">Entry</p>
                        <p className={`text-cyan-400 ${sig.entry.length > 10 ? 'text-[8px] leading-tight' : ''}`}>{sig.entry}</p>
                      </div>
                      <div className="bg-[#0B1120] p-2 rounded-lg border border-slate-800 shadow-inner flex flex-col justify-center">
                        <p className="text-[8px] text-slate-500 mb-1">Antri</p>
                        <p className="text-slate-300">{sig.antri}</p>
                      </div>
                      <div className="bg-rose-500/5 p-2 rounded-lg border border-rose-500/10 shadow-inner flex flex-col justify-center">
                        <p className="text-[8px] text-rose-500 mb-1">CL</p>
                        <p className="text-rose-400">{sig.sl}</p>
                      </div>
                      <div className="bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10 shadow-inner flex flex-col justify-center">
                        <p className="text-[8px] text-emerald-500 mb-1">TP</p>
                        <p className="text-emerald-400">{sig.tp}</p>
                      </div>
                    </div>
                  </div>
                ))}
               </div>
             )}

             {planView === "deskripsi" && (
               <div className="space-y-4 animate-fade-in">
                 <div className="bg-[#131C31] border border-cyan-500/10 p-5 rounded-2xl shadow-inner mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
                    <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-3 border-b border-slate-800 pb-2 relative z-10">Market Insight</p>
                    <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed whitespace-pre-wrap relative z-10">{mappingIntro}</p>
                 </div>

                 {mondaySignals.map((sig, i) => (
                  <div key={i} className="bg-[#131C31] border border-slate-800 rounded-2xl p-5 shadow-xl transition-all">
                    <h3 className="text-lg font-black text-cyan-300 tracking-widest mb-2 border-b border-slate-800/80 pb-2">
                      ◈ {sig.code}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed text-justify">{sig.desc}</p>
                  </div>
                ))}
               </div>
             )}
          </div>
        )}

        {/* ==============================================
            TAB EDUKASI (BARU)
            ============================================== */}
        {activeTab === "edu" && (
          <div className="animate-fade-in pt-2 space-y-6">
            
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black tracking-widest uppercase rounded-full mb-3">
                🔥 Flash Sale Promo 40%
              </span>
              <h2 className="text-2xl font-black text-white tracking-wide">Level Up Your Game</h2>
              <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                Berhenti jadi donatur market. Pilih kelas yang sesuai sama gaya trading lu, kita bedah dari nol sampe jago.
              </p>
            </div>

            <div className="space-y-5">
              {eduPackages.map((pkg, i) => (
                <div key={i} className="bg-[#131C31] border border-cyan-500/20 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  {/* Efek glow background */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-black text-cyan-300 mb-2">{pkg.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-5 min-h-[50px]">{pkg.desc}</p>
                    
                    <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-4 mb-5">
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-2">Yang Lu Dapet:</p>
                      <ul className="space-y-2">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="text-[10px] text-slate-300 flex items-center gap-2">
                            <span className="text-emerald-400">✓</span> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[11px] text-slate-500 line-through decoration-rose-500/70 font-mono mb-0.5">
                          {formatRupiah(pkg.normalPrice)}
                        </p>
                        <p className="text-xl font-black text-white">
                          {formatRupiah(pkg.discountPrice)}
                        </p>
                      </div>
                      
                      <a href={`https://wa.me/6282218723401?text=Halo%20bos,%20gua%20mau%20daftar%20kelas%20${encodeURIComponent(pkg.title)}%20yang%20harga%20promo.`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-[11px] font-black uppercase tracking-widest px-5 py-3 rounded-xl shadow-lg transition-all active:scale-95">
                        Ambil Promo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==============================================
            TAB INFO
            ============================================== */}
        {activeTab === "info" && (
          <div className="animate-fade-in pt-2 max-w-sm mx-auto space-y-6">
            <div className="bg-[#131C31] border border-cyan-500/20 rounded-3xl p-8 text-center shadow-2xl relative">
               <h2 className="text-sm font-bold text-cyan-400 mb-3 flex items-center justify-center gap-2">
                 <span className="text-lg">⚡</span> Donasi Server
               </h2>
               <p className="text-[11px] text-slate-400 leading-relaxed mb-8 px-2">
                 Agar website analisa ini tetap aktif dan bebas diakses oleh semua trader.
               </p>
               
               <div className="bg-white p-3 rounded-2xl inline-block mb-8 w-48 h-48 border-[6px] border-[#0B1120] shadow-inner">
                  <img src={donationConfig.qrisUrl} alt="QRIS" className="w-full h-full object-cover" onError={(e) => {(e.target as any).src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DonasiServerThirafi";}}/>
               </div>
               
               <a href={donationConfig.contactUrl} target="_blank" className="block w-4/5 mx-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-[12px] py-3 rounded-xl transition-all shadow-md">
                 Support & Contact
               </a>
            </div>

            <div className="px-2 pb-10">
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
                 <span className="text-cyan-500 text-lg">♦</span> DISCLAIMER
               </p>
               <div className="text-left space-y-4">
                  <h3 className="text-sm font-bold text-rose-500 flex items-center gap-2">
                    <span className="text-lg">⚠️</span> Trading Berisiko Tinggi
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed text-justify">Seluruh informasi, analisa, dan signal pada website ini hanya untuk edukasi dan referensi umum.</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed text-justify">Trading memiliki risiko tinggi. Semua keputusan trading adalah tanggung jawab pengguna.</p>
               </div>
            </div>
          </div>
        )}

      </main>

      {/* NAVBAR BAWAH - UPDATE JADI 4 MENU */}
      <nav className="fixed bottom-0 w-full bg-[#0B1120]/95 backdrop-blur-2xl border-t border-cyan-500/20 py-4 px-6 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab("market")} className={`flex flex-col items-center gap-1.5 transition-all w-1/4 ${activeTab === 'market' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(0,230,243,0.5)]' : 'text-slate-500 hover:text-slate-400'}`}>
          <span className="text-xl">📊</span><span className="text-[8px] font-bold uppercase tracking-widest">Market</span>
        </button>
        <button onClick={() => setActiveTab("plan")} className={`flex flex-col items-center gap-1.5 transition-all w-1/4 ${activeTab === 'plan' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(0,230,243,0.5)]' : 'text-slate-500 hover:text-slate-400'}`}>
          <span className="text-xl">🎯</span><span className="text-[8px] font-bold uppercase tracking-widest">Plan</span>
        </button>
        <button onClick={() => setActiveTab("edu")} className={`flex flex-col items-center gap-1.5 transition-all w-1/4 ${activeTab === 'edu' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(0,230,243,0.5)]' : 'text-slate-500 hover:text-slate-400'}`}>
          <span className="text-xl">🧠</span><span className="text-[8px] font-bold uppercase tracking-widest">Edukasi</span>
        </button>
        <button onClick={() => setActiveTab("info")} className={`flex flex-col items-center gap-1.5 transition-all w-1/4 ${activeTab === 'info' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(0,230,243,0.5)]' : 'text-slate-500 hover:text-slate-400'}`}>
          <span className="text-xl">⚡</span><span className="text-[8px] font-bold uppercase tracking-widest">Info</span>
        </button>
      </nav>
    </div>
  );
}
