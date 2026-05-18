export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white p-4 font-sans pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <h1 className="text-xl font-bold">Ringkasan Portfolio</h1>
        <span className="text-2xl">📊</span>
      </div>

      {/* Card Summary */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm mb-4 border border-gray-100 dark:border-slate-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">Nilai Investasi Awal</p>
        <p className="text-2xl font-bold mt-1">Rp 101.326.400</p>
        <p className="text-xs mt-1 text-gray-400">Modal awal</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm mb-4 border border-gray-100 dark:border-slate-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">Nilai Portofolio Saat Ini</p>
        <p className="text-2xl font-bold mt-1">Rp 95.080.500</p>
        <p className="text-xs mt-1 text-gray-400">11 saham</p>
      </div>

      <div className="bg-red-500 p-4 rounded-xl shadow-sm mb-6 text-white">
        <p className="text-sm opacity-90">Floating Loss</p>
        <p className="text-2xl font-bold mt-1">-Rp 6.245.900</p>
        <p className="text-xs mt-1">-6.16%</p>
      </div>

      <hr className="border-gray-200 dark:border-slate-700 mb-6" />

      {/* Rincian per Emiten */}
      <div>
        <h2 className="text-xl font-bold mb-4">Portofolio Anda</h2>
        
        {/* Card Saham PGAS */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm mb-4 border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-bold text-lg">PGAS</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">PGN Tbk.</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">
              +18.39%
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Lot</p>
              <p className="font-semibold">160</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Harga Rata-rata</p>
              <p className="font-semibold">Rp 1.419</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Harga Sekarang</p>
              <p className="font-semibold">Rp 1.680</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Stock Value</p>
              <p className="font-semibold">Rp 22.705.000</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
            <p className="text-sm font-semibold">Untung/Rugi</p>
            <p className="text-sm font-bold text-green-600 dark:text-green-400">+Rp 4.175.000</p>
          </div>
        </div>

        {/* Card Saham TLKM */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm mb-4 border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-bold text-lg">TLKM</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Telkom Indonesia</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded text-xs font-bold">
              -26.00%
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Lot</p>
              <p className="font-semibold">100</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Harga Rata-rata</p>
              <p className="font-semibold">Rp 4.000</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Harga Sekarang</p>
              <p className="font-semibold">Rp 2.960</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Stock Value</p>
              <p className="font-semibold">Rp 29.600.000</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
            <p className="text-sm font-semibold">Untung/Rugi</p>
            <p className="text-sm font-bold text-red-600 dark:text-red-400">-Rp 10.400.000</p>
          </div>
        </div>

      </div>
    </div>
  )
}
