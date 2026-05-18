export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden font-sans pb-24 selection:bg-white/20">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-5 pt-12 relative z-10">
        
        {/* Header / Profile */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              THIRAFI THARIQ AL IDRIS
            </h1>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Realtime Market Portofolio
            </p>
          </div>
          
          {/* Contact Badge */}
          <a href="https://wa.me/6282218723401" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md hover:bg-white/10 transition w-fit">
            <span className="text-sm">📞</span>
            <span className="text-sm font-medium tracking-wide">082218723401</span>
          </a>
        </header>

        {/* Bento Grid Layout - Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Total Portofolio */}
          <div className="bg-[#111113]/80 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px]"></div>
            <p className="text-sm text-gray-400 mb-1">Total Portofolio</p>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Rp 95.080.500</h2>
            
            <div className="flex items-center gap-3">
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                📉 -Rp 6.245.900
              </div>
              <p className="text-xs text-gray-500">Floating P/L (-6.16%)</p>
            </div>
          </div>

          {/* Card 2: Info Modal */}
          <div className="bg-[#111113]/80 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col justify-center">
            <p className="text-sm text-gray-400 mb-1">Nilai Investasi Awal</p>
            <h3 className="text-2xl font-semibold mb-2">Rp 101.326.400</h3>
            <div className="mt-auto border-t border-white/5 pt-4">
              <p className="text-xs text-gray-500">Tersebar di 4 emiten saham (WBSA, HUMI, BBRI, BBCA)</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-10 mb-4 tracking-tight text-gray-200">Rincian Emiten</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card Emiten: BBCA */}
          <div className="bg-[#111113]/80 border border-white/10 rounded-[2rem] p-5 backdrop-blur-md transition hover:bg-white/5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-gray-300">
                  BC
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-none">BBCA</h4>
                  <p className="text-xs text-gray-400 mt-1">Bank Central Asia</p>
                </div>
              </div>
              <div className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                +5.25%
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-3 mt-4 p-4 bg-black/40 rounded-2xl border border-white/5">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Lot / Avg</p>
                <p className="font-medium text-sm">50 <span className="text-gray-500 text-xs font-normal">@9.200</span></p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Harga Aktif</p>
                <p className="font-medium text-sm">Rp 9.675</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Stock Value</p>
                <p className="font-medium text-sm">Rp 48.375.000</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Unrealized P/L</p>
                <p className="font-medium text-sm text-green-400">+Rp 2.375.000</p>
              </div>
            </div>
          </div>

          {/* Card Emiten: BBRI */}
          <div className="bg-[#111113]/80 border border-white/10 rounded-[2rem] p-5 backdrop-blur-md transition hover:bg-white/5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-gray-300">
                  BR
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-none">BBRI</h4>
                  <p className="text-xs text-gray-400 mt-1">Bank Rakyat Indonesia</p>
                </div>
              </div>
              <div className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                -3.40%
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-3 mt-4 p-4 bg-black/40 rounded-2xl border border-white/5">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Lot / Avg</p>
                <p className="font-medium text-sm">80 <span className="text-gray-500 text-xs font-normal">@4.950</span></p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Harga Aktif</p>
                <p className="font-medium text-sm">Rp 4.780</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Stock Value</p>
                <p className="font-medium text-sm">Rp 38.240.000</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Unrealized P/L</p>
                <p className="font-medium text-sm text-red-400">-Rp 1.360.000</p>
              </div>
            </div>
          </div>

          {/* Card Emiten: HUMI */}
          <div className="bg-[#111113]/80 border border-white/10 rounded-[2rem] p-5 backdrop-blur-md transition hover:bg-white/5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-gray-300">
                  HM
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-none">HUMI</h4>
                  <p className="text-xs text-gray-400 mt-1">Humpuss Maritim Int.</p>
                </div>
              </div>
              <div className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                -12.50%
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-3 mt-4 p-4 bg-black/40 rounded-2xl border border-white/5">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Lot / Avg</p>
                <p className="font-medium text-sm">1000 <span className="text-gray-500 text-xs font-normal">@80</span></p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Harga Aktif</p>
                <p className="font-medium text-sm">Rp 70</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Stock Value</p>
                <p className="font-medium text-sm">Rp 7.000.000</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Unrealized P/L</p>
                <p className="font-medium text-sm text-red-400">-Rp 1.000.000</p>
              </div>
            </div>
          </div>

          {/* Card Emiten: WBSA */}
          <div className="bg-[#111113]/80 border border-white/10 rounded-[2rem] p-5 backdrop-blur-md transition hover:bg-white/5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-gray-300">
                  WB
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-none">WBSA</h4>
                  <p className="text-xs text-gray-400 mt-1">Warna Bintang Kreasi</p>
                </div>
              </div>
              <div className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                +25.00%
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-3 mt-4 p-4 bg-black/40 rounded-2xl border border-white/5">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Lot / Avg</p>
                <p className="font-medium text-sm">100 <span className="text-gray-500 text-xs font-normal">@117</span></p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Harga Aktif</p>
                <p className="font-medium text-sm">Rp 146</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Stock Value</p>
                <p className="font-medium text-sm">Rp 1.465.000</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">Unrealized P/L</p>
                <p className="font-medium text-sm text-green-400">+Rp 290.000</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
