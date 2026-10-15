# Website Kantor Hukum Sugiyono, SE., SH., MH & Rekan

Kerangka frontend website company profile untuk **Kantor Hukum Sugiyono, SE., SH., MH & Rekan** (Semarang).

Dibangun menggunakan arsitektur **Data-Driven & Static Export** dengan Next.js App Router, TypeScript, dan Tailwind CSS, dirancang khusus untuk deployment ke hosting cPanel (`public_html`) tanpa memerlukan runtime Node.js di server produksi.

---

## 1. Prinsip: "Kerangka Dulu, Isi Menunggu Persetujuan"

Seluruh informasi spesifik firma (profil, bidang praktik, tim, kontak, alamat, izin) **belum disetujui klien** dan sengaja dikosongkan. Sistem dirancang agar:
- Semua komponen bersifat **data-driven** dan **tersembunyi secara otomatis** jika data kosong.
- Tidak ada teks promosi atau klaim karangan.
- Mengisi konten cukup dengan menambahkan file di `content/` dan mengisi `site.config.ts` tanpa perlu menyentuh kode antarmuka.

### Perilaku Saat Data Kosong

| Kondisi | Mode Produksi (`npm run build`) | Mode Dev (`NEXT_PUBLIC_SHOW_SLOTS=true`) |
|---|---|---|
| `whatsappNumber` kosong | Floating WhatsApp, bar mobile, dan form kontak tidak dirender | Tampil slot outline berlabel |
| `phone`/`email`/`address` kosong | Elemen kontak terkait tidak dirender | Tampil slot outline berlabel |
| `content/team/` kosong | Route `/tim` tidak menampilkan anggota; sitemap mengecualikannya | Tampil slot outline `SLOT: Daftar Tim` |
| `content/practice-areas/` kosong | Route `/area-praktik` tidak menampilkan kartu; sitemap mengecualikannya | Tampil slot outline `SLOT: Daftar Area Praktik` |
| Section beranda kosong | Section tidak dirender (tanpa wrapper kosong) | Tampil slot outline berlabel |
| JSON-LD Schema | Script tag JSON-LD tidak dirender | Tidak dirender |

---

## 2. Cara Menjalankan Proyek

### Mode Pengembangan (Dev Mode)

```bash
# Install dependensi
npm install

# Jalankan dev server biasa
npm run dev

# Jalankan dev server dengan SLOT OUTLINE aktif (untuk meninjau tata letak)
# Di Linux/macOS:
NEXT_PUBLIC_SHOW_SLOTS=true npm run dev
# Di Windows PowerShell:
$env:NEXT_PUBLIC_SHOW_SLOTS="true"; npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Typecheck & Build Produksi

```bash
# Typecheck
npx tsc --noEmit

# Lint
npm run lint

# Build Static Export (hasilnya di folder `out/`)
npm run build
```

---

## 3. Cara Mengisi Konten & Konfigurasi

### A. Pengaturan Situs & Kontak (`site.config.ts`)

Buka `site.config.ts` di root proyek, isi field sesuai konfirmasi klien:

```typescript
export const siteConfig: SiteConfig = SiteConfigSchema.parse({
  name: "Kantor Hukum Sugiyono, SE., SH., MH & Rekan",
  shortName: "Kantor Hukum Sugiyono",
  tagline: "Layanan Bantuan & Konsultasi Hukum Profesional",
  address: "Jl. Contoh Alamat No. 123, Semarang",
  mapsEmbedUrl: "https://www.google.com/maps/embed?...",
  mapsLink: "https://maps.google.com/?q=...",
  phone: "024-xxxxxxx",
  whatsappNumber: "6281234567890", // format internasional tanpa tanda +
  whatsappDefaultMessage: "Halo, saya ingin berkonsultasi mengenai masalah hukum.",
  email: "kontak@kantorhukumsugiyono.com",
  openingHours: {
    days: "Senin - Jumat",
    hours: "09:00 - 17:00 WIB",
  },
  social: {
    instagram: "https://instagram.com/...",
    linkedin: "https://linkedin.com/company/...",
  },
  legal: {
    privacyPublished: false, // ubah true setelah teks privasi disetujui legal
    disclaimerPublished: false,
    credentials: ["PERADI"],
  },
});
```

*Begitu `whatsappNumber` diisi, tombol Floating WhatsApp, Mobile Bottom Bar, dan Form Kontak otomatis aktif.*

### B. Menambah Anggota Tim (`content/team/`)

Buat file JSON baru di `content/team/`, misalnya `content/team/sugiyono.json`.
Format lengkap tersedia di [`content/team/README.md`](./content/team/README.md). Halaman `/tim/sugiyono` otomatis dibuat saat build.

### C. Menambah Area Praktik (`content/practice-areas/`)

Buat file JSON baru di `content/practice-areas/`, misalnya `content/practice-areas/hukum-pidana.json`.
Format lengkap tersedia di [`content/practice-areas/README.md`](./content/practice-areas/README.md). Halaman `/area-praktik/hukum-pidana` otomatis dibuat saat build dan opsi topik pada form kontak akan bertambah otomatis.

### D. Mengisi Halaman Beranda & Tentang (`content/pages/`)

- Buat `content/pages/home.json` untuk mengisi Hero, Pendekatan, Cara Kerja, dan CTA Beranda.
- Buat `content/pages/about.json` untuk mengisi Profil, Visi, Misi, Nilai-nilai, dan Legalitas.
Format lengkap tersedia di [`content/pages/README.md`](./content/pages/README.md).

---

## 4. Panduan Deploy ke cPanel (Shared Hosting)

1. Jalankan perintah build:
   ```bash
   npm run build
   ```
2. Pastikan proses selesai tanpa error. Folder `out/` akan ter-generate di root proyek.
3. Buka **File Manager** di cPanel hosting Anda, masuk ke direktori `public_html/`.
4. Upload seluruh isi folder `out/` (termasuk file `.htaccess` dan folder `_next/`) langsung ke dalam `public_html/`.
   - File `.htaccess` sudah dikonfigurasi untuk HTTPS redirect otomatis, security headers, browser caching, dan penanganan halaman 404.
5. Selesai! Website sudah aktif dan dapat diakses publik.

---

## 5. Struktur Direktori Proyek

```
/
├── content/                     # Data konten (JSON)
│   ├── team/                    # JSON profil advokat
│   ├── practice-areas/          # JSON bidang praktik
│   └── pages/                   # JSON halaman (home, about)
├── public/                      # Asset statis
│   ├── logo.jpeg                # Logo resmi kantor
│   └── .htaccess                # Konfigurasi server Apache / cPanel
├── src/
│   ├── app/                     # Route Next.js App Router
│   │   ├── area-praktik/        # Route /area-praktik & /area-praktik/[slug]
│   │   ├── kontak/              # Route /kontak
│   │   ├── tentang/             # Route /tentang
│   │   ├── tim/                 # Route /tim & /tim/[slug]
│   │   ├── layout.tsx           # Layout global (Header, Footer, Floating WA)
│   │   ├── page.tsx             # Beranda
│   │   ├── not-found.tsx        # Halaman 404
│   │   ├── robots.ts            # robots.txt generator
│   │   └── sitemap.ts           # sitemap.xml generator
│   ├── components/
│   │   ├── dev/                 # SlotOutline & SlotSection (dev mode)
│   │   ├── forms/               # ContactForm (validasi Zod + WA)
│   │   ├── layout/              # Header, Footer, FloatingWA, MobileBottomBar
│   │   └── ui/                  # Button, Card, Container, Section, Accordion, Breadcrumb
│   └── lib/
│       ├── analytics.ts         # Tracking helper GA4 / Plausible
│       ├── content.ts           # Content loader & parser
│       ├── schemas.ts           # Zod schemas untuk semua tipe konten
│       ├── seo.ts               # Metadata & JSON-LD helper
│       └── whatsapp.ts          # Generator URL WhatsApp
├── site.config.ts               # Konfigurasi utama profil & kontak kantor
└── next.config.ts               # Next.js static export config
```
