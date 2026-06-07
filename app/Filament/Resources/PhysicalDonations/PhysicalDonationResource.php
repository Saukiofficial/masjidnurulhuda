<?php

namespace App\Filament\Resources\PhysicalDonations;

use App\Filament\Resources\PhysicalDonations\Pages;
use App\Models\PhysicalDonation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PhysicalDonationResource extends Resource
{
    protected static ?string $model = PhysicalDonation::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';

    protected static ?string $navigationGroup = 'Keuangan';

    protected static ?string $navigationLabel = 'Donasi Fisik';

    protected static ?string $modelLabel = 'Donasi Fisik';

    protected static ?string $pluralModelLabel = 'Donasi Fisik';

    protected static ?string $recordTitleAttribute = 'item_name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Data Donatur')
                    ->description('Informasi orang atau jamaah yang memberikan sumbangan fisik.')
                    ->schema([
                        Forms\Components\TextInput::make('donor_name')
                            ->label('Nama Donatur')
                            ->placeholder('Isi Hamba Allah jika anonim')
                            ->default('Hamba Allah')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('donor_phone')
                            ->label('No. WhatsApp')
                            ->tel()
                            ->placeholder('Contoh: 08123456789')
                            ->maxLength(255),

                        Forms\Components\Select::make('fund_category_id')
                            ->relationship('category', 'name')
                            ->label('Tujuan Donasi')
                            ->searchable()
                            ->preload()
                            ->placeholder('Contoh: Renovasi Masjid')
                            ->helperText('Kategori ini mengikuti data kategori dana yang sudah ada.')
                            ->nullable(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Detail Barang Donasi')
                    ->description('Catat jenis barang, jumlah, satuan, dan estimasi nilainya.')
                    ->schema([
                        Forms\Components\TextInput::make('item_name')
                            ->label('Nama Barang')
                            ->placeholder('Contoh: Semen, Pasir, Batu, Besi, Tanah')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('quantity')
                            ->label('Jumlah')
                            ->numeric()
                            ->default(1)
                            ->required(),

                        Forms\Components\Select::make('unit')
                            ->label('Satuan')
                            ->options([
                                'Sak' => 'Sak',
                                'Truk' => 'Truk',
                                'Kg' => 'Kg',
                                'Batang' => 'Batang',
                                'Unit' => 'Unit',
                                'Meter' => 'Meter',
                                'M³' => 'M³',
                                'Lembar' => 'Lembar',
                                'Dus' => 'Dus',
                                'Lainnya' => 'Lainnya',
                            ])
                            ->searchable()
                            ->default('Unit')
                            ->required(),

                        Forms\Components\TextInput::make('estimated_value')
                            ->label('Estimasi Nilai')
                            ->numeric()
                            ->prefix('Rp')
                            ->placeholder('Contoh: 750000')
                            ->helperText('Tidak masuk saldo kas. Hanya untuk estimasi nilai bantuan fisik.'),

                        Forms\Components\DatePicker::make('received_date')
                            ->label('Tanggal Diterima')
                            ->default(now()),

                        Forms\Components\Select::make('status')
                            ->label('Status')
                            ->options([
                                'pending' => 'Diajukan / Menunggu',
                                'received' => 'Diterima',
                                'used' => 'Sudah Digunakan',
                                'rejected' => 'Ditolak',
                            ])
                            ->default('received')
                            ->native(false)
                            ->required(),

                        Forms\Components\FileUpload::make('photo')
                            ->label('Foto Barang / Bukti Serah Terima')
                            ->image()
                            ->imageEditor()
                            ->directory('physical-donations')
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('description')
                            ->label('Keterangan')
                            ->placeholder('Contoh: Bantuan semen untuk pengecoran lantai masjid.')
                            ->rows(4)
                            ->columnSpanFull(),

                        Forms\Components\Toggle::make('is_public')
                            ->label('Tampilkan di Frontend?')
                            ->default(true)
                            ->helperText('Jika aktif, donasi fisik dapat ditampilkan ke halaman publik.'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo')
                    ->label('Foto')
                    ->circular(),

                Tables\Columns\TextColumn::make('received_date')
                    ->label('Tanggal')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('donor_name')
                    ->label('Donatur')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('item_name')
                    ->label('Barang')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('quantity')
                    ->label('Jumlah')
                    ->formatStateUsing(function ($state, PhysicalDonation $record): string {
                        return rtrim(rtrim(number_format((float) $state, 2, ',', '.'), '0'), ',') . ' ' . $record->unit;
                    }),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('Tujuan')
                    ->badge()
                    ->color('info')
                    ->placeholder('-'),

                Tables\Columns\TextColumn::make('estimated_value')
                    ->label('Estimasi')
                    ->money('IDR')
                    ->sortable()
                    ->placeholder('-'),

                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'received' => 'success',
                        'used' => 'info',
                        'rejected' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'Menunggu',
                        'received' => 'Diterima',
                        'used' => 'Digunakan',
                        'rejected' => 'Ditolak',
                        default => $state,
                    }),

                Tables\Columns\IconColumn::make('is_public')
                    ->label('Publik')
                    ->boolean(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('received_date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Menunggu',
                        'received' => 'Diterima',
                        'used' => 'Sudah Digunakan',
                        'rejected' => 'Ditolak',
                    ]),

                Tables\Filters\SelectFilter::make('fund_category_id')
                    ->label('Tujuan Donasi')
                    ->relationship('category', 'name'),

                Tables\Filters\TernaryFilter::make('is_public')
                    ->label('Tampil di Frontend'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateHeading('Belum ada donasi fisik')
            ->emptyStateDescription('Catat bantuan fisik seperti semen, pasir, batu, besi, tanah, dan material renovasi lainnya.')
            ->emptyStateIcon('heroicon-o-cube');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPhysicalDonations::route('/'),
            'create' => Pages\CreatePhysicalDonation::route('/create'),
            'edit' => Pages\EditPhysicalDonation::route('/{record}/edit'),
        ];
    }
}