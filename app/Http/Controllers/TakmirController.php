<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\MosqueProfile;
use App\Models\TakmirMember;
use Inertia\Inertia;

class TakmirController extends Controller
{
    public function __invoke()
    {
        $profile = MosqueProfile::first();
        $members = TakmirMember::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();
        $bankAccounts = BankAccount::where('is_active', true)->get();

        return Inertia::render('Management', [
            'profile' => $profile,
            'members' => $members,
            'bankAccounts' => $bankAccounts,
        ]);
    }
}
