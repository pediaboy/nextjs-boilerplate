"use client";

import { useState, useEffect } from "react";

// TINGGAL UBAH DATA DI SINI KALO MAU UPDATE LOT / HARGA BELI
const myPortfolio = [
  { code: "BBCA", name: "Bank Central Asia", lot: 50, avg: 9200 },
  { code: "BBRI", name: "Bank Rakyat Indonesia", lot: 80, avg: 4950 },
  { code: "HUMI", name: "Humpuss Maritim Int.", lot: 1000, avg: 80 },
  { code: "WBSA", name: "Warna Bintang Kreasi", lot: 100, avg: 117 },
];

export default function Home() {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");

  const fetchPrices = async () => {
    try {
      // Bikin list saham format Yahoo (tambahin .JK buat bursa Indo)
      const symbols = myPortfolio.map((p) => `${p.code}.JK`).join(",");
      const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
      
      // Pake proxy biar gak kena block CORS di browser
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      const newPrices: Record<string, number> = {};
      data.quoteResponse.result.forEach((stock: any) => {
        const code = stock.symbol.replace(".JK", "");
        newPrices[code] = stock.regularMarketPrice;
      });

      setPrices(newPrices);
      setLastUpdate(new Date().toLocaleTimeString("id-ID"));
      setLoading(false);
    } catch (error) {
      console.error("Gagal narik data saham:", error);
    }
  };

  // Narik data otomatis pertama kali web dibuka & refresh tiap 60 detik
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Format Rupiah
  const formatRp = (angka: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
  };

  // Kalkulasi Modal & Total Value
  let totalModal = 0;
  let totalValue = 0;

  myPortfolio.forEach((stock) => {
    const lembar = stock.lot * 100;
    const modalEmiten = lembar * stock.avg;
    const hargaAktif = prices[stock.code] || stock.avg; // Kalo API error, pake harga avg sementara
    const valueEmiten = lembar * hargaAktif;
    
    totalModal += modalEmiten;
    totalValue += valueEmiten;
  });

  const floatingPL = totalValue - totalModal;
  const floatingPLPercent = (floatingPL / totalModal) * 100;
  const isProfitTotal = floatingPL >= 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden font-sans pb-24 selection:bg-white/20">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-5 pt-12 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              THIRAFI THARIQ AL IDRIS
            </h1>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${loading ? "bg-yellow-500" : "bg-green-500 animate-pulse"}`}></span>
              {loading ? "Menghubungkan ke Market..." : `Live Market • Update: ${lastUpdate}`}
            </p>
          </div>
          
          <a href="https://wa.me/6282218723401" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md hover:bg-white/10 transition w-fit">
            <span className="text-sm">📞</span>
            <span className="text-sm font-medium tracking-wide">082218723401</span>
          </a>
        </header>

        {/* Card Ringkasan Total */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111113]/80 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] ${isProfitTotal ? 'bg-green-500/10' : 'bg-red-500/10'}`}></div>
            <p className="text-sm text-gray-400 mb-1">Total Portofolio</p>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">{formatRp(totalValue)}</h2>
            
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 border ${isProfitTotal ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {isProfitTotal ? '📈' : '📉'} {formatRp(floatingPL)}
              </div>
              <p className="text-xs text-gray-500">Floating P/L ({floatingPLPercent.toFixed(2)}%)</p>
            </div>
          </div>

          <div className="bg-[#111113]/80 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col justify-center">
            <p className="text-sm text-gray-400 mb-1">Nilai Investasi Awal</p>
            <h3 className="text-2xl font-semibold mb-2">{formatRp(totalModal)}</h3>
            <div className="mt-auto border-t border-white/5 pt-4">
              <p className="text-xs text-gray-500">Tersebar di {myPortfolio.length} emiten saham</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-10 mb-4 tracking-tight text-gray-200">Rincian Emiten</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myPortfolio.map((stock) => {
            const lembar = stock.lot * 100;
            const modal = lembar * stock.avg;
            const hargaAktif = prices[stock.code] || stock.avg;
            const value = lembar * hargaAktif;
            const pl = value - modal;
            const plPercent = (pl / modal) * 100;
            const isProfit = pl >= 0;

            return (
              <div key={stock.code} className="bg-[#111113]/80 border border-white/10 rounded-[2rem] p-5 backdrop-blur-md transition hover:bg-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-gray-300">
                      {stock.code.substring(0,2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-none">{stock.code}</h4>
                      <p className="text-xs text-gray-400 mt-1">{stock.name}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${isProfit ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]'}`}>
                    {isProfit ? '+' : ''}{plPercent.toFixed(2)}%
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-3 mt-4 p-4 bg-black/40 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Lot / Avg</p>
                    <p className="font-medium text-sm">{stock.lot} <span className="text-gray-500 text-xs font-normal">@{stock.avg}</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Harga Aktif</p>
                    <p className="font-medium text-sm">{loading ? "..." : formatRp(hargaAktif)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Stock Value</p>
                    <p className="font-medium text-sm">{loading ? "..." : formatRp(value)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Unrealized P/L</p>
                    <p className={`font-medium text-sm ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                      {isProfit ? '+' : ''}{loading ? "..." : formatRp(pl)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
