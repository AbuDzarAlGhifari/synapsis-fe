# Synapsis Test - Aplikasi Blog Frontend

Aplikasi blog modern yang dibangun dengan Next.js, TypeScript, dan API GoRest, dilengkapi dengan operasi CRUD, pagination, dan desain responsif.

![Next.js](https://img.shields.io/badge/Next.js-13.4.19-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.6-blue)

## Fitur

- 🚀 **Operasi CRUD** (Buat, Baca, Perbarui, Hapus) tanpa me-refresh halaman
- 📖 **Pagination** untuk menampilkan data secara efisien
- 🎨 **Antarmuka Modern** dengan Ant Design dan Tailwind CSS
- 📱 **Desain Responsif** untuk semua ukuran layar
- 🔄 **Pembaruan Real-time** menggunakan TanStack Query
- 🛡️ **Dukungan Mock API** dengan MSW (sebagai solusi sementara)
- ⚡ **Optimasi Performa** dengan SSR dan manajemen state yang efisien

## Teknologi yang Digunakan

- **Framework**: Next.js 13 (Page Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS 3 + Ant Design 5
- **Pengambilan Data**: Axios + TanStack Query v5
- **API**: [GoRest Public API](https://gorest.co.in/)
- **Deployment**: Vercel

## 🛠 Installation & Konfigurasi

1. Clone repository:
   ```bash
   git clone https://github.com/AbuDzarAlGhifari/synapsis-fe
   cd blog-frontend
   ```
2. Install dependensi:

   ```bash
   npm install
   ```

3. Buat file environment:
   ```bash
   cp .env.local.example .env.local
   ```
4. Konfigurasi

- Dapatkan token akses GoRest dari https://gorest.co.in/
- Update .env.local:
  ```bash
  NEXT_PUBLIC_GOREST_API_TOKEN=token_gorest_anda_disini
  ```

5. Jalankan Aplikasi
   ```bash
   npm run dev
   ```
