// app/data.ts

export const mappingIntro = "Banyak yg nanya mappingan buat senin besok. Market closing jumat kemaren emang ngasih napas panjang, duit gajah keliatan mulai masuk lagi di beberapa barang. Dari pantauan gua, ini 6 barang yg orderbook sm chart teknikalnya paling menarik buat dipantau. Karakternya beda-beda, ada yg momentum ngegas, ada yg main pantulan tembok.\n\nInget, main gorengan kyk gini murni disiplin eksekusi. Kaga usah baper nahan barang. Dan porsi duit invest jangka panjang lu yg di bluechip jgn lu utak-atik buat nambahin peluru ginian. Atur MM lu.";

export const mondaySignals = [
  { code: "BUMI", entry: "185", antri: "181-183", sl: "< 178", tp: "190-195", desc: "Ngeri ini barang, breakout sukses dari resist 172 yg kita bahas kemaren. Volume gajah beneran masuk. Liat orderbooknya, total bid 3 juta lot ngelawan offer yg cuma 1 juta. Bandar masang tembok tebel di 183 buat nahan support. Momentumnya lagi kenceng banget, manfaatin buat numpang narik kenceng." },
  { code: "BUVA", entry: "725", antri: "710-715", sl: "< 700", tp: "735-745", desc: "Pelan-pelan merangkak naik ngetes resist 730. Dari orderbook keliatan lebih imbang dan agak tipis dibanding BUMI. Ini geraknya rawan gocek bandar, cocok buat tektokan range sempit aja kaga usah di-hold lama-lama." },
  { code: "PACK", entry: "Skip Hajar Kanan", antri: "274-276", sl: "< 270", tp: "284-288", desc: "Chartnya emang lagi nyungsep nurun, tpi lu pelototin orderbooknya. Ada bid wall raksasa ratusan ribu lot di harga 272. Ini murni bandar lagi masang barikade jaring pengaman biar harganya kaga makin ambyar nyari lantai baru. Kita main copet mantulan aja manfaatin tembok ini." },
  { code: "BIPI", entry: "185", antri: "180-183", sl: "< 177", tp: "190-195", desc: "Geraknya seirama mirip BUMI, wajar satu sektor lagi ditarik barengan. Chartnya breakout cakep ke 184. Liat bid wall nya, ditebelin di area 180 sampe 183. Offer atasnya kaga terlalu tebel, gampang dijebol kalo sentimen komoditas masih narik hari ini." },
  { code: "DFAM", entry: "141-142", antri: "139-140", sl: "< 138", tp: "145-146", desc: "Gila ini barang, narik ampir 30% cuy. Dari orderbook keliatan jelas bandar masang barikade bid ratusan ribu lot di harga 140 buat nahan biar kaga rontok. Tpi lu kudu pelototin juga itu jemuran offer raksasa di 147 (ini kemungkinan area ara atau resist mentoknya). Momentumnya emang masih on fire, tpi ruang naiknya sisa dikit sbelum nabrak tembok atas. Main cepet aja cuan bungkus." },
  { code: "DEWA", entry: "Nunggu Jemputan", antri: "372-374", sl: "< 370", tp: "382-386", desc: "Nah ini chart rawan gocek. Lu liat dia sempet dipompa ngegas ke 398 tpi ujung-ujungnya dibanting turun ninggalin ekor panjang bentuk jarum di atas. Itu artinya banyak yg take profit atau malah jualan distribusi di pucuk. Dari orderbook, bandar lagi masang jaring pengaman di 372 sm 374. Jgn fomo hajar kanan, rawan dapet sisa guyuran pucuk. Mending sabar nunggu jemputan di area support." }
];

// DATA KELAS EDUKASI BARU (Diskon 40%)
export const eduPackages = [
  {
    title: "Starter: Technical & Mindset",
    normalPrice: 150000,
    discountPrice: 90000, // Diskon 40%
    desc: "Pondasi wajib biar lu kaga murni tebak-tebakan. Kita bedah cara baca tren chart, mapping support/resist, dan setup money management biar kaga gampang cutloss dalam.",
    features: ["Video Materi Basic", "PDF Pola Candlestick", "Kalkulator Money Management"]
  },
  {
    title: "Pro: Tape Reading & Bandarmologi",
    normalPrice: 300000,
    discountPrice: 180000, // Diskon 40%
    desc: "Daging banget buat scalper/copet. Bongkar cara baca orderbook, deteksi tembok palsu (fake bid/offer), dan ngikutin jejak ritme akumulasi bandar.",
    features: ["Live Case Study Orderbook", "Deteksi Pola Bandar", "Setup Fast Trade", "Akses Grup Diskusi Khusus"]
  },
  {
    title: "Master: Macro & Fundamental",
    normalPrice: 500000,
    discountPrice: 300000, // Diskon 40%
    desc: "Khusus buat lu yg mau main tenang pake modal gede. Kita belajar screening Laporan Keuangan, hitung valuasi saham, dan baca siklus rotasi sektor IHSG.",
    features: ["Template Excel Screening", "Teknik Valuasi Wajar", "Analisa Makro", "1x Private Mentoring Q&A"]
  }
];

export const donationConfig = {
  title: "Support Admin🚀",
  description: "Agar website analisa ini tetap aktif dan bebas diakses oleh semua trader.",
  contactUrl: "https://wa.me/6282218723401",
  qrisUrl: "/qris.png", 
  disclaimer: {
    title: "Trading Berisiko Tinggi",
    content: "Seluruh informasi, analisa, dan signal pada website ini hanya untuk edukasi dan referensi umum. Trading forex, gold XAUUSD, crypto BTCUSD, dan instrumen keuangan lain memiliki risiko tinggi. Semua keputusan trading adalah tanggung jawab masing-masing pengguna. Tidak ada jaminan profit. Website ini tidak berafiliasi dengan broker manapun, tidak menjalankan IB, tidak menjual kelas, dan tidak menawarkan pengelolaan dana."
  }
};
