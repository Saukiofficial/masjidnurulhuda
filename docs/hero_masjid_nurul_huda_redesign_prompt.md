# PROMPT REDESIGN HERO SECTION — MASJID NURUL HUDA
## Premium International Mosque Website | Desktop, Tablet, Mobile

> **Tujuan:** Redesign hero section website Masjid Nurul Huda agar tampil seperti website masjid modern berkelas internasional: elegan, tenang, terpercaya, Islami, dan profesional. Gunakan gambar referensi desain yang diberikan sebagai acuan visual utama. Implementasikan pada proyek yang sudah ada, bukan membuat website baru dari nol.

---

## 1. PERAN DAN TARGET HASIL

Bertindak sebagai **Senior UI/UX Designer dan Senior Frontend Engineer** yang berpengalaman membangun website institusi, komunitas, dan rumah ibadah dengan standar visual internasional.

Hasil akhir harus:
- Terlihat dirancang oleh desainer profesional, bukan template generik atau “AI slop”.
- Memiliki hierarki visual yang kuat, whitespace yang cukup, tipografi matang, dan komposisi yang seimbang.
- Menonjolkan identitas masjid melalui fotografi arsitektur, palet hijau-putih-emas, serta ornamen Islami yang halus.
- Konsisten di desktop, tablet, dan ponsel.
- Tetap mudah dibaca, cepat dimuat, aksesibel, dan nyaman digunakan.

**Prioritas utama:** kemiripan komposisi dengan referensi, kualitas visual, responsivitas, dan menjaga fungsi yang telah tersedia.

## 2. ATURAN WAJIB SEBELUM MULAI

1. Periksa struktur proyek, framework, halaman beranda, komponen navbar, stylesheet, sistem ikon, font, dan asset yang sudah digunakan.
2. Temukan file yang benar-benar merender hero section beranda. Edit file dan komponen yang relevan saja.
3. Gunakan stack, konvensi, dan sistem styling yang telah ada. Jangan mengganti framework atau melakukan migrasi arsitektur.
4. Pertahankan seluruh route, nama menu, link, action tombol, data dinamis, dan integrasi yang sudah berfungsi.
5. Jangan menghapus atau mengubah fitur yang sudah ada. CTA harus tetap menuju tujuan yang benar di proyek.
6. Pertahankan identitas dan konten yang telah ada:
   - Nama: **Masjid Nurul Huda**
   - Lokasi: **Poreh, Lenteng, Sumenep**
   - Navigasi: Beranda, Pengurus, Laporan Keuangan, Agenda & Kegiatan, Kontak
   - CTA navbar: Donasi Sekarang
   - CTA hero: Laporan Keuangan & Kas, Pengurus Takmir, Agenda & Kegiatan
   - Headline utama: **Selamat Datang di Portal Resmi Masjid Nurul Huda**
   - Deskripsi: **Menjaga amanah jamaah dengan keterbukaan informasi, transparansi dana donasi, dan pelayanan umat yang amanah.**
7. Jangan membuat route, data, angka keuangan, statistik, testimoni, atau informasi masjid baru yang tidak tersedia di aplikasi.
8. Jangan mengganti logo resmi jika logo asli sudah tersedia. Gunakan asset yang ada jika sesuai.
9. Hindari menambah dependency baru kecuali benar-benar diperlukan.
10. Setelah implementasi, jalankan pemeriksaan/build yang tersedia dan perbaiki error yang muncul.

## 3. ARAH VISUAL

### Konsep
**“Contemporary Islamic Elegance”** — website masjid modern dengan fotografi arsitektur yang hangat, antarmuka bersih, aksen emas lembut, dan warna hijau tua yang merepresentasikan ketenangan serta kepercayaan.

Visual harus terasa:
- Premium, berwibawa, hangat, dan menenangkan.
- Islami secara elegan, bukan penuh ornamen.
- Modern dan editorial, bukan dashboard admin.
- Memiliki kedalaman dari fotografi, overlay, dan panel transparan; bukan gradient berlebihan.
- Mengutamakan konten, bukan dekorasi.

### Hindari
- Background hijau polos dengan pola plus berulang seperti desain lama.
- Gradient neon, glow berlebihan, bayangan hitam tebal, dan efek kaca di semua elemen.
- Terlalu banyak kartu kecil, border dekoratif, badge, atau ikon yang tidak diperlukan.
- Headline yang terlalu besar sampai menutupi foto atau membuat layout sesak.
- Emoji sebagai ikon UI.
- Foto stok yang tidak relevan, masjid yang tampak futuristik, atau arsitektur yang tidak realistis.
- Membuat semua elemen berbentuk pill.
- Menambahkan elemen yang tidak ada di referensi tanpa alasan fungsional.

## 4. SISTEM WARNA

Gunakan warna berikut sebagai token awal. Sesuaikan sedikit jika proyek sudah memiliki token brand yang mapan, tetapi pertahankan karakter visual hijau-putih-emas.

| Token | Nilai | Penggunaan |
|---|---|---|
| Deep Forest | `#073F35` | Hijau utama, CTA utama, elemen brand |
| Mosque Green | `#0B5A49` | Judul aksen, ikon, aksen visual |
| Emerald Muted | `#16745E` | Hover dan aksen sekunder |
| Pale Mint | `#E7F5EF` | Latar ikon, highlight lembut |
| Warm White | `#FCFCF8` | Background konten |
| Pure White | `#FFFFFF` | Navbar, panel, tombol sekunder |
| Soft Gold | `#D8B45A` | Garis ornamen, detail kecil, aksen |
| Ink | `#102D31` | Judul utama |
| Body Slate | `#52646A` | Teks deskripsi |
| Border Soft | `#DCE6E1` | Border halus |
| Overlay Dark | `rgba(4, 35, 29, 0.20)` | Overlay foto bila diperlukan |

Aturan penggunaan:
- Putih dan warna natural foto menjadi area dominan.
- Hijau gelap digunakan untuk CTA utama, teks aksen, dan identitas.
- Emas hanya sebagai detail kecil; jangan menjadikan emas sebagai warna dominan.
- Pastikan teks tetap kontras di atas gambar.
- Hindari memakai hijau terang atau kuning terang pada paragraf panjang.

## 5. TIPOGRAFI

Gunakan font yang sudah tersedia jika cocok. Jika perlu memilih font web, prioritaskan:
- **Plus Jakarta Sans** atau **Inter** untuk UI dan teks Indonesia.
- **DM Sans** sebagai alternatif untuk tampilan bersih.
- Untuk tulisan Arab basmalah, gunakan font Arab yang mendukung glyph dengan benar, misalnya **Amiri** atau font Arab yang sudah ada di proyek.

Ketentuan:
- Headline: sans-serif modern, bobot 700–800, line-height sekitar `0.98–1.08`, letter-spacing sedikit negatif (`-0.035em` sampai `-0.02em`).
- Body: bobot 400–500, line-height `1.55–1.7`.
- Navigasi: 13–15 px desktop, bobot 500–600.
- CTA: 14–15 px, bobot 600–700.
- Jangan memakai terlalu banyak jenis font atau bobot.
- Hindari seluruh teks memakai bold.
- Gunakan ukuran responsif melalui `clamp()` jika stack mendukung CSS.

Skala headline yang disarankan:
- Desktop besar: `clamp(2.75rem, 4.2vw, 4.25rem)`.
- Tablet: sekitar `2.5rem–3.25rem`.
- Mobile: `clamp(2rem, 8vw, 2.8rem)`.
- Ukuran aktual wajib disesuaikan agar headline tidak overflow dan tetap memiliki pemenggalan baris yang bagus.

## 6. STRUKTUR HALAMAN DAN KOMPOSISI

Bangun komposisi mengikuti urutan visual berikut:

1. Navbar putih yang rapi.
2. Hero utama dengan foto masjid besar sebagai background visual.
3. Konten headline di sisi kiri pada desktop.
4. Area arsitektur masjid terlihat jelas di sisi kanan.
5. CTA yang tersusun horizontal di desktop dan vertikal di mobile.
6. Panel fitur putih semi-transparan yang menumpang sebagian pada batas bawah hero.
7. Awal section “Tentang Masjid” terlihat setelah panel fitur, jika struktur halaman saat ini memang menampilkan section tersebut.

Jangan memasukkan seluruh halaman ke dalam satu gambar. Semua teks, navigasi, tombol, dan panel harus berupa elemen HTML/CSS aktual agar responsif dan dapat diakses.

## 7. NAVBAR

### Desktop
- Latar putih atau warm white.
- Tinggi sekitar `76–88px`.
- Konten berada dalam container tengah dengan `max-width` sekitar `1320px` dan padding horizontal `32–48px`.
- Logo berada di kiri: gunakan logo asli dalam bidang hijau gelap jika memang bentuk logo cocok; jangan menggambar ulang logo secara asal.
- Di samping logo, tampilkan:
  - **Masjid Nurul Huda** — tebal, sekitar 18–20 px.
  - **Poreh, Lenteng, Sumenep** — sekitar 12–13 px, warna slate.
- Menu navigasi berada di tengah, dengan jarak horizontal cukup dan ikon outline kecil yang konsisten.
- Menu aktif “Beranda” memakai latar mint sangat lembut, teks hijau tua, dan radius sekitar 12–16 px.
- Tombol “Donasi Sekarang” berada di kanan, warna deep forest, ikon donasi/heart-hand atau wallet yang sesuai dengan library ikon yang tersedia.
- Shadow sangat halus atau border bawah tipis; hindari navbar mengambang dengan shadow berat.
- Navbar harus tetap memiliki semua menu yang sudah ada.

### Mobile
- Tinggi sekitar `68–76px`.
- Logo dan nama masjid di kiri, tombol hamburger di kanan.
- Jangan menampilkan seluruh menu desktop dalam satu baris sempit.
- Hamburger harus benar-benar berfungsi menggunakan sistem menu yang sudah ada; jangan membuat tombol dekoratif.
- Menu mobile harus mudah disentuh, tidak overflow, dan memiliki fokus keyboard yang jelas.
- Tombol donasi dapat berada di dalam menu mobile bila sesuai pola navigasi proyek.

## 8. HERO DESKTOP

### Area dan dimensi
- Hero harus menjadi fokus pertama setelah navbar.
- Tinggi visual sekitar `560–680px` pada desktop, tergantung viewport.
- Gunakan `position: relative` dan area media yang memenuhi hero.
- Pada layar lebar, pertahankan rasio komposisi landscape.
- Hindari menetapkan tinggi kaku yang memotong konten pada laptop pendek.
- Container konten berada di tengah, lebar maksimal sekitar `1320px`.

### Foto latar
Gunakan foto masjid realistis dan berkualitas tinggi sebagai elemen visual utama:
- Arsitektur masjid Indonesia yang elegan, kubah hijau, menara ramping, halaman masjid, pepohonan, dan langit hangat menjelang pagi/senja.
- Nuansa fotografi natural, editorial, dan profesional.
- Tempatkan kubah dan menara terutama di bagian kanan frame.
- Sisakan ruang visual relatif bersih di kiri untuk headline.
- Foto harus tampak nyata, bukan ilustrasi, render 3D, atau kolase.
- Jika foto Masjid Nurul Huda yang asli tersedia di project, prioritaskan foto asli. Jangan mengklaim foto generik sebagai foto masjid yang sebenarnya.
- Jika tidak tersedia, gunakan asset yang legal dan sudah ada atau siapkan placeholder yang jelas untuk diganti. Jangan menambahkan URL gambar yang tidak diverifikasi.

Pengaturan gambar:
- `background-size: cover` atau gunakan `<img>` dengan `object-fit: cover`.
- Atur `background-position` agar kubah dan menara tidak terpotong.
- Terapkan overlay gradien tipis dari putih hangat/putih transparan di sisi kiri menuju transparan di sisi kanan, agar teks kiri terbaca.
- Jangan memberi overlay gelap menyeluruh yang membuat foto kusam.
- Jika memakai pseudo-element overlay, pastikan berada di belakang konten dengan stacking context yang benar.

### Konten kiri
- Letakkan konten di sisi kiri, secara vertikal sekitar 15–22% dari bagian atas hero setelah navbar.
- Lebar blok teks sekitar `48–54%` dari container pada desktop besar.
- Jangan menengahkan seluruh konten pada desktop.
- Tambahkan basmalah Arab kecil di atas headline, dengan garis emas tipis di kedua sisi jika sesuai. Warna hijau gelap, bukan emas menyala.
- Berikan jarak vertikal konsisten antara basmalah, headline, deskripsi, dan tombol.

### Headline
Teks harus persis:
**Selamat Datang di Portal Resmi Masjid Nurul Huda**

Pemenggalan baris yang dituju pada desktop:
- Selamat Datang di
- Portal Resmi Masjid
- Nurul Huda

Pemenggalan baris tidak boleh dipaksakan dengan `<br>` yang merusak responsivitas. Gunakan wrapper per baris hanya jika perlu dan ubah pemenggalannya pada breakpoint yang sesuai.

Gaya:
- Ukuran besar dan tegas, warna ink `#102D31`.
- Beri aksen hijau pada “Nurul Huda” untuk memperkuat identitas.
- Weight 700–800.
- Line-height rapat namun tidak saling bertabrakan.
- Maksimal sekitar 3 baris di desktop.
- Pastikan teks tidak menutupi kubah atau menara.
- Jangan membuat headline memenuhi seluruh lebar layar.

### Deskripsi
Gunakan teks persis:
“Menjaga amanah jamaah dengan keterbukaan informasi, transparansi dana donasi, dan pelayanan umat yang amanah.”

- Lebar maksimal sekitar `500–560px`.
- Ukuran sekitar `16–18px`.
- Warna slate gelap.
- Line-height sekitar `1.6`.
- Berikan jarak `18–24px` dari headline.
- Jangan meratakan teks dengan `text-align: justify`.

### CTA hero
Tampilkan tiga CTA sesuai fitur yang sudah ada:

1. **Laporan Keuangan & Kas** — CTA primer.
2. **Pengurus Takmir** — CTA sekunder.
3. **Agenda & Kegiatan** — CTA sekunder.

Gaya:
- Sejajar horizontal di desktop jika ruang cukup.
- Tinggi sekitar `46–52px`.
- Padding horizontal `18–24px`.
- Radius `12–16px`, bukan pill ekstrem.
- Ikon outline konsisten, ukuran sekitar 17–19 px.
- Jarak antar tombol `12–14px`.
- CTA primer deep forest dengan teks putih.
- CTA sekunder putih semi-solid dengan border hijau/abu tipis dan teks hijau tua.
- Hover: perubahan warna lembut, transisi 160–220ms, tidak ada gerakan besar.
- Fokus keyboard terlihat jelas.
- Setiap tombol wajib mempertahankan href/action yang benar dari implementasi saat ini.
- Jika lebar tidak cukup, izinkan tombol turun baris secara rapi tanpa saling menindih.

## 9. ORNAMEN DAN BENTUK VISUAL

- Tambahkan garis emas tipis atau motif geometri Islami yang sangat halus di satu atau dua area saja.
- Jika membuat bentuk arch/mihrab, gunakan outline yang tipis dan berada di belakang foto atau sebagai aksen tepi, bukan menghalangi objek utama.
- Pada bagian bawah hero, bentuk pemisah melengkung atau kurva hijau dapat digunakan secara subtil jika sesuai komposisi.
- Hindari motif repetitif kontras tinggi.
- Jangan memakai ornamen hanya untuk memenuhi ruang kosong.
- Seluruh ornamen bersifat dekoratif (`aria-hidden="true"`) jika tidak membawa informasi.

## 10. PANEL FITUR DI BAWAH HERO

Buat panel fitur horizontal yang sedikit overlap dengan bagian bawah hero, menyerupai referensi.

### Tampilan desktop
- Lebar sekitar `88–92%` dari container utama.
- Maksimal sekitar `1120px`.
- Posisi tengah.
- Tumpang tindih dengan hero sekitar `-35px` sampai `-55px`, menggunakan pendekatan layout yang tidak menutupi CTA.
- Background putih dengan opacity tinggi, misalnya `rgba(255,255,255,0.94)`.
- Border tipis `#E2EBE6`, shadow lembut, radius `22–28px`.
- Padding sekitar `26–32px`.
- Empat fitur dalam empat kolom dengan lebar seimbang.
- Pemisah vertikal halus di antara kolom bila diperlukan.
- Ikon berada dalam kotak mint berukuran sekitar `52–58px`, radius `16–20px`.
- Label fitur sekitar 15–16px, weight 650–700.
- Deskripsi sekitar 12–13px, line-height 1.5, warna slate.
- Seluruh kolom rata tengah dan memiliki tinggi visual konsisten.

### Empat fitur
Gunakan konten berikut:
1. **Transparansi**  
   “Laporan keuangan dan penggunaan dana yang jelas dan dapat diakses.”
2. **Pelayanan Umat**  
   “Melayani dengan sepenuh hati untuk kemaslahatan bersama.”
3. **Agenda & Kegiatan**  
   “Informasi kegiatan masjid terbaru dan terkini.”
4. **Donasi**  
   “Dukungan Anda sangat berarti untuk keberlangsungan masjid.”

Gunakan ikon dari library yang sudah ada:
- Transparansi: shield-check atau shield.
- Pelayanan Umat: users/people.
- Agenda & Kegiatan: calendar-days.
- Donasi: heart atau hand-heart jika tersedia.

Jangan menggunakan emoji sebagai pengganti ikon. Jangan menambahkan angka/statistik yang tidak memiliki sumber data.

### Tablet
- Empat kolom boleh tetap jika lebar mencukupi.
- Jika terlalu sempit, gunakan grid dua kolom.
- Atur jarak, padding, dan pemisah agar tidak sesak.

### Mobile
- Panel berada setelah hero dan tidak boleh menutupi headline atau CTA.
- Gunakan grid dua kolom dengan gap yang cukup.
- Hilangkan pemisah vertikal yang tidak cocok pada grid mobile.
- Kartu/fitur harus memiliki padding yang cukup dan teks tidak terpotong.
- Jika viewport sangat sempit, pastikan label dan deskripsi tetap terbaca; jangan memaksakan empat kolom.

## 11. RESPONSIVE BEHAVIOR

Implementasikan setidaknya breakpoint berikut, menyesuaikan konvensi framework yang digunakan:
- Mobile kecil: `320–374px`
- Mobile umum: `375–767px`
- Tablet: `768–1023px`
- Desktop: `1024–1439px`
- Desktop lebar: `1440px+`

### Tablet
- Headline dan deskripsi sedikit diperkecil.
- Konten tetap berada di kiri jika komposisi foto masih mendukung.
- Foto harus tetap memperlihatkan bagian arsitektur yang relevan.
- CTA boleh wrap ke baris kedua.
- Panel fitur berubah menjadi dua kolom bila dibutuhkan.

### Mobile — aturan paling penting
Mobile bukan versi desktop yang sekadar diperkecil. Buat komposisi khusus mobile yang rapi dan terencana.

Urutan:
1. Navbar ringkas.
2. Basmalah.
3. Headline.
4. Deskripsi.
5. CTA primer.
6. CTA sekunder.
7. Foto masjid yang tetap menjadi bagian penting dari hero.
8. Panel fitur dua kolom.

Tampilan hero mobile:
- Gunakan background warna warm white atau bagian atas foto dengan komposisi foto yang lebih vertikal.
- Jika gambar digunakan sebagai background, atur `background-position` khusus mobile agar kubah/menara tetap terlihat. Jangan hanya menggunakan posisi desktop.
- Pertimbangkan menempatkan headline di atas background putih hangat dan foto masjid di bawah teks, jika teks di atas foto sulit dibaca.
- Padding horizontal sekitar `20–24px`.
- Headline rata kiri, ukuran sekitar `32–42px` sesuai lebar perangkat.
- Deskripsi sekitar `14–16px`.
- CTA primer memenuhi lebar kontainer.
- CTA sekunder juga memenuhi lebar kontainer atau disusun dua kolom hanya jika masih nyaman disentuh.
- Tinggi area sentuh minimal `44px`.
- Jangan membuat tiga CTA berukuran kecil dalam satu baris.
- Panel fitur menggunakan dua kolom dengan icon, label, dan deskripsi yang tersusun rapi.
- Pastikan tidak ada horizontal scrolling, teks terpotong, atau tombol keluar viewport.
- Jangan menampilkan navigasi desktop pada mobile.
- Jangan menggunakan ukuran font tetap yang menyebabkan overflow pada 320px.

### Pengujian viewport
Pastikan tampilan diperiksa pada:
- `320 × 720`
- `375 × 812`
- `390 × 844`
- `768 × 1024`
- `1024 × 768`
- `1366 × 768`
- `1440 × 900`
- `1920 × 1080`

## 12. SECTION “TENTANG MASJID” DI BAWAHNYA

Jika section ini sudah ada, jangan dihapus atau mengubah kontennya. Pastikan transisi dari panel fitur menuju section berikutnya terasa alami:
- Background warm white.
- Layout desktop dua kolom: teks di kiri, media/foto di kanan jika memang elemen tersebut tersedia.
- Judul kecil “TENTANG MASJID” dapat menggunakan label uppercase kecil dengan aksen garis emas.
- Heading “Masjid Nurul Huda” berukuran besar dan warna ink.
- Pertahankan konten asli dan media yang tersedia.
- Pada mobile, susun vertikal dengan teks lebih dahulu.
- Jangan membuat video, modal, atau tombol profil palsu jika fitur tersebut tidak ada.

Jika section ini tidak termasuk ruang lingkup perubahan, jangan melakukan redesign besar pada section tersebut; cukup pastikan tidak ada overlap atau margin rusak akibat hero yang baru.

## 13. IKON, BORDER, SHADOW, DAN SPACING

### Ikon
- Gunakan library ikon proyek, misalnya Lucide jika memang sudah terpasang.
- Gunakan gaya outline yang seragam.
- Ukuran ikon navbar sekitar `15–18px`; CTA sekitar `17–19px`; fitur sekitar `24–28px`.
- Jangan mencampur ikon outline, filled, dan emoji secara sembarangan.

### Radius
- Tombol: `12–16px`.
- Panel fitur: `22–28px`.
- Kotak ikon: `16–20px`.
- Jangan memberi radius besar pada semua elemen tanpa hierarki.

### Shadow
Gunakan shadow ringan dan realistis, misalnya:
- Tombol primer: `0 6px 18px rgba(7, 63, 53, 0.12)`.
- Panel: `0 14px 40px rgba(16, 45, 49, 0.08)`.
- Hindari shadow hitam dengan opacity tinggi.

### Spacing
Gunakan skala spacing konsisten, misalnya kelipatan 4 atau 8 px:
- Jarak antar bagian utama: `24–48px`.
- Jarak headline ke deskripsi: `18–24px`.
- Jarak deskripsi ke CTA: `24–30px`.
- Padding container mobile: `20–24px`.
- Jangan menumpuk elemen hanya agar semua konten masuk ke satu layar.

## 14. AKSESIBILITAS DAN KUALITAS TEKNIS

- Gunakan struktur semantik: `header`, `nav`, `main`, `section`, heading yang urut, dan tombol/link yang benar.
- Semua tombol dan link dapat digunakan dengan keyboard.
- Pastikan `:focus-visible` jelas.
- Gunakan alt text yang bermakna untuk foto masjid jika berupa elemen `<img>`.
- Ornamen dekoratif tidak perlu dibacakan screen reader.
- Pastikan kontras teks memadai.
- Hormati `prefers-reduced-motion`.
- Animasi hanya untuk opacity/transform ringan dan tidak boleh menghambat interaksi.
- Optimalkan foto: ukuran yang sesuai, format modern jika didukung, lazy-load untuk gambar di luar viewport, dan jangan lazy-load gambar hero utama jika menyebabkan tampilan terlambat.
- Jangan membuat CLS besar akibat gambar tanpa dimensi.
- Jangan menambah script berat hanya untuk animasi dekoratif.

## 15. INTERAKSI DAN ANIMASI

Gunakan motion yang subtle:
- Hero content: tampil normal tanpa animasi wajib; jika menambahkan entrance animation, durasi `300–500ms`.
- CTA hover: perubahan warna, shadow tipis, atau translateY maksimal `-1px`.
- Panel fitur: tidak perlu animasi berlebihan.
- Menu mobile: buka/tutup dengan transisi singkat dan tetap aksesibel.
- Jangan menggunakan parallax berat, animasi background terus-menerus, cursor custom, atau efek yang mengganggu.
- Nonaktifkan atau sederhanakan motion saat `prefers-reduced-motion: reduce`.

## 16. ATURAN IMPLEMENTASI AGAR TIDAK MERUSAK PROYEK

- Jangan mengganti framework, routing, backend, model, controller, API, atau database.
- Jangan mengubah konten di luar ruang lingkup yang diperlukan.
- Jangan menghapus komponen yang dipakai halaman lain.
- Jika komponen digunakan ulang, periksa dampak styling sebelum mengubahnya.
- Hindari selector global yang merusak halaman lain.
- Gunakan class/component scope khusus untuk hero bila memungkinkan.
- Jangan membuat duplikasi navbar jika navbar existing dapat dipakai.
- Jangan menulis ulang seluruh halaman hanya untuk mengubah hero.
- Pertahankan perilaku tombol dan menu yang sudah ada.
- Jangan membuat link `#` atau `javascript:void(0)` sebagai pengganti tujuan sebenarnya.
- Jangan meninggalkan TODO, mock data, atau placeholder visual yang seolah-olah data nyata.
- Bila foto masjid asli belum tersedia, gunakan placeholder sementara yang jelas dan catat asset yang perlu diganti.

## 17. KRITERIA HASIL AKHIR

Implementasi dianggap selesai hanya jika:

- [ ] Navbar tetap memuat semua menu dan CTA yang sudah ada.
- [ ] Hero menampilkan foto masjid besar dengan ruang teks yang terjaga.
- [ ] Headline memiliki hierarki jelas, pemenggalan baris bagus, dan aksen hijau pada “Nurul Huda”.
- [ ] Deskripsi mudah dibaca dan tidak terlalu lebar.
- [ ] Tiga CTA tampil jelas dengan primer dan sekunder yang berbeda.
- [ ] Panel empat fitur memiliki tampilan premium dan seimbang.
- [ ] Warna hijau, putih, dan emas dipakai secara terukur.
- [ ] Desktop tidak terlihat seperti tampilan mobile yang dibesarkan.
- [ ] Mobile memiliki komposisi tersendiri, CTA mudah disentuh, dan foto tetap menarik.
- [ ] Tidak ada overflow horizontal pada 320px.
- [ ] Tidak ada konten terpotong, tombol bertumpuk, atau overlap yang tidak disengaja.
- [ ] Seluruh link, route, dan action tetap berfungsi.
- [ ] Tidak ada error console/build yang muncul akibat perubahan.
- [ ] Tidak ada fitur atau data existing yang hilang.

## 18. ALUR KERJA AGENT

Kerjakan secara bertahap, jangan langsung menulis ulang semua file:

1. **Audit singkat:** temukan komponen hero, navbar, asset, dan stylesheet terkait.
2. **Rencana file:** sebutkan file yang akan diubah dan alasan singkat.
3. **Implementasi:** ubah hanya file relevan, gunakan komponen yang ada jika memungkinkan.
4. **Responsive pass:** periksa breakpoint mobile, tablet, dan desktop.
5. **Functional pass:** pastikan menu dan CTA mengarah ke action/route yang benar.
6. **Quality pass:** jalankan build/lint/test yang tersedia dan perbaiki masalah yang disebabkan perubahan.
7. **Ringkasan:** laporkan file yang diubah, detail desain yang diterapkan, hasil pemeriksaan, serta asset yang masih perlu diganti jika ada.

Jangan berhenti setelah memberikan rencana; lanjutkan implementasi sesuai akses dan kemampuan lingkungan proyek.

## 19. REFERENSI VISUAL DAN PRIORITAS KEMIRIPAN

Gunakan screenshot referensi yang diberikan sebagai acuan visual utama:
- Navbar putih dengan brand di kiri, menu di tengah, CTA donasi di kanan.
- Foto masjid memenuhi area hero, arsitektur berada di sisi kanan.
- Konten headline dan deskripsi berada di kiri pada desktop.
- Basmalah Arab dengan detail garis emas tipis.
- Headline besar dengan warna gelap dan aksen hijau.
- Tombol CTA deep green dan tombol sekunder putih.
- Panel fitur putih semi-transparan yang overlap pada bagian bawah hero.
- Section “Tentang Masjid” mulai terlihat setelah panel fitur.
- Mobile memiliki navbar ringkas, headline bertumpuk, CTA vertikal, foto masjid, dan grid fitur dua kolom.

**Penting:** tiru sistem visual, proporsi, hierarki, dan komposisi dari referensi; jangan sekadar mengambil palet warnanya. Jangan menambahkan elemen baru yang mengubah arah desain.

### Instruksi final
Hasilkan implementasi frontend yang benar-benar berjalan di proyek existing. Prioritaskan kemiripan visual dengan referensi, ketelitian spacing, pemilihan foto, responsivitas, dan tidak merusak fitur. Jangan hanya memberikan saran atau contoh kode terpisah—lakukan perubahan pada file proyek yang relevan.
