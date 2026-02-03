<?php

namespace App\Filament\Resources\RenovationProgresses\Pages;

use App\Filament\Resources\RenovationProgresses\RenovationProgressResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditRenovationProgress extends EditRecord
{
    protected static string $resource = RenovationProgressResource::class;

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
