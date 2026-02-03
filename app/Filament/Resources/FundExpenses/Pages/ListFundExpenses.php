<?php

namespace App\Filament\Resources\FundExpenses\Pages;

use App\Filament\Resources\FundExpenses\FundExpenseResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFundExpenses extends ListRecords
{
    protected static string $resource = FundExpenseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
