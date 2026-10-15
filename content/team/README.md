# Format Data Anggota Tim

Tempatkan file JSON per anggota tim di folder ini, contoh: `sugiyono.json`.
Setiap file akan otomatis menjadi halaman detail di `/tim/<slug>` dan muncul di daftar `/tim`.

## Skema JSON

```json
{
  "slug": "sugiyono",
  "name": "Sugiyono, SE., SH., MH",
  "title": "Managing Partner & Advokat",
  "photo": "/team/sugiyono.jpg",
  "bio": "Deskripsi singkat profil advokat...",
  "education": [
    "S1 Ekonomi - Universitas ...",
    "S1 Hukum - Universitas ...",
    "S2 Magister Hukum - Universitas ..."
  ],
  "experience": [
    "Pengalaman 1...",
    "Pengalaman 2..."
  ],
  "expertise": [
    "Hukum Pidana",
    "Hukum Perdata",
    "Hukum Bisnis"
  ],
  "credentials": [
    "Advokat PERADI",
    "Kurator & Pengurus"
  ],
  "order": 1
}
```

Semua field selain `slug`, `name`, dan `title` bersifat opsional.
Jika foto tidak disediakan, sistem akan menggunakan SVG pattern placeholder.
