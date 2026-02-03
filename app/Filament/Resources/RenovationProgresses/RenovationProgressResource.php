<?php

namespace App\Filament\Resources\RenovationProgresses;

use App\Filament\Resources\RenovationProgresses\Pages;
use App\Models\RenovationProgress;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class RenovationProgressResource extends Resource
{
    protected static ?string $model = RenovationProgress::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';

    protected static ?string $navigationGroup = 'Master Data';

    protected static ?string $navigationLabel = 'Progres Fisik';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Update Pembangunan')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Judul Kegiatan')
                            ->placeholder('Contoh: Pengecoran Dak Lantai 2')
                            ->required(),

                        Forms\Components\DatePicker::make('date')
                            ->label('Tanggal Update')
                            ->default(now())
                            ->required(),

                        // Slider atau Input Angka untuk Persentase
                        Forms\Components\TextInput::make('percentage')
                            ->label('Persentase Selesai (%)')
                            ->numeric()
                            ->suffix('%')
                            ->minValue(0)
                            ->maxValue(100)
                            ->required(),

                        Forms\Components\Toggle::make('is_published')
                            ->label('Tampilkan di Website?')
                            ->default(true),

                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi Pengerjaan')
                            ->columnSpanFull(),

                        // Upload Foto Dokumentasi (Multiple)
                        Forms\Components\FileUpload::make('images')
                            ->label('Foto Dokumentasi')
                            ->image()
                            ->multiple() // Bisa upload banyak foto
                            ->directory('renovation-progress')
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('date')
                    ->label('Tanggal')
                    ->date()
                    ->sortable(),

                Tables\Columns\TextColumn::make('title')
                    ->label('Kegiatan')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('percentage')
                    ->label('Progres')
                    ->suffix('%')
                    ->color(fn (string $state): string => match (true) {
                        $state >= 100 => 'success',
                        $state >= 50 => 'warning',
                        default => 'danger',
                    })
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_published')
                    ->label('Tayang')
                    ->boolean(),
            ])
            ->defaultSort('date', 'desc')
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
            'index' => Pages\ListRenovationProgresses::route('/'),
            'create' => Pages\CreateRenovationProgress::route('/create'),
            'edit' => Pages\EditRenovationProgress::route('/{record}/edit'),
        ];
    }
}
