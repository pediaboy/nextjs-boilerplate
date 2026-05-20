// app/data.ts

export const scalpingSignals = [
  { code: "LCKM", entry: "140", antri: "136", sl: "134", tp: "155" },
  { code: "BUMI", entry: "170", antri: "167", sl: "163", tp: "180" },
  { code: "BNBR", entry: "146", antri: "142", sl: "139", tp: "155" },
  { code: "CDIA", entry: "750", antri: "700", sl: "670", tp: "820" },
  { code: "KOTA", entry: "136", antri: "132", sl: "128", tp: "145" },
  { code: "MDIA", entry: "125", antri: "120", sl: "116", tp: "135" },
  { code: "PACK", entry: "300", antri: "290", sl: "280", tp: "340" },
  { code: "KSIX", entry: "330", antri: "324", sl: "318", tp: "350" },
  { code: "FUTR", entry: "206", antri: "200", sl: "195", tp: "220" },
  { code: "DEWA", entry: "370", antri: "360", sl: "350", tp: "390" },
  { code: "CARE", entry: "408", antri: "400", sl: "395", tp: "420" },
  { code: "PRIM", entry: "87", antri: "85", sl: "83", tp: "92" },
  { code: "SAME", entry: "326", antri: "-", sl: "-", tp: "-" },
  { code: "ASPR", entry: "380", antri: "370", sl: "350", tp: "420" }
];

export const swingSignals = [
  { code: "BRPT", entry: "1670", antri: "1650", sl: "1620", tp: "1750" },
  { code: "PTRO", entry: "3900", antri: "3800", sl: "3700", tp: "4200" },
  { code: "HEAL", entry: "980", antri: "960", sl: "940", tp: "1010" },
  { code: "SILO", entry: "2380", antri: "2350", sl: "2300", tp: "2450" },
  { code: "MIKA", entry: "1600", antri: "1580", sl: "1550", tp: "1680" }
];

// KONFIGURASI DONASI SERVER
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
