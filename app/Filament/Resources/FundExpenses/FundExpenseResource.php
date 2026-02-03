<?php

namespace App\Filament\Resources\FundExpenses;

use App\Filament\Resources\FundExpenses\Pages;
use App\Models\FundExpense;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use BackedEnum;
use UnitEnum;

class FundExpenseResource extends Resource
{
    protected static ?string $model = FundExpense::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-trending-down';

    protected static ?string $navigationLabel = 'Pengeluaran';

    protected static ?string $navigationGroup = 'Keuangan';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Detail Pengeluaran')
                    ->schema([
                        Forms\Components\Select::make('fund_category_id')
                            ->relationship('category', 'name')
                            ->label('Sumber Dana')
                            ->searchable()
                            ->preload()
                            ->required(),
                        Forms\Components\DatePicker::make('transaction_date')
                            ->label('Tanggal Pengeluaran')
                            ->default(now())
                            ->required(),
                        Forms\Components\TextInput::make('title')
                            ->label('Keperluan')
                            ->placeholder('Contoh: Beli Semen 50 Sak')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('amount')
                            ->label('Nominal (Rp)')
                            ->numeric()
                            ->prefix('Rp')
                            ->required(),

                        // Fitur Upload Bukti (Khusus Pengeluaran)
                        Forms\Components\FileUpload::make('proof_file')
                            ->label('Bukti Kwitansi/Nota')
                            ->image()
                            ->directory('expenses-proof')
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('description')
                            ->label('Catatan Tambahan')
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
                Tables\Columns\ImageColumn::make('proof_file')
                    ->label('Bukti')
                    ->circular(),
                Tables\Columns\TextColumn::make('title')
                    ->label('Keperluan')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Sumber Dana')
                    ->badge()
                    ->color('danger'), // Merah untuk pengeluaran
                Tables\Columns\TextColumn::make('amount')
                    ->label('Nominal')
                    ->money('IDR')
                    ->weight('bold')
                    ->color('danger'),
            ])
            ->defaultSort('transaction_date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('fund_category_id')
                    ->label('Kategori')
                    ->relationship('category', 'name'),
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
            'index' => Pages\ListFundExpenses::route('/'),
            'create' => Pages\CreateFundExpense::route('/create'),
            'edit' => Pages\EditFundExpense::route('/{record}/edit'),
        ];
    }
}
