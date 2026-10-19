<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MosqueProfileResource\Pages;
use App\Models\MosqueProfile;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class MosqueProfileResource extends Resource
{
    protected static ?string $model = MosqueProfile::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-library';

    protected static ?string $navigationGroup = 'Manajemen Masjid';

    protected static ?string $navigationLabel = 'Profil & Kontak Masjid';

    protected static ?string $modelLabel = 'Profil Masjid';

    protected static ?string $pluralModelLabel = 'Profil & Kontak Masjid';

    public static function canCreate(): bool
    {
        // Hanya perlu 1 profil masjid
        return MosqueProfile::count() === 0;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('ProfilTabs')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Identitas & Kontak')
                            ->icon('heroicon-o-identification')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->label('Nama Masjid')
                                    ->required()
                                    ->default('Masjid Nurul Huda')
                                    ->maxLength(255),

                                Forms\Components\TextInput::make('tagline')
                                    ->label('Slogan / Moto Masjid')
                                    ->placeholder('Contoh: Pusat Ibadah, Dakwah, dan Ukhuwah Jamaah')
                                    ->maxLength(255),

                                Forms\Components\TextInput::make('phone')
                                    ->label('No. WhatsApp / Call Center')
                                    ->tel()
                                    ->placeholder('Contoh: 081234567890')
                                    ->maxLength(50),

                                Forms\Components\TextInput::make('email')
                                    ->label('Email Resmi')
                                    ->email()
                                    ->placeholder('Contoh: info@masjidnurulhuda.id')
                                    ->maxLength(100),

                                Forms\Components\Textarea::make('address')
                                    ->label('Alamat Lengkap Masjid')
                                    ->rows(3)
                                    ->columnSpanFull(),

                                Forms\Components\TextInput::make('google_maps_url')
                                    ->label('Link Google Maps / Lokasi')
                                    ->placeholder('https://maps.google.com/...')
                                    ->columnSpanFull(),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('Tampilan Beranda')
                            ->icon('heroicon-o-home')
                            ->schema([
                                Forms\Components\TextInput::make('hero_title')
                                    ->label('Judul Utama Beranda')
                                    ->placeholder('Selamat Datang di Portal Resmi Masjid Nurul Huda')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                Forms\Components\Textarea::make('hero_subtitle')
                                    ->label('Subjudul / Kalimat Sambutan')
                                    ->placeholder('Menjaga amanah jamaah dengan keterbukaan informasi...')
                                    ->rows(3)
                                    ->columnSpanFull(),

                                Forms\Components\FileUpload::make('hero_image')
                                    ->label('Foto Utama Hero Section (Latar Belakang Beranda)')
                                    ->image()
                                    ->imageEditor()
                                    ->imageEditorAspectRatios([
                                        '16:9',
                                        '21:9',
                                        '4:3',
                                    ])
                                    ->directory('profile')
                                    ->maxSize(5120) // Maksimal 5MB
                                    ->helperText('📐 Rekomendasi Foto: Format JPG / WebP, rasio lanskap 16:9 (resolusi minimal 1920 × 1080 px, ideal 2400 × 1350 px, maksimal 5MB). Tips Komposisi: Usahakan kubah dan menara masjid berada di sisi kanan/tengah frame foto agar teks sambutan beranda di sisi kiri tetap kontras dan mudah dibaca.')
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Tabs\Tab::make('Sejarah & Visi Misi')
                            ->icon('heroicon-o-book-open')
                            ->schema([
                                Forms\Components\Textarea::make('history')
                                    ->label('Sejarah & Profil Singkat')
                                    ->placeholder('Tuliskan sejarah berdirinya masjid...')
                                    ->rows(5)
                                    ->columnSpanFull(),

                                Forms\Components\Textarea::make('vision_mission')
                                    ->label('Visi & Misi Masjid')
                                    ->placeholder("VISI:\n...\n\nMISI:\n1. ...")
                                    ->rows(5)
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Masjid')
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('phone')
                    ->label('WhatsApp Call Center'),

                Tables\Columns\TextColumn::make('email')
                    ->label('Email'),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Terakhir Diperbarui')
                    ->dateTime('d M Y H:i'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMosqueProfiles::route('/'),
            'create' => Pages\CreateMosqueProfile::route('/create'),
            'edit' => Pages\EditMosqueProfile::route('/{record}/edit'),
        ];
    }
}
