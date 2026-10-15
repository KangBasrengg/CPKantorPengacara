# Format Data Area Praktik

Tempatkan file JSON per bidang hukum di folder ini, contoh: `hukum-pidana.json`.
Setiap file akan otomatis menjadi halaman detail di `/area-praktik/<slug>`, muncul di daftar `/area-praktik`, dan menjadi opsi topik di form kontak.

## Skema JSON

```json
{
  "slug": "hukum-pidana",
  "title": "Hukum Pidana",
  "summary": "Pendampingan hukum dalam perkara pidana umum maupun khusus.",
  "description": "Penjelasan mendalam mengenai layanan hukum pidana yang kami sediakan...",
  "services": [
    "Pendampingan di tingkat Kepolisian",
    "Pendampingan di Kejaksaan",
    "Pembelaan di Pengadilan Negeri"
  ],
  "process": [
    {
      "step": 1,
      "title": "Konsultasi & Analisis Kasus",
      "description": "Menelaah fakta-fakta hukum dan dokumen awal."
    },
    {
      "step": 2,
      "title": "Perumusan Strategi",
      "description": "Menentukan langkah advokasi yang terarah."
    }
  ],
  "faqs": [
    {
      "question": "Kapan saya sebaiknya didampingi advokat?",
      "answer": "Pendampingan sebaiknya dilakukan sejak tahap pemeriksaan awal untuk melindungi hak-hak hukum Anda."
    }
  ],
  "order": 1
}
```

Semua field selain `slug`, `title`, dan `summary` bersifat opsional.
Komponen Accordion FAQ dan tahapan hanya akan dirender jika ada datanya.
