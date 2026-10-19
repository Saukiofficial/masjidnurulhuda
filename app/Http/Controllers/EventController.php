<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Event;
use App\Models\MosqueProfile;
use Inertia\Inertia;

class EventController extends Controller
{
    public function __invoke()
    {
        $profile = MosqueProfile::first();
        
        $upcomingEvents = Event::where('is_published', true)
            ->where('date', '>=', now()->toDateString())
            ->orderBy('date', 'asc')
            ->get();

        $pastEvents = Event::where('is_published', true)
            ->where('date', '<', now()->toDateString())
            ->orderBy('date', 'desc')
            ->take(6)
            ->get();

        $bankAccounts = BankAccount::where('is_active', true)->get();

        return Inertia::render('Events', [
            'profile' => $profile,
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents,
            'bankAccounts' => $bankAccounts,
        ]);
    }
}
