# SIMOBILE - Point of Sale (POS) Application

Aplikasi Kasir / Point of Sale (POS) berbasis mobile yang dibangun menggunakan **Ionic Framework (Angular)**. Aplikasi ini dirancang untuk memudahkan manajemen katalog produk, kalkulasi transaksi keranjang, serta pencatatan riwayat transaksi secara *real-time*.

---

## 🎨 Tema Branding
* **Skema Warna**: Hijau - Kuning (Green-Gold Professional Store Theme).
* **UI/UX**: Menggunakan komponen Ionic modern dengan animasi interaktif (*Swipe-to-Delete*, *Pop-in alert*, *Cart Badge*).

---

## 🚀 Fitur Utama

- **Dashboard & Ringkasan Penjualan (Tab 1)**:
  - Tampilan ringkasan total pendapatan dan jumlah transaksi harian.
  - Statistik total jenis produk dan informasi produk terlaris.
- **Katalog & Manajemen Produk (Tab 2)**:
  - Filter pencarian cepat (*Searchbar*) berdasarkan nama produk atau kategori.
  - *Swipe-to-Delete* untuk menghapus produk dari katalog secara interaktif.
  - Indikator status stok (Tersedia, Menipis, atau Habis).
- **Form Olah Data Produk (CRUD)**:
  - Tambah produk baru dan edit detail produk (Nama, Kategori, Harga Modal, Harga Jual, Stok).
- **Detail Produk**:
  - Tampilan rinci informasi produk beserta deskripsi dan kalkulasi *margin* keuntungan.
- **Keranjang Belanja & Checkout Simulasi**:
  - Penambahan produk ke keranjang belanja dengan kalkulasi subtotal dan total harga otomatis.
  - Kontrol penyesuaian kuantitas item (+ / -).
  - Dialog konfirmasi checkout dengan proteksi *anti-double click* untuk mencegah transaksi bernilai Rp0.
- **Riwayat Transaksi & Detail Struk (Tab 3)**:
  - Pencatatan otomatis histori transaksi lengkap dengan tanggal, jam, dan total bayar.
  - Navigasi interaktif ke halaman **Detail Transaksi** untuk melihat rincian item barang yang dibeli.

---

## 🛠️ Persyaratan Sistem

Pastikan perangkat kamu sudah terinstal:
* [Node.js](https://nodejs.org/) (versi LTS recommended)
* [npm](https://www.npmjs.com/)
* [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)

---

## 💻 Cara Instalasi & Menjalankan Aplikasi

1. **Clone Repositori**:
   ```bash
   git clone [https://github.com/s160425188-dotcom/uts_hmp.git](https://github.com/s160425188-dotcom/uts_hmp.git)
   cd uts_hmp