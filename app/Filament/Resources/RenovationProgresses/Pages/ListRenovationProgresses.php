<?php

namespace App\Filament\Resources\RenovationProgresses\Pages;

use App\Filament\Resources\RenovationProgresses\RenovationProgressResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListRenovationProgresses extends ListRecords
{
    protected static string $resource = RenovationProgressResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
