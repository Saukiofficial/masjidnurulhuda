<?php

namespace App\Filament\Resources\FundIncomes\Pages;

use App\Filament\Resources\FundIncomes\FundIncomeResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFundIncomes extends ListRecords
{
    protected static string $resource = FundIncomeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
