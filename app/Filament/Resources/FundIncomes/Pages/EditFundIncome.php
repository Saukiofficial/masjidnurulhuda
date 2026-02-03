<?php

namespace App\Filament\Resources\FundIncomes\Pages;

use App\Filament\Resources\FundIncomes\FundIncomeResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditFundIncome extends EditRecord
{
    protected static string $resource = FundIncomeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
