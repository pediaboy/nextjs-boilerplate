// app/data.ts

export const myPortfolio = [
  { code: "BBCA", name: "Bank Central Asia", lot: 450, avg: 5980, lastClose: 6125 },
  { code: "BBRI", name: "Bank Rakyat Indonesia", lot: 350, avg: 3039, lastClose: 3060 },
  { code: "BBNI", name: "Bank Negara Indonesia", lot: 400, avg: 3771, lastClose: 3800 },
  { code: "WBSA", name: "BSA Logistics", lot: 380, avg: 1160, lastClose: 1080 },
  { code: "HUMI", name: "Humpuss Maritim", lot: 1000, avg: 175.032, lastClose: 189 },
];

export const classSignals = [
  {
    code: "LCKM",
    desc: 'paling favorit buat besok gara" broker XA konsisten nampung di 112 pas sesi post trading tadi',
    entry: 112, antri: 108, sl: 98, tp: 125,
  },
  {
    code: "DEWA",
    desc: 'volume transaksinya gila"an hari ini tpi MG sm XC keliatan jagain harga di 440 pas akhir sesi',
    entry: 440, antri: 430, sl: 420, tp: 465,
  },
  {
    code: "GSMF",
    desc: "pola mantulnya udah mulai keliatan buat lanjutin kenaikan mumpung masih kuat nahan di atas 150",
    entry: 155, antri: 150, sl: 148, tp: 165,
  },
  {
    code: "HUMI",
    desc: "momentum mantul dari bawah masih kerasa bgt tujuannya jelas mau jemput area 200 lagi",
    entry: 185, antri: 180, sl: 175, tp: 205,
  },
  {
    code: "BNBR",
    desc: "volatilitasnya emang liar tpi cocok buat yg mau main cepet manfaatin pantulan abis dikocok hari ini",
    entry: 161, antri: 156, sl: 152, tp: 172,
  },
];

export const donationConfig = {
  title: "Donasi Server",
  description: "Agar website analisa ini tetap aktif dan bebas diakses oleh semua trader.",
  contactUrl: "https://wa.me/6282218723401",
  qrisUrl: "/qris.png", 
  disclaimer: {
    title: "Trading Berisiko Tinggi",
    content: "Seluruh informasi, analisa, dan signal pada website ini hanya untuk edukasi dan referensi umum. Trading forex, gold XAUUSD, crypto BTCUSD, dan instrumen keuangan lain memiliki risiko tinggi. Semua keputusan trading adalah tanggung jawab masing-masing pengguna. Tidak ada jaminan profit. Website ini tidak berafiliasi dengan broker manapun, tidak menjalankan IB, tidak menjual kelas, dan tidak menawarkan pengelolaan dana."
  }
};
