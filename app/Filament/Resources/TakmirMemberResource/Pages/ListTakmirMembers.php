<?php

namespace App\Filament\Resources\TakmirMemberResource\Pages;

use App\Filament\Resources\TakmirMemberResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTakmirMembers extends ListRecords
{
    protected static string $resource = TakmirMemberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
