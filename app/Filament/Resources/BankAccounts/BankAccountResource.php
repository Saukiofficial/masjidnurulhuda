<?php

namespace App\Filament\Resources\BankAccounts;

use App\Filament\Resources\BankAccounts\Pages;
use App\Models\BankAccount;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BankAccountResource extends Resource
{
    protected static ?string $model = BankAccount::class;

    protected static ?string $navigationIcon = 'heroicon-o-credit-card';

    protected static ?string $navigationGroup = 'Master Data';

    protected static ?string $navigationLabel = 'Rekening Bank';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Rekening')
                    ->schema([
                        Forms\Components\TextInput::make('bank_name')
                            ->label('Nama Bank')
                            ->placeholder('Contoh: Bank Syariah Indonesia (BSI)')
                            ->required(),
                        Forms\Components\TextInput::make('account_number')
                            ->label('Nomor Rekening')
                            ->numeric()
                            ->required(),
                        Forms\Components\TextInput::make('account_name')
                            ->label('Atas Nama')
                            ->placeholder('Contoh: Yayasan Masjid...')
                            ->required(),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Tampilkan di Website?')
                            ->default(true),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('bank_name')
                    ->label('Bank')
                    ->searchable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('account_number')
                    ->label('No. Rekening')
                    ->copyable()
                    ->icon('heroicon-m-clipboard'),
                Tables\Columns\TextColumn::make('account_name')
                    ->label('Atas Nama'),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
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
            'index' => Pages\ListBankAccounts::route('/'),
            'create' => Pages\CreateBankAccount::route('/create'),
            'edit' => Pages\EditBankAccount::route('/{record}/edit'),
        ];
    }
}
