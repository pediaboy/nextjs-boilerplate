"use client";

import { useState, useEffect } from "react";

// DATA PORTFOLIO LU
const myPortfolio = [
  { code: "BBCA", name: "Bank Central Asia", lot: 100, avg: 5980 },
  { code: "BBRI", name: "Bank Rakyat Indonesia", lot: 80, avg: 3039 },
  { code: "BBNI", name: "Bank Negara Indonesia", lot: 95, avg: 3771 },
  { code: "WBSA", name: "BSA Logistics", lot: 87, avg: 1160 },
  { code: "HUMI", name: "Humpuss Maritim", lot: 200, avg: 175 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home"); // Buat ganti halaman
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("SYNCING...");

  const fetchPrices = async () => {
    try {
      const symbols = myPortfolio.map((p) => `${p.code}.JK`).join(",");
      const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}&nocache=${Date.now()}`;
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Proxy Blocked");
      
      const data = await response.json();
      const newPrices: Record<string, number> = {};
      
      if (data.quoteResponse && data.quoteResponse.result) {
        data.quoteResponse.result.forEach((stock: any) => {
          const code = stock.symbol.replace(".JK", "");
          if (stock.regularMarketPrice) newPrices[code] = stock.regularMarketPrice;
        });
      }

      setPrices(newPrices);
      const now = new Date();
      setLastUpdate(now.toLocaleTimeString("id-ID") + " WIB");
    } catch (error) {
      setLastUpdate("OFFLINE");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatRp = (angka: number) => {
    return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(angka);
  };

  let totalModal = 0;
  let totalValue = 0;

  myPortfolio.forEach((stock) => {
    const lembar = stock.lot * 100;
    totalModal += lembar * stock.avg;
    totalValue += (lembar * (prices[stock.code] || stock.avg));
  });

  const floatingPL = totalValue - totalModal;
  const isProfitTotal = floatingPL >= 0;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans pb-20 selection:bg-cyan-500 selection:text-black">
      
      {/* CSS KHUSUS NEON & ANIMASI */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 15s linear infinite;
        }
        .neon-text-cyan {
          text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff;
        }
        .neon-text-magenta {
          text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff;
        }
        .neon-box-cyan {
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.1);
          border-color: #00ffff;
        }
        .neon-box-magenta {
          box-shadow: 0 0 10px rgba(255, 0, 255, 0.4), inset 0 0 10px rgba(255, 0, 255, 0.1);
          border-color: #ff00ff;
        }
        /* Sembunyikan scrollbar tapi tetep bisa di-scroll */
        ::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* HEADER UTAMA */}
      <header className="px-4 py-4 border-b border-cyan-500/30 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-40 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-cyan-400 font-extrabold text-lg tracking-wider neon-text-cyan uppercase">
              THIRAFI THARIQ AL IDRIS
            </h1>
            <p className="text-[10px] tracking-widest text-gray-400 mt-1 uppercase">EXECUTIVE DASHBOARD</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <span className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500' : 'bg-cyan-400 animate-pulse'}`}></span>
              <p className="text-cyan-400 font-bold text-xs">{lastUpdate}</p>
            </div>
            <p className="text-[9px] text-gray-500 tracking-widest uppercase mt-1">MARKET STATUS</p>
          </div>
        </div>
      </header>

      {/* TICKER TEXT BERJALAN */}
      {activeTab === "home" && (
        <div className="bg-cyan-900/20 border-b border-cyan-500/30 text-cyan-400 text-[10px] py-2 overflow-hidden tracking-widest font-bold shadow-[inset_0_0_10px_rgba(0,255,255,0.1)]">
          <div className="animate-marquee">
            ✦ WELCOME TO TRADING SYSTEM ✦ MONITORING ASSETS IN REALTIME ✦ FULL AUTOMATION ENGAGED ✦
          </div>
        </div>
      )}

      {/* RENDER HALAMAN BERDASARKAN TAB YANG AKTIF */}
      <main className="p-4 max-w-xl mx-auto">
        
        {/* =========================================
            HALAMAN 1: HOME (MARKET & PORTFOLIO)
           ========================================= */}
        {activeTab === "home" && (
          <div className="animate-fade-in transition-all duration-500">
            
            {/* TRADINGVIEW WIDGET */}
            <div className="mb-6 rounded-xl overflow-hidden neon-box-cyan border">
              <div className="bg-cyan-950/50 px-3 py-2 border-b border-cyan-500/30 flex items-center gap-2">
                <span className="text-cyan-400 text-xs">📊</span>
                <span className="text-xs font-bold text-cyan-400 tracking-widest">LIVE CHART (IHSG)</span>
              </div>
              <iframe 
                src="https://s.tradingview.com/widgetembed/?symbol=IDX:COMPOSITE&interval=D&theme=dark&hidesidetoolbar=1" 
                width="100%" 
                height="250" 
                frameBorder="0"
                className="pointer-events-auto"
              ></iframe>
            </div>

            {/* RINGKASAN PORTOFOLIO */}
            <div className="mb-6 bg-[#0a0a0a] border border-magenta-500/50 rounded-xl p-5 neon-box-magenta relative overflow-hidden">
              <div className="absolute top-[-50%] right-[-10%] w-32 h-32 bg-magenta-500/20 blur-[50px] rounded-full pointer-events-none"></div>
              
              <p className="text-xs text-magenta-300 tracking-widest mb-1">TOTAL PORTFOLIO VALUE</p>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3 neon-text-magenta">
                Rp {formatRp(totalValue)}
              </h2>
              
              <div className="flex items-center gap-3 border-t border-magenta-500/30 pt-3 mt-2">
                <div className={`px-3 py-1 rounded border text-xs font-bold ${isProfitTotal ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 neon-box-cyan' : 'bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_10px_rgba(255,0,0,0.5)]'}`}>
                  {isProfitTotal ? 'PROFIT' : 'LOSS'} Rp {formatRp(floatingPL)}
                </div>
                <p className="text-[10px] text-gray-400 tracking-widest uppercase">From Rp {formatRp(totalModal)}</p>
              </div>
            </div>

            {/* GRID ASET SAHAM */}
            <div className="flex items-center gap-2 mb-3 mt-8">
              <span className="text-cyan-400 text-xs animate-pulse">●</span>
              <span className="text-[11px] tracking-[0.2em] text-cyan-400 font-bold">ASSET MONITORING</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {myPortfolio.map((stock) => {
                const lembar = stock.lot * 100;
                const modal = lembar * stock.avg;
                const hargaAktif = prices[stock.code] || stock.avg;
                const pl = (lembar * hargaAktif) - modal;
                const plPercent = modal > 0 ? (pl / modal) * 100 : 0;
                const isProfit = pl >= 0;

                return (
                  <div key={stock.code} className={`bg-[#0a0a0a] border rounded-lg p-3 relative flex flex-col justify-between min-h-[90px] transition-all duration-300 ${isProfit ? 'border-cyan-500/40 hover:neon-box-cyan' : 'border-magenta-500/40 hover:neon-box-magenta'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-white font-bold tracking-widest">{stock.code}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${isProfit ? 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10' : 'border-magenta-500/50 text-magenta-400 bg-magenta-500/10'}`}>
                        {stock.lot} LOT
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">Harga (Avg: {stock.avg})</p>
                      <h2 className="text-lg font-bold text-white tracking-tight">{formatRp(hargaAktif)}</h2>
                      <p className={`text-[11px] font-bold mt-1 ${isProfit ? 'text-cyan-400 neon-text-cyan' : 'text-magenta-400 neon-text-magenta'}`}>
                        {isProfit ? '+' : ''}{plPercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================
            HALAMAN 2: ENTRY KELAS (PENDAFTARAN)
           ========================================= */}
        {activeTab === "kelas" && (
          <div className="animate-fade-in transition-all duration-500 pt-2">
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-cyan-400 neon-text-cyan uppercase mb-2">Pendaftaran Kelas</h2>
              <p className="text-xs text-gray-400 tracking-widest">BERGABUNG DAN TINGKATKAN SKILL ANDA</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Form Group 1 */}
              <div>
                <label className="block text-[10px] font-bold text-cyan-400 tracking-widest uppercase mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama anda..." 
                  className="w-full bg-[#0a0a0a] border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:neon-box-cyan transition-all"
                />
              </div>

              {/* Form Group 2 */}
              <div>
                <label className="block text-[10px] font-bold text-cyan-400 tracking-widest uppercase mb-1">Nomor WhatsApp</label>
                <input 
                  type="tel" 
                  placeholder="Contoh: 082218723401" 
                  className="w-full bg-[#0a0a0a] border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:neon-box-cyan transition-all"
                />
              </div>

              {/* Form Group 3 */}
              <div>
                <label className="block text-[10px] font-bold text-cyan-400 tracking-widest uppercase mb-1">Pilih Kelas</label>
                <select className="w-full bg-[#0a0a0a] border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:neon-box-cyan transition-all appearance-none">
                  <option>Kelas Basic Trading & Automation</option>
                  <option>Kelas Advanced Bot Web</option>
                  <option>Private Mentorship</option>
                </select>
              </div>

              {/* Tombol Submit */}
              <button className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-black font-extrabold tracking-widest uppercase py-4 rounded-lg neon-box-cyan transition-all">
                Daftar Sekarang
              </button>
            </form>

            <div className="mt-8 p-4 bg-magenta-900/10 border border-magenta-500/30 rounded-lg text-center">
              <p className="text-xs text-magenta-300">Butuh bantuan? Hubungi admin via WhatsApp untuk konsultasi pemilihan kelas yang tepat.</p>
            </div>

          </div>
        )}

      </main>

      {/* =========================================
          BOTTOM NAVIGATION BAR (FUNCTIONAL)
         ========================================= */}
      <nav className="fixed bottom-0 w-full bg-[#050505]/90 backdrop-blur-xl border-t border-cyan-500/30 py-4 px-8 flex justify-around items-center z-50 shadow-[0_-5px_15px_rgba(0,255,255,0.1)]">
        
        {/* Tombol Home */}
        <button 
          onClick={() => setActiveTab("home")} 
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'home' ? 'text-cyan-400 neon-text-cyan scale-110' : 'text-gray-600 hover:text-cyan-200'}`}
        >
          <span className="text-xl">📊</span>
          <span className="text-[8px] font-bold tracking-widest uppercase">Dashboard</span>
        </button>

        {/* Tombol Kelas (Tengah) */}
        <button 
          onClick={() => setActiveTab("kelas")} 
          className={`relative -top-5 w-14 h-14 rounded-full flex items-center justify-center border-4 border-[#050505] transition-all duration-300 ${activeTab === 'kelas' ? 'bg-magenta-500 text-white neon-box-magenta scale-110' : 'bg-cyan-800 text-cyan-300 hover:bg-cyan-600'}`}
        >
          <span className="text-2xl">🎓</span>
        </button>

        {/* Tombol Contact / WhatsApp */}
        <a 
          href="https://wa.me/6282218723401" 
          target="_blank" 
          rel="noreferrer"
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-cyan-400 transition-all duration-300"
        >
          <span className="text-xl">💬</span>
          <span className="text-[8px] font-bold tracking-widest uppercase">Contact</span>
        </a>

      </nav>

    </div>
  );
}
