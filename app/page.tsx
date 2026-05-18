"use client";

import { useState, useEffect } from "react";

// DATA PORTFOLIO LU (TETEP SAMA)
const myPortfolio = [
  { code: "BBCA", name: "Bank Central Asia", lot: 100, avg: 5980 },
  { code: "BBRI", name: "Bank Rakyat Indonesia", lot: 80, avg: 3039 },
  { code: "BBNI", name: "Bank Negara Indonesia", lot: 95, avg: 3771 },
  { code: "WBSA", name: "BSA Logistics", lot: 87, avg: 1160 },
  { code: "HUMI", name: "Humpuss Maritim", lot: 200, avg: 175 },
];

export default function Home() {
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
      // Format jam ala terminal militer/trading
      const now = new Date();
      setLastUpdate(now.toLocaleTimeString("en-GB", { hour12: false }) + " UTC+7");
    } catch (error) {
      setLastUpdate("OFFLINE / RETRY");
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
    const modal = lembar * stock.avg;
    const hargaAktif = prices[stock.code] || stock.avg;
    totalModal += modal;
    totalValue += (lembar * hargaAktif);
  });

  const floatingPL = totalValue - totalModal;
  const isProfitTotal = floatingPL >= 0;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono pb-20 selection:bg-[#D4AF37] selection:text-black">
      
      {/* CSS Khusus Animasi Marquee (Berjalan) */}
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
      `}} />

      {/* HEADER ALA TERMINAL */}
      <header className="flex justify-between items-center px-4 py-3 border-b border-[#222]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center">
            <div className="w-4 h-4 bg-[#D4AF37] rounded-sm rotate-45"></div>
          </div>
          <div>
            <h1 className="text-[#D4AF37] font-bold text-sm tracking-[0.2em] uppercase">PEDIABOY AI TERMINAL</h1>
            <p className="text-[9px] tracking-widest text-gray-500 uppercase">THE FUNDER TRADER</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[#D4AF37] font-bold text-xs">{lastUpdate}</p>
          <p className="text-[9px] text-gray-500 tracking-widest uppercase">18 MAY 2026</p>
        </div>
      </header>

      {/* TICKER TEXT BERJALAN */}
      <div className="bg-[#D4AF37]/10 border-b border-[#222] text-[#D4AF37] text-[10px] py-1 overflow-hidden tracking-widest">
        <div className="animate-marquee">
          ✦ TRADE IN SILENCE, LET PROFIT SPEAK ✦ AUTO-SYNC ACTIVE ✦ MULTIPLE ASSETS DETECTED ✦
        </div>
      </div>

      {/* SUB-HEADER STATUS */}
      <div className="flex justify-between text-[10px] px-4 py-2 bg-[#0a0a0a] border-b border-[#222] tracking-widest uppercase">
        <span className="text-gray-400">SESSION: <span className="text-white">JAKARTA</span></span>
        <span className="text-gray-400">STATUS: <span className={loading ? "text-yellow-500" : "text-[#D4AF37]"}>{loading ? "SYNC" : "LIVE"}</span></span>
      </div>

      <div className="p-4 max-w-xl mx-auto">
        
        {/* GRID KOTAK SAHAM (Mirip list XAU/BTC di video) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {myPortfolio.map((stock) => {
            const lembar = stock.lot * 100;
            const modal = lembar * stock.avg;
            const hargaAktif = prices[stock.code] || stock.avg;
            const pl = (lembar * hargaAktif) - modal;
            const plPercent = modal > 0 ? (pl / modal) * 100 : 0;
            const isProfit = pl >= 0;

            return (
              <div key={stock.code} className="bg-[#111] border border-[#222] rounded-md p-3 relative overflow-hidden flex flex-col justify-between min-h-[90px]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-400 tracking-widest">{stock.code} / IDR</span>
                  <span className="text-[#D4AF37] text-xs">◈</span>
                </div>
                
                <div className="flex justify-between items-end z-10">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">{formatRp(hargaAktif)}</h2>
                    <p className={`text-[10px] flex items-center gap-1 mt-1 ${isProfit ? 'text-red-500' : 'text-green-500'}`}>
                      {/* Sengaja dibalik warnanya buat ngikutin style terminal tertentu atau biarin ijo profit merah loss */}
                      <span className="text-[8px]">{isProfit ? '▲' : '▼'}</span> {Math.abs(plPercent).toFixed(2)}%
                    </p>
                  </div>
                </div>

                {/* Garis Chart Palsu (Aesthetic only) */}
                <svg className="absolute bottom-0 left-0 w-full h-8 opacity-30" preserveAspectRatio="none" viewBox="0 0 100 20">
                  <path 
                    d={isProfit ? "M0,20 Q25,10 50,15 T100,5 L100,20 Z" : "M0,5 Q25,15 50,10 T100,20 L100,20 L0,20 Z"} 
                    fill={isProfit ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"} 
                  />
                  <path 
                    d={isProfit ? "M0,20 Q25,10 50,15 T100,5" : "M0,5 Q25,15 50,10 T100,20"} 
                    fill="none" 
                    stroke={isProfit ? "#22c55e" : "#ef4444"} 
                    strokeWidth="1" 
                  />
                </svg>
              </div>
            );
          })}
        </div>

        {/* AI MARKET BRIEF SECTION */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-[#D4AF37]">○</span>
            <span className="text-[10px] tracking-[0.2em] text-gray-500">AI PORTFOLIO BRIEF</span>
          </div>
          <div className="bg-[#111] border border-[#222] p-4 rounded-md relative">
            <p className="text-xs text-gray-400 leading-relaxed">
              AI mendeteksi total investasi sebesar <span className="text-white font-bold">Rp {formatRp(totalModal)}</span> pada {myPortfolio.length} emiten aktif. 
              Floating P/L saat ini dihitung secara realtime mengikuti pergerakan market.
            </p>
            <div className="mt-4 pt-3 border-t border-[#222] flex justify-between items-center">
              <span className="text-[10px] tracking-widest uppercase text-gray-500">Net Value</span>
              <span className={`text-sm font-bold ${isProfitTotal ? 'text-green-500' : 'text-red-500'}`}>
                Rp {formatRp(totalValue)}
              </span>
            </div>
          </div>
        </div>

        {/* ACTIVE SIGNALS SECTION (Format data lu jadi gaya sinyal) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-[#D4AF37]">○</span>
            <span className="text-[10px] tracking-[0.2em] text-gray-500">ACTIVE POSITIONS</span>
          </div>
          
          <div className="space-y-2">
            {myPortfolio.map((stock) => {
              const pl = (stock.lot * 100 * (prices[stock.code] || stock.avg)) - (stock.lot * 100 * stock.avg);
              const isProfit = pl >= 0;

              return (
                <div key={"sig-"+stock.code} className="bg-[#111] border border-[#222] p-3 rounded-md flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 border rounded-[3px] text-[10px] font-bold tracking-widest ${isProfit ? 'border-green-500/50 text-green-500 bg-green-500/10' : 'border-red-500/50 text-red-500 bg-red-500/10'}`}>
                      {isProfit ? 'HOLD' : 'WAIT'}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{stock.code}</h3>
                      <p className="text-[9px] text-gray-500 tracking-widest uppercase">Entry: {formatRp(stock.avg)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#D4AF37]">95%</p>
                    <p className="text-[8px] text-gray-500 tracking-widest uppercase">CONFIDENCE</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 w-full bg-[#050505] border-t border-[#222] py-3 px-6 flex justify-between items-center z-50">
        <span className="text-[#D4AF37] text-xl">⌂</span>
        <span className="text-gray-600 text-xl">⚡</span>
        <span className="text-gray-600 text-xl">∆</span>
        <span className="text-gray-600 text-xl">☐</span>
        <span className="text-gray-600 text-xl flex flex-col items-center">
           <span className="text-[#D4AF37] text-[20px]">🏆</span>
           <span className="text-[#D4AF37] text-[6px] tracking-widest uppercase mt-1">PLAN</span>
        </span>
      </nav>

    </div>
  );
}
