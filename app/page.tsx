"use client";

import { useState, useEffect } from "react";
import { myPortfolio, classSignals, donationConfig } from "./data";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("Syncing...");

  const fetchPrices = async () => {
    try {
      const symbols = myPortfolio.map((p) => `${p.code}.JK`).join(",");
      const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}&t=${Date.now()}`;
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      const newPrices: Record<string, number> = {};
      if (data.quoteResponse?.result) {
        data.quoteResponse.result.forEach((stock: any) => {
          const code = stock.symbol.replace(".JK", "");
          newPrices[code] = stock.regularMarketPrice;
        });
      }
      setPrices(newPrices);
      setLastUpdate(new Date().toLocaleTimeString("id-ID") + " WIB");
    } catch (e) {
      setLastUpdate("Offline");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatRp = (n: number) => new Intl.NumberFormat("id-ID").format(Math.round(n));

  let totalModal = 0;
  let totalValue = 0;
  myPortfolio.forEach((s) => {
    const lembar = s.lot * 100;
    totalModal += lembar * s.avg;
    totalValue += lembar * (prices[s.code] || s.lastClose);
  });
  const floatingPL = totalValue - totalModal;
  const plPercent = totalModal > 0 ? (floatingPL / totalModal) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 font-sans pb-24">
      {/* HEADER */}
      <header className="px-6 py-4 border-b border-gray-800 bg-[#0d0d0d]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div>
            <h1 className="text-white font-bold text-base tracking-tight italic">Thirafi Thariq Al Idris</h1>
            <p className="text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase">Executive Terminal</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-400">{lastUpdate}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-xl mx-auto">
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* ... Bagian Portofolio Sama Seperti Sebelumnya ... */}
            <div className="rounded-2xl overflow-hidden border border-gray-800 bg-black shadow-2xl">
              <iframe src="https://s.tradingview.com/widgetembed/?symbol=IDX:COMPOSITE&interval=D&theme=dark" width="100%" height="240" frameBorder="0"></iframe>
            </div>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gray-800 rounded-3xl p-7 shadow-2xl relative overflow-hidden text-center">
               <p className="text-xs text-gray-500 font-bold tracking-[0.2em] mb-4 uppercase text-left">Total Asset Value</p>
               <div className="flex items-baseline gap-3 mb-8 justify-start">
                <span className="text-lg font-medium text-gray-500">Rp</span>
                <h2 className="text-4xl font-black text-white tracking-normal leading-none">{formatRp(totalValue)}</h2>
              </div>
              <div className="flex justify-between border-t border-gray-800 pt-6 text-left">
                <div><p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-widest">Floating P/L</p>
                <p className={`text-sm font-black ${floatingPL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{floatingPL >= 0 ? '+' : ''}Rp {formatRp(floatingPL)} ({plPercent.toFixed(2)}%)</p></div>
                <div className="text-right"><p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-widest">Net Capital</p>
                <p className="text-sm font-black text-gray-300">Rp {formatRp(totalModal)}</p></div>
              </div>
            </div>
            {/* ASSET LIST */}
            <div className="grid grid-cols-1 gap-3">
              {myPortfolio.map((s) => {
                const cur = prices[s.code] || s.lastClose;
                const pl = (s.lot * 100 * cur) - (s.lot * 100 * s.avg);
                return (
                  <div key={s.code} className="bg-[#161616] border border-gray-800 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center font-black text-xs text-white border border-gray-700">{s.code.substring(0,2)}</div>
                        <div><span className="text-sm font-black text-white block uppercase">{s.code}</span><span className="text-[10px] text-gray-500 font-bold uppercase">{s.lot} LOT • AVG {formatRp(s.avg)}</span></div>
                      </div>
                      <div className="text-right"><p className="text-[10px] text-gray-500 font-bold mb-0.5 tracking-tighter uppercase text-[8px]">Market Price</p><p className="text-sm font-black text-white italic">Rp {formatRp(cur)}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "plan" && (
          <div className="space-y-4 animate-fade-in">
             {/* ... Bagian Plan Sama ... */}
             <h2 className="text-sm font-black text-gray-500 uppercase tracking-[0.4em] mb-6 text-center pt-2">Exclusive Trading Plan</h2>
             {classSignals.map((sig, i) => (
              <div key={i} className="bg-[#161616] border-l-4 border-l-blue-500 border border-gray-800 rounded-r-2xl p-5 shadow-xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-black text-white">{sig.code}</h3>
                  <span className="text-[9px] font-black bg-blue-500/10 text-blue-400 px-2 py-1 rounded uppercase tracking-widest border border-blue-500/20">Active Setup</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-4 italic">"{sig.desc}"</p>
                <div className="grid grid-cols-4 gap-2 text-center uppercase font-bold text-[10px]">
                  <div className="bg-black/40 p-2 rounded-xl border border-gray-800"><p className="text-[8px] text-gray-500 mb-1">Entry</p><p className="text-white">{sig.entry}</p></div>
                  <div className="bg-black/40 p-2 rounded-xl border border-gray-800"><p className="text-[8px] text-gray-500 mb-1">Antri</p><p className="text-gray-400">{sig.antri}</p></div>
                  <div className="bg-red-500/5 p-2 rounded-xl border border-red-500/10"><p className="text-[8px] text-red-500 mb-1">SL</p><p className="text-red-400">{sig.sl}</p></div>
                  <div className="bg-emerald-500/5 p-2 rounded-xl border border-emerald-500/10"><p className="text-[8px] text-emerald-500 mb-1">TP</p><p className="text-emerald-400">{sig.tp}</p></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "donate" && (
          <div className="animate-fade-in pt-6 max-w-sm mx-auto space-y-8">
            {/* DONATION CARD */}
            <div className="bg-[#161616] border border-gray-800 rounded-[2rem] p-8 shadow-2xl text-center relative overflow-hidden">
               <div className="text-yellow-500 text-2xl mb-2">💛</div>
               <h2 className="text-lg font-black text-white uppercase tracking-widest mb-2">{donationConfig.title}</h2>
               <p className="text-[11px] text-gray-500 leading-relaxed mb-8 px-4 font-medium tracking-wide italic">"{donationConfig.description}"</p>

               {/* QRIS FRAME */}
               <div className="bg-white p-4 rounded-3xl inline-block shadow-inner mb-8 border-4 border-[#121212]">
                  <img src={donationConfig.qrisUrl} alt="QRIS" className="w-52 h-auto" onError={(e) => {(e.target as any).src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DonasiServerThirafi";}}/>
               </div>

               {/* CONTACT BUTTON */}
               <a href={donationConfig.contactUrl} target="_blank" className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] tracking-[0.2em] uppercase py-3.5 rounded-xl transition-all shadow-lg">
                  Support & Contact
               </a>
            </div>

            {/* DISCLAIMER SECTION */}
            <div className="text-left space-y-3 px-2">
               <div className="flex items-center gap-2 text-yellow-500">
                  <span className="text-lg font-bold">◈</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Disclaimer</p>
               </div>
               <div className="bg-[#161616]/50 border-l-2 border-yellow-500/50 p-4 rounded-r-xl">
                  <p className="text-[12px] font-black text-yellow-500 mb-2 flex items-center gap-2">
                    <span className="text-lg">⚠️</span> {donationConfig.disclaimer.title}
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                    {donationConfig.disclaimer.content}
                  </p>
               </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full bg-[#0d0d0d]/95 backdrop-blur-2xl border-t border-gray-800 py-4 px-10 flex justify-around items-center z-50">
        <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-1.5 ${activeTab === 'home' ? 'text-white' : 'text-gray-600 opacity-50'}`}>
          <span className="text-xl">📊</span><span className="text-[8px] font-black uppercase tracking-widest">Aset</span>
        </button>
        <button onClick={() => setActiveTab("plan")} className={`flex flex-col items-center gap-1.5 ${activeTab === 'plan' ? 'text-white' : 'text-gray-600 opacity-50'}`}>
          <span className="text-xl">🎯</span><span className="text-[8px] font-black uppercase tracking-widest">Plan</span>
        </button>
        <button onClick={() => setActiveTab("donate")} className={`flex flex-col items-center gap-1.5 ${activeTab === 'donate' ? 'text-white' : 'text-gray-600 opacity-50'}`}>
          <span className="text-xl">❓</span><span className="text-[8px] font-black uppercase tracking-widest">info</span>
        </button>
      </nav>
    </div>
  );
}
