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
    desc: 'Broker XA konsisten nampung di 112.',
    entry: 112, antri: 108, sl: 98, tp: 125,
  },
  {
    code: "DEWA",
    desc: 'MG sm XC jagain harga di 440.',
    entry: 440, antri: 430, sl: 420, tp: 465,
  },
  {
    code: "GSMF",
    desc: "Kuat nahan di atas 150.",
    entry: 155, antri: 150, sl: 148, tp: 165,
  },
  {
    code: "HUMI",
    desc: "Mau jemput area 200 lagi.",
    entry: 185, antri: 180, sl: 175, tp: 205,
  },
  {
    code: "BNBR",
    desc: "Manfaatin pantulan abis dikocok.",
    entry: 161, antri: 156, sl: 152, tp: 172,
  },
];
