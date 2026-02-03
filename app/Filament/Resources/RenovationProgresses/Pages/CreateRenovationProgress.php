<?php

namespace App\Filament\Resources\RenovationProgresses\Pages;

use App\Filament\Resources\RenovationProgresses\RenovationProgressResource;
use Filament\Resources\Pages\CreateRecord;

class CreateRenovationProgress extends CreateRecord
{
    protected static string $resource = RenovationProgressResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
