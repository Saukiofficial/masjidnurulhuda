<?php

namespace App\Filament\Resources\MosqueProfileResource\Pages;

use App\Filament\Resources\MosqueProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMosqueProfiles extends ListRecords
{
    protected static string $resource = MosqueProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
