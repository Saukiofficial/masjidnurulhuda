<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\ContactMessage;
use App\Models\MosqueProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $profile = MosqueProfile::first();
        $bankAccounts = BankAccount::where('is_active', true)->get();

        return Inertia::render('Contact', [
            'profile' => $profile,
            'bankAccounts' => $bankAccounts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:100',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        $validated['status'] = 'unread';

        ContactMessage::create($validated);

        return back()->with('success', 'Alhamdulillah, pesan/aspirasi Anda telah berhasil dikirim ke pengurus takmir.');
    }
}
