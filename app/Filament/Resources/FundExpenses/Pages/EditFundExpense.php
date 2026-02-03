<?php

namespace App\Filament\Resources\FundExpenses\Pages;

use App\Filament\Resources\FundExpenses\FundExpenseResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFundExpense extends EditRecord
{
    protected static string $resource = FundExpenseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
