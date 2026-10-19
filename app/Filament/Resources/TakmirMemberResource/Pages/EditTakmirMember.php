<?php

namespace App\Filament\Resources\TakmirMemberResource\Pages;

use App\Filament\Resources\TakmirMemberResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTakmirMember extends EditRecord
{
    protected static string $resource = TakmirMemberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
