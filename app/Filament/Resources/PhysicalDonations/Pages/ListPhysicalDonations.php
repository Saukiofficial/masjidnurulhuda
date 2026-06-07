<?php

namespace App\Filament\Resources\PhysicalDonations\Pages;

use App\Filament\Resources\PhysicalDonations\PhysicalDonationResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPhysicalDonations extends ListRecords
{
    protected static string $resource = PhysicalDonationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->label('Tambah Donasi Fisik'),
        ];
    }
}