<?php

namespace App\Filament\Resources\FundCategories;

use App\Filament\Resources\FundCategories\Pages;
use App\Models\FundCategory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class FundCategoryResource extends Resource
{
    protected static ?string $model = FundCategory::class;

    // Perbaikan: Gunakan ?string
    protected static ?string $navigationIcon = 'heroicon-o-tag';

    // Perbaikan: Gunakan ?string
    protected static ?string $navigationGroup = 'Master Data';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Kategori')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Kategori')
                            ->required()
                            ->placeholder('Contoh: Renovasi Kubah, Santunan Yatim')
                            ->maxLength(255),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Aktif?')
                            ->default(true),
                        Forms\Components\Textarea::make('description')
                            ->label('Keterangan')
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Kategori')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('incomes_count')
                    ->counts('incomes')
                    ->label('Jml Pemasukan'),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Status')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
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
            'index' => Pages\ListFundCategories::route('/'),
            'create' => Pages\CreateFundCategory::route('/create'),
            'edit' => Pages\EditFundCategory::route('/{record}/edit'),
        ];
    }
}
