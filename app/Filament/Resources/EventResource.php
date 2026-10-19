<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $navigationGroup = 'Manajemen Masjid';

    protected static ?string $navigationLabel = 'Agenda & Kegiatan';

    protected static ?string $modelLabel = 'Agenda Kegiatan';

    protected static ?string $pluralModelLabel = 'Agenda & Kegiatan';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Kegiatan / Kajian')
                    ->description('Jadwalkan kajian rutin, sholat Jumat, atau kegiatan sosial kemasjidan.')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Nama Kegiatan / Tema Kajian')
                            ->placeholder('Contoh: Kajian Rutin Tafsir Al-Qur\'an')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),

                        Forms\Components\Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'Kajian' => 'Kajian / Pengajian',
                                'Sholat Jumat' => 'Sholat Jumat (Khatib/Imam)',
                                'Hari Besar' => 'Peringatan Hari Besar Islam (PHBI)',
                                'Sosial' => 'Kegiatan Sosial & Gotong Royong',
                                'Lainnya' => 'Kegiatan Lainnya',
                            ])
                            ->default('Kajian')
                            ->required(),

                        Forms\Components\TextInput::make('speaker')
                            ->label('Pemateri / Penceramah / Pengisi Acara')
                            ->placeholder('Contoh: Ust. Muhammad Mansyur, S.Pd.I')
                            ->maxLength(255),

                        Forms\Components\DatePicker::make('date')
                            ->label('Tanggal Pelaksanaan')
                            ->default(now())
                            ->required(),

                        Forms\Components\TextInput::make('time')
                            ->label('Waktu Pelaksanaan')
                            ->placeholder('Contoh: 19:30 WIB s/d Isya')
                            ->maxLength(100),

                        Forms\Components\TextInput::make('location')
                            ->label('Tempat / Lokasi')
                            ->default('Masjid Nurul Huda')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\Toggle::make('is_published')
                            ->label('Publikasikan di Website?')
                            ->default(true),

                        Forms\Components\FileUpload::make('poster_image')
                            ->label('Poster / Foto Kegiatan')
                            ->image()
                            ->imageEditor()
                            ->directory('events')
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi / Penjelasan Acara')
                            ->placeholder('Jelaskan rincian agenda, materi kajian, atau himbauan untuk jamaah...')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('poster_image')
                    ->label('Poster')
                    ->circular()
                    ->placeholder('-'),

                Tables\Columns\TextColumn::make('date')
                    ->label('Tanggal')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('title')
                    ->label('Nama Kegiatan')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('category')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Kajian' => 'success',
                        'Sholat Jumat' => 'info',
                        'Hari Besar' => 'warning',
                        'Sosial' => 'primary',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('speaker')
                    ->label('Pemateri')
                    ->placeholder('-'),

                Tables\Columns\TextColumn::make('time')
                    ->label('Waktu')
                    ->placeholder('-'),

                Tables\Columns\IconColumn::make('is_published')
                    ->label('Tayang')
                    ->boolean(),
            ])
            ->defaultSort('date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'Kajian' => 'Kajian',
                        'Sholat Jumat' => 'Sholat Jumat',
                        'Hari Besar' => 'Hari Besar',
                        'Sosial' => 'Sosial',
                        'Lainnya' => 'Lainnya',
                    ]),
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Status Tayang'),
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
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
