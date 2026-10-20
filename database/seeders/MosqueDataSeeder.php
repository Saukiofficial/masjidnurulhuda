<?php

namespace Database\Seeders;

use App\Models\BankAccount;
use App\Models\Event;
use App\Models\FundCategory;
use App\Models\MosqueProfile;
use App\Models\RenovationProgress;
use App\Models\TakmirMember;
use Illuminate\Database\Seeder;

class MosqueDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Profil Masjid
        if (! MosqueProfile::exists()) {
            MosqueProfile::create([
                'name' => 'Masjid Nurul Huda',
                'tagline' => 'Pusat Ibadah, Dakwah, dan Ukhuwah Jamaah Desa Poreh',
                'address' => 'Jl. Siding Puri 002/001, Poreh, Kec. Lenteng, Kabupaten Sumenep, Jawa Timur 69461',
                'google_maps_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.736284281551!2d113.7839247007676!3d-7.040247592745691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd9e7005a487b57%3A0x6091410510269436!2sMasjid%20Nurul%20Huda!5e0!3m2!1sid!2sid!4v1792459452356!5m2!1sid!2sid',
                'latitude' => '-7.040248',
                'longitude' => '113.783925',
                'phone' => '087853434292',
                'email' => 'takmir@masjidnurulhuda.id',
                'history' => 'Masjid Nurul Huda merupakan pusat kegiatan keagamaan dan kemasyarakatan yang didirikan atas dasar kebersamaan dan gotong royong warga desa Poreh, Lenteng, Sumenep. Masjid ini senantiasa aktif dalam memakmurkan sholat berjamaah, pengajian rutin, serta kegiatan sosial kemasyarakatan.',
                'vision_mission' => "VISI:\nTerwujudnya masjid yang makmur, mandiri, dan menjadi pusat peradaban umat yang berlandaskan Al-Qur'an dan As-Sunnah.\n\nMISI:\n1. Menyelenggarakan ibadah sholat fardhu berjamaah dan pembinaan keislaman secara istiqomah.\n2. Mengelola dana umat dan kas masjid secara transparan, profesional, dan akuntabel.\n3. Melanjutkan renovasi sarana dan prasarana fisik masjid demi kenyamanan seluruh jamaah.",
                'hero_title' => 'Selamat Datang di Portal Resmi Masjid Nurul Huda',
                'hero_subtitle' => 'Menjaga amanah jamaah dengan keterbukaan informasi, transparansi dana donasi, dan pelayanan umat yang amanah.',
            ]);
        }

        // 2. Kategori Dana Default
        $categories = [
            ['name' => 'Renovasi Masjid', 'description' => 'Dana khusus proyek pembangunan dan renovasi fisik masjid.'],
            ['name' => 'Kas Masjid Umum', 'description' => 'Operasional rutin, kebersihan, listrik, dan fasilitas.'],
            ['name' => 'Santunan Yatim & Dhuafa', 'description' => 'Penyaluran kepedulian sosial untuk anak yatim dan kaum dhuafa.'],
        ];
        foreach ($categories as $cat) {
            FundCategory::firstOrCreate(['name' => $cat['name']], $cat);
        }

        // 3. Rekening Bank Default
        if (! BankAccount::exists()) {
            BankAccount::create([
                'bank_name' => 'Bank Syariah Indonesia (BSI)',
                'account_number' => '7123456789',
                'account_name' => 'Masjid Nurul Huda',
                'is_active' => true,
            ]);
            BankAccount::create([
                'bank_name' => 'Bank Jatim Syariah',
                'account_number' => '6012345678',
                'account_name' => 'Takmir Masjid Nurul Huda',
                'is_active' => true,
            ]);
        }

        // 4. Pengurus Takmir
        if (! TakmirMember::exists()) {
            $members = [
                [
                    'name' => 'K.H. Ahmad Syamsuddin',
                    'position' => 'Penasihat / Pembina',
                    'period' => '2024 - 2029',
                    'phone' => '081234567891',
                    'bio' => 'Tokoh sesepuh dan pembimbing arah dakwah jamaah.',
                    'sort_order' => 1,
                ],
                [
                    'name' => 'Ahmad Khairi',
                    'position' => 'Ketua Takmir',
                    'period' => '2024 - 2029',
                    'phone' => '087853434292',
                    'bio' => 'Koordinator umum seluruh program kerja kepengurusan masjid.',
                    'sort_order' => 2,
                ],
                [
                    'name' => 'Ahmad Rofiqi, S.Kom',
                    'position' => 'Sekretaris',
                    'period' => '2024 - 2029',
                    'phone' => '081234567893',
                    'bio' => 'Administrasi kesekretariatan dan pendataan jamaah.',
                    'sort_order' => 3,
                ],
                [
                    'name' => 'H. Abdul Halim',
                    'position' => 'Bendahara Umum',
                    'period' => '2024 - 2029',
                    'phone' => '081234567894',
                    'bio' => 'Pengelolaan pembukuan keuangan dan donasi kas masjid.',
                    'sort_order' => 4,
                ],
                [
                    'name' => 'H. Supriyadi',
                    'position' => 'Koordinator Pembangunan & Renovasi',
                    'period' => '2024 - 2029',
                    'phone' => '081234567895',
                    'bio' => 'Penanggung jawab lapangan pengerjaan renovasi dan material.',
                    'sort_order' => 5,
                ],
                [
                    'name' => 'Ust. Fahmi Idris',
                    'position' => 'Seksi Peribadatan & Dakwah',
                    'period' => '2024 - 2029',
                    'phone' => '081234567896',
                    'bio' => 'Pengatur jadwal imam rawatib, khatib Jumat, dan kajian rutin.',
                    'sort_order' => 6,
                ],
            ];
            foreach ($members as $m) {
                TakmirMember::create($m);
            }
        }

        // 5. Agenda & Kegiatan
        if (! Event::exists()) {
            $events = [
                [
                    'title' => 'Kajian Rutin Tafsir Al-Qur\'an',
                    'category' => 'Kajian',
                    'speaker' => 'Ahmad Khairi',
                    'date' => now()->addDays(2)->toDateString(),
                    'time' => 'Ba\'da Sholat Maghrib - Isya',
                    'location' => 'Ruang Utama Masjid Nurul Huda',
                    'description' => 'Kajian rutin mingguan membahas tafsir juz amma dan tadabbur ayat-ayat pilihan. Terbuka untuk umum.',
                    'is_published' => true,
                ],
                [
                    'title' => 'Sholat Jumat Berjamaah & Khutbah',
                    'category' => 'Sholat Jumat',
                    'speaker' => 'K.H. Ahmad Syamsuddin',
                    'date' => now()->next('Friday')->toDateString(),
                    'time' => '11:45 WIB s/d selesai',
                    'location' => 'Masjid Nurul Huda Poreh',
                    'description' => 'Ibadah Sholat Jumat berjamaah dilanjutkan laporan kas mingguan oleh bendahara takmir.',
                    'is_published' => true,
                ],
                [
                    'title' => 'Kerja Bakti & Gotong Royong Renovasi',
                    'category' => 'Sosial',
                    'speaker' => 'Panitia Pembangunan Masjid',
                    'date' => now()->addDays(6)->toDateString(),
                    'time' => '07:00 WIB s/d 11:00 WIB',
                    'location' => 'Area Halaman & Sayap Masjid',
                    'description' => 'Kerja bakti bersama warga jamaah dalam membantu pembersihan area material renovasi lantai 2.',
                    'is_published' => true,
                ],
            ];
            foreach ($events as $ev) {
                Event::create($ev);
            }
        }

        // 6. Progres Renovasi Awal (jika belum ada)
        if (! RenovationProgress::exists()) {
            RenovationProgress::create([
                'title' => 'Pengecoran Balok & Dak Lantai 2',
                'description' => 'Pengerjaan pengecoran struktur utama dak lantai 2 telah terlaksana dengan lancar bersama warga dan tukang.',
                'percentage' => 68,
                'date' => now()->subDays(5)->toDateString(),
                'is_published' => true,
            ]);
        }
    }
}
