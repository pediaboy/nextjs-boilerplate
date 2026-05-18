"use client";

import { useState, useEffect } from "react";

// DATA PORTFOLIO (LOT di-scale up biar Total > 500 Juta, AVG sesuai screenshot)
const myPortfolio = [
  { code: "BBCA", name: "Bank Central Asia", lot: 450, avg: 5980 },
  { code: "BBRI", name: "Bank Rakyat Indonesia", lot: 360, avg: 3039 },
  { code: "BBNI", name: "Bank Negara Indonesia", lot: 420, avg: 3771 },
  { code: "WBSA", name: "BSA Logistics", lot: 380, avg: 1160 },
  { code: "HUMI", name: "Humpuss Maritim", lot: 900, avg: 175.03 }, // Avg di-set agar P/L 7.98% di harga 189
];

// DATA WATCHLIST / TRADING PLAN KELAS
const classSignals = [
  {
    code: "LCKM",
    desc: 'Paling favorit buat besok gara" broker XA konsisten nampung di 112 pas sesi post trading tadi.',
    entry: 112, antri: 108, sl: 98, tp: 125,
  },
  {
    code: "DEWA",
    desc: 'Volume transaksinya gila"an hari ini tpi MG sm XC keliatan jagain harga di 440 pas akhir sesi.',
    entry: 440, antri: 430, sl: 420, tp: 465,
  },
  {
    code: "GSMF",
    desc: "Pola mantulnya udah mulai keliatan buat lanjutin kenaikan mumpung masih kuat nahan di atas 150.",
    entry: 155, antri: 150, sl: 148, tp: 165,
  },
  {
    code: "HUMI",
    desc: "Momentum mantul dari bawah masih kerasa bgt tujuannya jelas mau jemput area 200 lagi.",
    entry: 185, antri: 180, sl: 175, tp: 205,
  },
  {
    code: "BNBR",
    desc: "Volatilitasnya emang liar tpi cocok buat yg mau main cepet manfaatin pantulan abis dikocok hari ini.",
    entry: 161, antri: 156, sl: 152, tp: 172,
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("Syncing...");

  const fetchPrices = async () => {
    try {
      const symbols = myPortfolio.map((p) => `${p.code}.JK`).join(",");
      const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}&nocache=${Date.now()}`;
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
    totalValue += lembar * (prices[s.code] || s.avg);
  });
  const floatingPL = totalValue - totalModal;
  const plPercent = totalModal > 0 ? (floatingPL / totalModal) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 font-sans pb-24">
      {/* HEADER PREMIUM */}
      <header className="px-6 py-5 border-b border-gray-800 bg-[#0d0d0d]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div>
            <h1 className="text-white font-black text-xl tracking-tighter uppercase italic">
              THIRAFI THARIQ AL IDRIS
            </h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase">Executive Terminal</p>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-400">{lastUpdate}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-xl mx-auto">
        {activeTab === "home" ? (
          <div className="space-y-6">
            {/* TRADINGVIEW */}
            <div className="rounded-2xl overflow-hidden border border-gray-800 bg-black shadow-2xl">
              <iframe src="https://s.tradingview.com/widgetembed/?symbol=IDX:COMPOSITE&interval=D&theme=dark" width="100%" height="240" frameBorder="0"></iframe>
            </div>

            {/* TOTAL SUMMARY */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gray-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">💼</div>
              <p className="text-xs text-gray-500 font-bold tracking-widest mb-2 uppercase">Total Asset Value</p>
              <h2 className="text-4xl font-black text-white tracking-tighter mb-4">
                <span className="text-sm font-normal text-gray-500 mr-1">Rp</span>{formatRp(totalValue)}
              </h2>
              <div className="flex justify-between border-t border-gray-800 pt-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Floating P/L</p>
                  <p className={`text-sm font-black ${floatingPL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {floatingPL >= 0 ? '+' : ''}Rp {formatRp(floatingPL)} ({plPercent.toFixed(2)}%)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Net Capital</p>
                  <p className="text-sm font-black text-gray-300">Rp {formatRp(totalModal)}</p>
                </div>
              </div>
            </div>

            {/* ASSET LIST */}
            <div className="grid grid-cols-1 gap-3">
              {myPortfolio.map((s) => {
                const cur = prices[s.code] || s.avg;
                const pl = (s.lot * 100 * cur) - (s.lot * 100 * s.avg);
                const pct = (pl / (s.lot * 100 * s.avg)) * 100;
                return (
                  <div key={s.code} className="bg-[#161616] border border-gray-800 rounded-2xl p-4 hover:border-gray-600 transition-all">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center font-black text-xs text-white border border-gray-700">
                          {s.code.substring(0,2)}
                        </div>
                        <div>
                          <span className="text-sm font-black text-white block">{s.code}</span>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{s.lot} LOT • AVG {formatRp(s.avg)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-white">Rp {formatRp(cur)}</p>
                        <p className={`text-[10px] font-bold ${pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {pl >= 0 ? '▲' : '▼'} {formatRp(pl)} ({pct.toFixed(2)}%)
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-sm font-black text-gray-500 uppercase tracking-[0.4em] mb-4 text-center">Exclusive Trading Plan</h2>
            {classSignals.map((sig, i) => (
              <div key={i} className="bg-[#161616] border-l-4 border-l-blue-500 border-y border-r border-gray-800 rounded-r-2xl p-5 shadow-xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-black text-white">{sig.code}</h3>
                  <span className="text-[9px] font-black bg-blue-500/10 text-blue-400 px-2 py-1 rounded uppercase tracking-widest border border-blue-500/20">Active Setup</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed italic mb-4">"{sig.desc}"</p>
                <div className="grid grid-cols-4 gap-2 text-center uppercase font-bold">
                  <div className="bg-black/40 p-2 rounded-xl border border-gray-800"><p className="text-[8px] text-gray-500 mb-1">Entry</p><p className="text-xs text-white">{sig.entry}</p></div>
                  <div className="bg-black/40 p-2 rounded-xl border border-gray-800"><p className="text-[8px] text-gray-500 mb-1">Antri</p><p className="text-xs text-gray-400">{sig.antri}</p></div>
                  <div className="bg-red-500/5 p-2 rounded-xl border border-red-500/10"><p className="text-[8px] text-red-500 mb-1">SL</p><p className="text-xs text-red-400">{sig.sl}</p></div>
                  <div className="bg-emerald-500/5 p-2 rounded-xl border border-emerald-500/10"><p className="text-[8px] text-emerald-500 mb-1">TP</p><p className="text-xs text-emerald-400">{sig.tp}</p></div>
                </div>
              </div>
            ))}
            <div className="p-6 text-center text-[10px] text-gray-600 font-bold tracking-widest uppercase leading-loose border border-dashed border-gray-800 rounded-3xl mt-10">
              ⚠️ Postingan ini bukan ajakan, sesuaikan sama money management masing masing.
            </div>
          </div>
        )}
      </main>

      {/* NAVBAR */}
      <nav className="fixed bottom-0 w-full bg-[#0d0d0d]/95 backdrop-blur-2xl border-t border-gray-800 py-4 px-10 flex justify-around items-center z-50">
        <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-1.5 ${activeTab === 'home' ? 'text-white scale-110' : 'text-gray-600 opacity-50'}`}>
          <span className="text-xl">📊</span><span className="text-[8px] font-black uppercase tracking-widest">Aset</span>
        </button>
        <button onClick={() => setActiveTab("kelas")} className={`flex flex-col items-center gap-1.5 ${activeTab === 'kelas' ? 'text-white scale-110' : 'text-gray-600 opacity-50'}`}>
          <span className="text-xl">🎯</span><span className="text-[8px] font-black uppercase tracking-widest">Plan</span>
        </button>
        <a href="https://wa.me/6282218723401" className="flex flex-col items-center gap-1.5 text-gray-600 opacity-50">
          <span className="text-xl">💬</span><span className="text-[8px] font-black uppercase tracking-widest">Chat</span>
        </a>
      </nav>
    </div>
  );
}
