<?php

namespace App\Filament\Resources\FundExpenses\Pages;

use App\Filament\Resources\FundExpenses\FundExpenseResource;
use Filament\Resources\Pages\CreateRecord;

class CreateFundExpense extends CreateRecord
{
    protected static string $resource = FundExpenseResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
