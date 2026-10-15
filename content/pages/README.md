# Format Data Halaman (Pages)

Folder ini berisi konfigurasi konten untuk halaman statis seperti `home.json` dan `about.json`.

## 1. `home.json` (Beranda)

```json
{
  "hero": {
    "heading": "Judul Utama Beranda",
    "subheading": "Subjudul atau deskripsi pendukung",
    "ctaText": "Hubungi Kami",
    "ctaHref": "/kontak"
  },
  "approach": [
    {
      "title": "Integritas & Kerahasiaan",
      "description": "Menjunjung tinggi etika profesi advokat."
    }
  ],
  "howItWorks": [
    {
      "step": 1,
      "title": "Hubungi Kami",
      "description": "Konsultasikan permasalahan awal Anda."
    }
  ],
  "ctaHeading": "Butuh Pendampingan Hukum?",
  "ctaText": "Konsultasi Sekarang"
}
```

## 2. `about.json` (Tentang Kami)

```json
{
  "profile": {
    "title": "Profil Kantor",
    "content": "Uraian sejarah dan profil kantor hukum..."
  },
  "vision": {
    "title": "Visi",
    "content": "Menjadi kantor advokat terpercaya..."
  },
  "mission": {
    "title": "Misi",
    "content": "Memberikan layanan hukum berkeadilan..."
  },
  "values": [
    {
      "title": "Profesionalisme",
      "description": "Bekerja berdasarkan keahlian dan kode etik."
    }
  ],
  "legality": {
    "title": "Legalitas & Izin Praktik",
    "content": "Terdaftar resmi di organisasi advokat..."
  },
  "relatedUnits": [
    {
      "name": "Sugiyono Crisis Center",
      "description": "Unit pendampingan darurat",
      "url": "https://..."
    }
  ]
}
```

Semua section bersifat modular dan opsional. Section yang tidak diisi tidak akan dirender di halaman.
