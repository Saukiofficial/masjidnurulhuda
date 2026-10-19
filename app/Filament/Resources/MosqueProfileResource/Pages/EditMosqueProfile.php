<?php

namespace App\Filament\Resources\MosqueProfileResource\Pages;

use App\Filament\Resources\MosqueProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMosqueProfile extends EditRecord
{
    protected static string $resource = MosqueProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
