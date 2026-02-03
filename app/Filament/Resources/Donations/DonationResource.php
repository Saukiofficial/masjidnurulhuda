<?php

namespace App\Filament\Resources\Donations;

use App\Filament\Resources\Donations\Pages;
use App\Models\Donation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DonationResource extends Resource
{
    protected static ?string $model = Donation::class;

    protected static ?string $navigationIcon = 'heroicon-o-heart'; // Icon Hati

    protected static ?string $navigationGroup = 'Keuangan';

    protected static ?string $navigationLabel = 'Donatur';

    protected static ?string $recordTitleAttribute = 'donor_name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Data Donatur')
                    ->description('Masukkan informasi donatur perseorangan.')
                    ->schema([
                        Forms\Components\Select::make('fund_category_id')
                            ->relationship('category', 'name')
                            ->label('Tujuan Donasi')
                            ->searchable()
                            ->preload()
                            ->required(),

                        Forms\Components\TextInput::make('amount')
                            ->label('Jumlah Donasi (Rp)')
                            ->numeric()
                            ->prefix('Rp')
                            ->required(),

                        Forms\Components\TextInput::make('donor_name')
                            ->label('Nama Donatur')
                            ->placeholder('Isi "Hamba Allah" jika anonim')
                            ->default('Hamba Allah')
                            ->required(),

                        Forms\Components\TextInput::make('donor_email')
                            ->label('Email (Opsional)')
                            ->email()
                            ->placeholder('Untuk kirim bukti donasi'),

                        Forms\Components\TextInput::make('donor_phone')
                            ->label('No. WhatsApp (Opsional)')
                            ->tel(),

                        Forms\Components\Select::make('status')
                            ->label('Status Pembayaran')
                            ->options([
                                'pending' => 'Menunggu Pembayaran',
                                'success' => 'Berhasil / Diterima',
                                'failed'  => 'Gagal / Dibatalkan',
                            ])
                            ->default('success') // Default sukses jika input manual admin
                            ->required()
                            ->native(false),

                        Forms\Components\Textarea::make('message')
                            ->label('Doa / Pesan')
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal')
                    ->dateTime('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('donor_name')
                    ->label('Donatur')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('Tujuan')
                    ->badge()
                    ->color('info'),

                Tables\Columns\TextColumn::make('amount')
                    ->label('Jumlah')
                    ->money('IDR')
                    ->color('success')
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'success' => 'success',
                        'pending' => 'warning',
                        'failed' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'success' => 'Diterima',
                        'pending' => 'Menunggu',
                        'failed' => 'Gagal',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('message')
                    ->label('Doa')
                    ->limit(20)
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'success' => 'Diterima',
                        'pending' => 'Menunggu',
                        'failed' => 'Gagal',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
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
            'index' => Pages\ListDonations::route('/'),
            'create' => Pages\CreateDonation::route('/create'),
            'edit' => Pages\EditDonation::route('/{record}/edit'),
        ];
    }
}
