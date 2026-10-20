<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TakmirMemberResource\Pages;
use App\Models\TakmirMember;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TakmirMemberResource extends Resource
{
    protected static ?string $model = TakmirMember::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'Manajemen Masjid';

    protected static ?string $navigationLabel = 'Pengurus Takmir';

    protected static ?string $modelLabel = 'Pengurus Takmir';

    protected static ?string $pluralModelLabel = 'Pengurus Takmir';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Pengurus')
                    ->description('Lengkapi data anggota struktur kepengurusan takmir masjid.')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Lengkap & Gelar')
                            ->placeholder('Contoh: Ahmad Khairi')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('position')
                            ->label('Jabatan')
                            ->placeholder('Contoh: Ketua Takmir, Sekretaris, Bendahara')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('period')
                            ->label('Masa Bakti')
                            ->placeholder('Contoh: 2024 - 2029')
                            ->default('2024 - 2029')
                            ->maxLength(100),

                        Forms\Components\TextInput::make('phone')
                            ->label('No. WhatsApp (Opsional)')
                            ->tel()
                            ->placeholder('Contoh: 081234567890')
                            ->maxLength(50),

                        Forms\Components\TextInput::make('sort_order')
                            ->label('Nomor Urut Tampilan')
                            ->numeric()
                            ->default(0)
                            ->helperText('Angka lebih kecil akan tampil lebih atas/dulu.'),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Status Aktif')
                            ->default(true)
                            ->helperText('Tampilkan di halaman profil website.'),

                        Forms\Components\FileUpload::make('photo')
                            ->label('Foto Pengurus')
                            ->image()
                            ->imageEditor()
                            ->directory('takmir')
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('bio')
                            ->label('Keterangan / Tugas Pokok')
                            ->placeholder('Tugas atau profil singkat pengurus...')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo')
                    ->label('Foto')
                    ->circular()
                    ->defaultImageUrl('https://ui-avatars.com/api/?background=0D9488&color=fff&name=Takmir'),

                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Urutan')
                    ->sortable()
                    ->badge()
                    ->color('gray'),

                Tables\Columns\TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('position')
                    ->label('Jabatan')
                    ->searchable()
                    ->badge()
                    ->color('primary'),

                Tables\Columns\TextColumn::make('period')
                    ->label('Periode'),

                Tables\Columns\TextColumn::make('phone')
                    ->label('WhatsApp')
                    ->placeholder('-'),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Status Aktif'),
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
            'index' => Pages\ListTakmirMembers::route('/'),
            'create' => Pages\CreateTakmirMember::route('/create'),
            'edit' => Pages\EditTakmirMember::route('/{record}/edit'),
        ];
    }
}
