<?php

namespace App\Filament\Resources\FundIncomes;

use App\Filament\Resources\FundIncomes\Pages;
use App\Models\FundIncome;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use BackedEnum;
use UnitEnum;

class FundIncomeResource extends Resource
{
    protected static ?string $model = FundIncome::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-trending-up';

    protected static ?string $navigationLabel = 'Pemasukan';

    protected static ?string $navigationGroup = 'Keuangan';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Detail Pemasukan')
                    ->schema([
                        Forms\Components\Select::make('fund_category_id')
                            ->relationship('category', 'name')
                            ->label('Kategori Dana')
                            ->searchable()
                            ->preload()
                            ->required(),
                        Forms\Components\DatePicker::make('transaction_date')
                            ->label('Tanggal Transaksi')
                            ->default(now())
                            ->required(),
                        Forms\Components\TextInput::make('title')
                            ->label('Judul Pemasukan')
                            ->placeholder('Contoh: Kotak Amal Jumat')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('amount')
                            ->label('Nominal (Rp)')
                            ->numeric()
                            ->prefix('Rp')
                            ->required(),
                        Forms\Components\Textarea::make('description')
                            ->label('Catatan (Opsional)')
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('transaction_date')
                    ->label('Tanggal')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    // PERBAIKAN: Ubah return type jadi ?string dan handle null
                    ->description(fn (FundIncome $record): ?string => $record->description ? Str::limit($record->description, 30) : null),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Kategori')
                    ->badge()
                    ->color('success'),
                Tables\Columns\TextColumn::make('amount')
                    ->label('Nominal')
                    ->money('IDR')
                    ->weight('bold')
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Admin')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('transaction_date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('fund_category_id')
                    ->label('Kategori')
                    ->relationship('category', 'name'),
                Tables\Filters\Filter::make('transaction_date')
                    ->form([
                        Forms\Components\DatePicker::make('from')->label('Dari Tanggal'),
                        Forms\Components\DatePicker::make('until')->label('Sampai Tanggal'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn ($q) => $q->whereDate('transaction_date', '>=', $data['from']))
                            ->when($data['until'], fn ($q) => $q->whereDate('transaction_date', '<=', $data['until']));
                    }),
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
            'index' => Pages\ListFundIncomes::route('/'),
            'create' => Pages\CreateFundIncome::route('/create'),
            'edit' => Pages\EditFundIncome::route('/{record}/edit'),
        ];
    }
}
