import {
  FaBrain,
  FaChartLine,
  FaChartPie,
  FaDatabase,
  FaGithub,
  FaLemon,
  FaMicrochip,
  FaPalette,
  FaPhp,
  FaPython,
  FaServer,
  FaTable,
} from "react-icons/fa6";

// =======================================================
// SEMUA ISI PORTOFOLIO ADA DI SINI.
// Mau ganti teks, proyek, atau sertifikat? Cukup edit file ini.
// =======================================================

export const profile = {
  name: "Bunga Rahmadani",
  firstName: "Bunga",
  roles: ["Data Scientist", "Data Analyst", "Data Engineer"],
  tagline:
    "I turn messy, raw data into clean datasets, clear insights, and predictive models that help people make better decisions.",
  // Ganti dengan foto kamu: taruh file di folder public, misal public/foto-profil.jpg
  // lalu isi photo: '/foto-profil.jpg'
  photo: "/projects/foto-profil.jpeg",
  cv: "/cv-bunga.pdf", // taruh CV di folder public dengan nama ini
  email: "bungarahmadani267@gmail.com",
  linkedin: "https://www.linkedin.com/in/bungarahmadani-ds",
  github: "https://github.com/bunga-sky",
  location: "Jambi, Indonesia",
};

export const about = [
  "Aku adalah mahasiswa Informatika di Universitas Negeri Padang yang memiliki minat besar di bidang Data Science dan Data Engineering.",
  "Aku menikmati seluruh proses pengolahan data: membersihkan dan menyiapkan data mentah, menganalisisnya dengan SQL dan Python, membuat dashboard yang membuat insight mudah dipahami, hingga mengembangkan model machine learning untuk menemukan pola dan memprediksi hasil.",
  "Bagiku, data yang baik adalah fondasi dari setiap keputusan yang cerdas. Saat ini aku terbuka untuk kesempatan magang dan posisi entry-level di bidang Data Science, Data Analytics, dan Data Engineering.",
];

export const projects = [
  {
    title: "Supermarket Sales Analysis & Profit Prediction",
    featured: true,
    image: "/projects/supermarket.jpg",
    description:
      "Analisis end-to-end terhadap 10.000+ transaksi supermarket di 10 kota di Indonesia (2014–2017). Membersihkan data, menjawab pertanyaan bisnis dengan SQL, membangun dashboard di Looker Studio, dan memprediksi keuntungan dengan Random Forest.",
    stats: [
      { value: 52, prefix: "+", suffix: "%", label: "sales growth" },
      { value: 417, label: "duplicates removed" },
      { value: 0.766, decimals: 3, label: "R² Random Forest" },
    ],
    tags: ["Google Sheets", "SQL", "Looker Studio", "Orange", "Random Forest"],
    github: "https://github.com/bunga-sky/supermarket-sales-analysis",
    demo: "https://datastudio.google.com/reporting/d468700f-54e9-4ed2-9754-85a3e787c4ca",
  },
  {
    title: "Iris EDA Analysis",
    description:
      "Analisis eksplorasi data pada dataset Iris untuk memahami sebaran fitur dan hubungan antar spesies bunga.",
    tags: ["Python", "Pandas", "Matplotlib"],
    github: "https://github.com/bunga-sky/iris-eda-analysis",
  },
  {
    title: "Parallel Computing with OpenMP",
    description:
      "Mempercepat komputasi berat dengan multithreading CPU menggunakan OpenMP, sebagai dasar untuk mengolah data besar dengan lebih cepat.",
    tags: ["C", "OpenMP"],
    github: "https://github.com/bunga-sky/modul2-openmp",
  },
  {
    title: "GPU Programming with CUDA",
    description:
      "Menjalankan komputasi paralel skala besar di GPU dengan CUDA, teknologi yang juga menjadi dasar machine learning modern.",
    tags: ["C", "CUDA", "GPU"],
    github: "https://github.com/bunga-sky/modul5-cuda",
  },
  {
    title: "Rental PS Web App",
    description:
      "Aplikasi web untuk mengelola penyewaan PlayStation, didukung basis data relasional MySQL untuk pemesanan dan transaksi.",
    tags: ["PHP", "MySQL"],
    github: "https://github.com/bunga-sky/Rental-PS",
  },
];

export const certificates = [
  {
    title: "Juara 2 Web Design Competition – GEMATIK Nasional 2025",
    issuer: "Universitas Teknokrat Indonesia",
    date: "Nov 2025",
    image: "/certificates/gematik.jpg",
    award: true,
  },
  {
    title: "Belajar Analisis Data untuk Pemula",
    date: "Sep 2026",
    image: "/certificates/analisis-data.jpg",
    url: "https://www.dicoding.com/certificates/N9ZO0O31YXG5",
  },
  {
    title: "Memulai Pemrograman dengan Python",
    date: "Sep 2026",
    image: "/certificates/python.jpg",
    url: "https://www.dicoding.com/certificates/NVP7W92J4ZR0",
  },
  {
    title: "Belajar Dasar Structured Query Language (SQL)",
    date: "Aug 2026",
    image: "/certificates/sql.jpg",
    url: "https://www.dicoding.com/certificates/72ZDMEGWLZYW",
  },
  {
    title: "Belajar Dasar Visualisasi Data",
    date: "Aug 2026",
    image: "/certificates/visualisasi-data.jpg",
    url: "https://www.dicoding.com/certificates/2VX3V2V4QPYQ",
  },
  {
    title: "Belajar Dasar Data Science",
    date: "Aug 2026",
    image: "/certificates/data-science.jpg",
    url: "https://www.dicoding.com/certificates/6RPNO81L4X2M",
  },
  {
    title: "Belajar Dasar Git dengan GitHub",
    date: "Aug 2026",
    image: "/certificates/git-github.jpg",
    url: "https://www.dicoding.com/certificates/NVP7WG644ZR0",
  },
  {
    title: "HCIA-AI V3.5 Course Certificate",
    issuer: "Huawei Talent Online",
    date: "Dec 2024",
    image: "/certificates/hcia-ai.jpg",
  },
];

// Ikon: react-icons (Simple Icons = logo brand, Font Awesome = ikon umum)
// Daftar ikon lengkap: https://react-icons.github.io/react-icons
export const techStack = [
  { name: "Python", icon: FaPython, color: "#FFD43B" },
  { name: "SQL", icon: FaDatabase, color: "#F29111" },
  { name: "Google Sheets", icon: FaTable, color: "#34A853" },
  { name: "Looker Studio", icon: FaChartPie, color: "#4285F4" },
  { name: "Orange", icon: FaLemon, color: "#FF9C1A" },
  { name: "Machine Learning", icon: FaBrain, color: "#E879F9" },
  { name: "MySQL", icon: FaServer, color: "#00A6D6" },
  { name: "PHP", icon: FaPhp, color: "#8993BE" },
  { name: "C / CUDA", icon: FaMicrochip, color: "#76B900" },
  { name: "Git & GitHub", icon: FaGithub, color: "#FFFFFF" },
  { name: "Canva", icon: FaPalette, color: "#00C4CC" },
  { name: "Data Visualization", icon: FaChartLine, color: "#F472B6" },
];

export const journey = [
  {
    date: "Aug 2026 – Present",
    title: "Data Science Specialist Cohort",
    place: "Asah led by Dicoding",
    text: "Program Studi Independen. Mempelajari analisis data, SQL, visualisasi data, dan machine learning melalui proyek langsung.",
  },
  {
    date: "Nov 2025",
    title: "2nd Place – Web Design Competition",
    place: "GEMATIK National 2025 · Universitas Teknokrat Indonesia",
    text: 'Meraih Juara 2 tingkat nasional dengan merancang website yang inovatif dan fungsional bertema "Empowering Youth in the Era of Disruption".',
  },
  {
    date: "Aug 2024 – Present",
    title: "Informatics Student",
    place: "Universitas Negeri Padang",
    text: "Mempelajari pemrograman, basis data, analisis data, dan komputasi paralel melalui perkuliahan dan proyek.",
  },
];
