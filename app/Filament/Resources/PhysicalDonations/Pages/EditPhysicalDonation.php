<?php

namespace App\Filament\Resources\PhysicalDonations\Pages;

use App\Filament\Resources\PhysicalDonations\PhysicalDonationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPhysicalDonation extends EditRecord
{
    protected static string $resource = PhysicalDonationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}