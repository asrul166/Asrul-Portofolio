// Tambah / ubah proyek di sini.
// Field opsional (link, repo, year, role) hanya tampil kalau diisi.
export const projects = [
  {
    id: "erpnext-study-case",
    title: "ERPNext Study Case — CV. Bangunan Jaya Makmur",
    desc: "Full ERPNext/Frappe v16 setup on WSL for a fictional construction materials store. Accounting, HR, buying/selling, and CRM modules configured; project module in progress. Includes Bahasa Indonesia localization.",
    category: "ERP",
    tags: ["Frappe v16", "ERPNext", "WSL"],
    status: "in-progress",
    image: "/ERP.png",
    link: "",
    repo: "",
    year: "",
    role: "",
  },
  {
    id: "e-shopper",
    title: "E-Shopper",
    desc: "E-Shopper is a web-based e-commerce application that allows users to browse products, manage shopping carts, and enjoy a seamless online shopping experience.",
    category: "Web",
    tags: ["HTML", "CSS", "Javascript"],
    status: "done",
    image: "/E-Shopper.png",
    link: "",
    repo: "",
    year: "",
    role: "",
  },
  {
    id: "weather-app",
    title: "WeatherApp",
    desc: "A real-time weather application that provides current weather conditions worldwide using the OpenWeather API.",
    category: "Mobile",
    tags: ["Flutter", "Dart", "Firebase"],
    status: "done",
    image: "",
    link: "",
    repo: "",
    year: "",
    role: "",
  },
  {
    id: "solvexa-content",
    title: "SolvexaERP Content Pipeline",
    desc: "Instagram content and Reels for SolvexaERP — including a local Whisper AI setup for subtitle generation, feeding into a CapCut editing workflow.",
    category: "Content",
    tags: ["CapCut", "Whisper AI", "Content", "Canva", "Adobe Photoshop", "Instagram"],
    status: "ongoing",
    image: "",
    link: "",
    repo: "",
    year: "",
    role: "",
  },
  {
    id: "autocomm",
    title: "AutoComm",
    desc: "AutoComm is a commission management application that simplifies commission calculations, tracks sales performance, and generates printable reports for businesses.",
    category: "Web",
    tags: ["ReactJS", "Tailwind CSS", "NodeJS", "PostgreSQL", "TypeScript"],
    status: "done",
    image: "/AutoCommm.png",
    link: "",
    repo: "",
    year: "",
    role: "",
  },
  {
    id: "simks",
    title: "SiMKS",
    desc: "SiMKS is a web-based cooperation agreement management system that streamlines document management, monitors agreement statuses, and provides automated expiration reminders and reporting.",
    category: "Web",
    tags: ["ReactJS", "Tailwind CSS", "NodeJS", "Express", "PostgreSQL", "TypeScript"],
    status: "in-progress",
    image: "",
    link: "",
    repo: "",
    year: "",
    role: "",
  },
];

// urutan tab filter
export const categories = ["All", "Web", "Mobile", "ERP", "Content"];

export const statusStyles = {
  done: "bg-sticker-green",
  "in-progress": "bg-sticker-yellow",
  ongoing: "bg-sticker-orange",
};

export const coverTones = [
  "bg-sticker-blue",
  "bg-sticker-pink",
  "bg-sticker-green",
  "bg-sticker-yellow",
  "bg-sticker-orange",
];
