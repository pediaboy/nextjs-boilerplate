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

// DATA SINYAL / WATCHLIST KELAS LU
const classSignals = [
  {
    code: "LCKM",
    desc: 'Paling favorit buat besok gara" broker XA konsisten nampung di 112 pas sesi post trading tadi.',
    entry: 112,
    antri: 108,
    sl: 98,
    tp: 125,
  },
  {
    code: "DEWA",
    desc: 'Volume transaksinya gila"an hari ini tpi MG sm XC keliatan jagain harga di 440 pas akhir sesi.',
    entry: 440,
    antri: 430,
    sl: 420,
    tp: 465,
  },
  {
    code: "GSMF",
    desc: "Pola mantulnya udah mulai keliatan buat lanjutin kenaikan mumpung masih kuat nahan di atas 150.",
    entry: 155,
    antri: 150,
    sl: 148,
    tp: 165,
  },
  {
    code: "HUMI",
    desc: "Momentum mantul dari bawah masih kerasa bgt tujuannya jelas mau jemput area 200 lagi.",
    entry: 185,
    antri: 180,
    sl: 175,
    tp: 205,
  },
  {
    code: "BNBR",
    desc: "Volatilitasnya emang liar tpi cocok buat yg mau main cepet manfaatin pantulan abis dikocok hari ini.",
    entry: 161,
    antri: 156,
    sl: 152,
    tp: 172,
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
      if (!response.ok) throw new Error("Proxy Blocked");

      const data = await response.json();
      const newPrices: Record<string, number> = {};

      if (data.quoteResponse && data.quoteResponse.result) {
        data.quoteResponse.result.forEach((stock: any) => {
          const code = stock.symbol.replace(".JK", "");
          if (stock.regularMarketPrice)
            newPrices[code] = stock.regularMarketPrice;
        });
      }

      setPrices(newPrices);
      const now = new Date();
      setLastUpdate(now.toLocaleTimeString("id-ID") + " WIB");
    } catch (error) {
      setLastUpdate("Offline");
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
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(angka);
  };

  let totalModal = 0;
  let totalValue = 0;

  myPortfolio.forEach((stock) => {
    const lembar = stock.lot * 100;
    totalModal += lembar * stock.avg;
    totalValue += lembar * (prices[stock.code] || stock.avg);
  });

  const floatingPL = totalValue - totalModal;
  const isProfitTotal = floatingPL >= 0;

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 font-sans pb-24 selection:bg-blue-500/30">
      {/* HEADER PROFESSIONAL */}
      <header className="px-5 py-4 border-b border-gray-800 bg-[#121212]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white font-bold text-lg tracking-wide">
              THIRAFI THARIQ AL IDRIS
            </h1>
            <p className="text-xs text-gray-500 mt-0.5 font-medium uppercase tracking-wider">
              {activeTab === "home" ? "Portofolio Aktif" : "Sinyal & Watchlist"}
            </p>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  loading ? "bg-yellow-500" : "bg-emerald-500 animate-pulse"
                }`}
              ></span>
              <span className="text-xs font-semibold text-gray-300">
                {lastUpdate}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-xl mx-auto">
        {/* =========================================
            HALAMAN 1: HOME (MARKET & PORTFOLIO)
           ========================================= */}
        {activeTab === "home" && (
          <div className="animate-fade-in">
            {/* TRADINGVIEW WIDGET */}
            <div className="mb-6 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
              <div className="bg-[#1a1a1a] px-4 py-2 border-b border-gray-800 flex items-center gap-2">
                <span className="text-xs">📊</span>
                <span className="text-[11px] font-bold text-gray-300 tracking-wider">
                  MARKET CHART (IHSG)
                </span>
              </div>
              <iframe
                src="https://s.tradingview.com/widgetembed/?symbol=IDX:COMPOSITE&interval=D&theme=dark&hidesidetoolbar=1"
                width="100%"
                height="220"
                frameBorder="0"
                className="pointer-events-auto"
              ></iframe>
            </div>

            {/* RINGKASAN PORTOFOLIO */}
            <div className="mb-6 bg-gradient-to-br from-[#1a1a1a] to-[#121212] border border-gray-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
              <p className="text-xs text-gray-400 font-medium tracking-wide mb-1">
                Total Portofolio
              </p>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
                Rp {formatRp(totalValue)}
              </h2>

              <div className="flex items-center gap-3 border-t border-gray-800 pt-3 mt-2">
                <div
                  className={`px-3 py-1.5 rounded-md text-xs font-bold ${
                    isProfitTotal
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {isProfitTotal ? "+" : ""}Rp {formatRp(floatingPL)}
                </div>
                <p className="text-xs text-gray-500">
                  Modal: Rp {formatRp(totalModal)}
                </p>
              </div>
            </div>

            {/* GRID ASET SAHAM */}
            <h3 className="text-sm font-bold text-gray-300 mb-3 ml-1 tracking-wide">
              Rincian Emiten
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {myPortfolio.map((stock) => {
                const lembar = stock.lot * 100;
                const modal = lembar * stock.avg;
                const hargaAktif = prices[stock.code] || stock.avg;
                const pl = lembar * hargaAktif - modal;
                const plPercent = modal > 0 ? (pl / modal) * 100 : 0;
                const isProfit = pl >= 0;

                return (
                  <div
                    key={stock.code}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 flex flex-col justify-between transition-all hover:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center font-bold text-xs text-gray-300">
                          {stock.code.substring(0, 2)}
                        </div>
                        <span className="text-sm font-bold text-white">
                          {stock.code}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-1 rounded bg-gray-800 text-gray-300">
                        {stock.lot} LOT
                      </span>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      <div>
                        <p className="text-[10px] text-gray-500 mb-0.5">
                          Avg: {formatRp(stock.avg)}
                        </p>
                        <h2 className="text-base font-bold text-white">
                          {formatRp(hargaAktif)}
                        </h2>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-xs font-bold ${
                            isProfit ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {isProfit ? "+" : ""}
                          {plPercent.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================
            HALAMAN 2: KELAS (WATCHLIST / SINYAL)
           ========================================= */}
        {activeTab === "kelas" && (
          <div className="animate-fade-in space-y-4">
            
            {classSignals.map((signal, idx) => (
              <div key={idx} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-white tracking-wide">{signal.code}</h3>
                  <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-1 rounded border border-blue-500/20">
                    TRADING PLAN
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {signal.desc}
                </p>
                
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-[#121212] border border-gray-800 rounded-lg p-2 text-center">
                    <p className="text-[9px] text-gray-500 font-semibold mb-1">ENTRY</p>
                    <p className="text-sm font-bold text-white">{signal.entry}</p>
                  </div>
                  <div className="bg-[#121212] border border-gray-800 rounded-lg p-2 text-center">
                    <p className="text-[9px] text-gray-500 font-semibold mb-1">ANTRI</p>
                    <p className="text-sm font-bold text-gray-300">{signal.antri}</p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-2 text-center">
                    <p className="text-[9px] text-red-500 font-semibold mb-1">SL</p>
                    <p className="text-sm font-bold text-red-400">{signal.sl}</p>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2 text-center">
                    <p className="text-[9px] text-emerald-500 font-semibold mb-1">TP</p>
                    <p className="text-sm font-bold text-emerald-400">{signal.tp}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* DISCLAIMER BOX */}
            <div className="mt-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 text-center">
              <span className="text-xl mb-2 block">⚠️</span>
              <p className="text-xs text-yellow-500/80 font-medium leading-relaxed">
                <strong className="text-yellow-500">SELALU DI INGAT:</strong><br/>
                Postingan ini bukan ajakan, sesuaikan sama money management masing-masing.
              </p>
            </div>

          </div>
        )}
      </main>

      {/* =========================================
          BOTTOM NAVIGATION BAR
         ========================================= */}
      <nav className="fixed bottom-0 w-full bg-[#121212] border-t border-gray-800 py-3 px-6 flex justify-around items-center z-50">
        
        {/* Tombol Portofolio */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === "home" ? "text-white" : "text-gray-600 hover:text-gray-400"
          }`}
        >
          <span className="text-xl">💼</span>
          <span className="text-[9px] font-bold tracking-wider">Portofolio</span>
        </button>

        {/* Tombol Trading Plan / Kelas */}
        <button
          onClick={() => setActiveTab("kelas")}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === "kelas" ? "text-white" : "text-gray-600 hover:text-gray-400"
          }`}
        >
          <span className="text-xl">🎯</span>
          <span className="text-[9px] font-bold tracking-wider">Plan & Sinyal</span>
        </button>

        {/* Tombol Contact */}
        <a
          href="https://wa.me/6282218723401"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-400 transition-all"
        >
          <span className="text-xl">💬</span>
          <span className="text-[9px] font-bold tracking-wider">Contact</span>
        </a>
      </nav>
    </div>
  );
}
