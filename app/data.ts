// app/data.ts

// DATA KELAS EDUKASI BARU (Diskon 40%)
export const eduPackages = [
  {
    title: "Starter: Technical & Mindset",
    normalPrice: 150000,
    discountPrice: 65000,
    desc: "Pondasi wajib biar lu kaga murni tebak-tebakan. Kita bedah cara baca tren chart, mapping support/resist, dan setup money management biar kaga gampang cutloss dalam.",
    features: ["PDF Materi Basic", "PDF Pola Candlestick", "Kalkulator Money Management"]
  },
  {
    title: "Pro: Tape Reading & Bandarmologi",
    normalPrice: 300000,
    discountPrice: 180000,
    desc: "Daging banget buat scalper/copet. Bongkar cara baca orderbook, deteksi tembok palsu (fake bid/offer), dan ngikutin jejak ritme akumulasi bandar.",
    features: ["Live Case Study Orderbook", "Deteksi Pola Bandar", "Setup Fast Trade", "Akses Grup Diskusi Khusus"]
  },
  {
    title: "Master: Macro & Fundamental",
    normalPrice: 500000,
    discountPrice: 300000,
    desc: "Khusus buat lu yg mau main tenang pake modal gede. Kita belajar screening Laporan Keuangan, hitung valuasi saham, dan baca siklus rotasi sektor IHSG.",
    features: ["Template Excel Screening", "Teknik Valuasi Wajar", "Analisa Makro", "1x Private Mentoring Q&A"]
  }
];

// KONFIGURASI DONASI SERVER & INFO
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
