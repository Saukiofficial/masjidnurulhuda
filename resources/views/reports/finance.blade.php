<!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .header h1 { margin: 0; font-size: 18px; text-transform: uppercase; }
        .header p { margin: 2px 0; font-size: 12px; }

        .meta-table { width: 100%; margin-bottom: 15px; }
        .meta-table td { padding: 3px; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }

        .data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .data-table th, .data-table td { border: 1px solid #ccc; padding: 6px; }
        .data-table th { background-color: #f0f0f0; }

        .summary-box { width: 40%; float: right; border: 1px solid #333; padding: 10px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .clear { clear: both; }

        .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #777; }
    </style>
</head>
<body>

    <div class="header">
        <h1>Masjid Nurul Huda</h1>
        <p>Poreh, Kecamatan Lenteng, Kabupaten Sumenep,<br>Jl. KaliMas, Poreh, Kec. Lenteng, Kab. Sumenep, Provinsi Jawa Timur</p>
        <p>Laporan Keuangan Masjid Nurul Huda </p>
    </div>

    <table class="meta-table">
        <tr>
            <td width="15%" class="font-bold">Laporan:</td>
            <td>{{ $title }}</td>
            <td width="15%" class="font-bold">Periode:</td>
            <td class="text-right">{{ $periode }}</td>
        </tr>
    </table>

    <!-- RINGKASAN SALDO AWAL -->
    <div style="background: #eef; padding: 5px 10px; margin-bottom: 10px; border: 1px solid #ccf;">
        <strong>Saldo Awal Periode:</strong> Rp {{ number_format($saldo_awal, 0, ',', '.') }}
    </div>

    <h3>A. Pemasukan</h3>
    <table class="data-table">
        <thead>
            <tr>
                <th width="15%">Tanggal</th>
                <th>Keterangan / Sumber</th>
                <th width="20%">Jumlah (Rp)</th>
            </tr>
        </thead>
        <tbody>
            @forelse($incomes as $income)
            <tr>
                <td>{{ \Carbon\Carbon::parse($income['date'])->format('d/m/Y') }}</td>
                <td>{{ $income['description'] }}</td>
                <td class="text-right">{{ number_format($income['amount'], 0, ',', '.') }}</td>
            </tr>
            @empty
            <tr><td colspan="3" class="text-center">Tidak ada pemasukan pada periode ini.</td></tr>
            @endforelse
            <tr style="background-color: #f9f9f9; font-weight: bold;">
                <td colspan="2" class="text-right">Total Pemasukan</td>
                <td class="text-right">{{ number_format($total_income, 0, ',', '.') }}</td>
            </tr>
        </tbody>
    </table>

    <h3>B. Pengeluaran</h3>
    <table class="data-table">
        <thead>
            <tr>
                <th width="10%">Tanggal</th>
                <th width="10%">Bukti</th>
                <th>Keterangan / Keperluan</th>
                <th width="20%">Jumlah (Rp)</th>
            </tr>
        </thead>
        <tbody>
            @forelse($expenses as $expense)
            <tr>
                <td>{{ \Carbon\Carbon::parse($expense['date'])->format('d/m/Y') }}</td>
                <td class="text-center">
                    @if(!empty($expense['proof']))
                        <img src="{{ $expense['proof'] }}" style="width:40px; height:40px; object-fit:cover; border:1px solid #ccc;">
                    @else
                        -
                    @endif
                </td>
                <td>{{ $expense['description'] }}</td>
                <td class="text-right">{{ number_format($expense['amount'], 0, ',', '.') }}</td>
            </tr>
            @empty
            <tr><td colspan="4" class="text-center">Tidak ada pengeluaran pada periode ini.</td></tr>
            @endforelse
            <tr style="background-color: #f9f9f9; font-weight: bold;">
                <td colspan="3" class="text-right">Total Pengeluaran</td>
                <td class="text-right">{{ number_format($total_expense, 0, ',', '.') }}</td>
            </tr>
        </tbody>
    </table>

    <div class="summary-box">
        <table width="100%">
            <tr>
                <td>Saldo Awal</td>
                <td class="text-right">{{ number_format($saldo_awal, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td>(+) Total Masuk</td>
                <td class="text-right">{{ number_format($total_income, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td>(-) Total Keluar</td>
                <td class="text-right">{{ number_format($total_expense, 0, ',', '.') }}</td>
            </tr>
            <tr style="font-weight: bold; border-top: 1px solid #333;">
                <td style="padding-top: 5px;">Saldo Akhir</td>
                <td class="text-right" style="padding-top: 5px;">Rp {{ number_format($saldo_akhir, 0, ',', '.') }}</td>
            </tr>
        </table>
    </div>
    <div class="clear"></div>

    @if(!empty($proofs) && count($proofs) > 0)
    <div style="page-break-before: always;"></div>
    <h3>Lampiran Bukti Nota / Kwitansi Pengeluaran</h3>
    <table width="100%">
        <tr>
            @foreach($proofs as $i => $proof)
            <td width="33%" style="vertical-align: top; padding: 6px; text-align: center;">
                <img src="{{ $proof['image'] }}" style="max-width: 100%; max-height: 220px; border: 1px solid #999;">
                <div style="font-size: 10px; margin-top: 4px;">
                    {{ \Carbon\Carbon::parse($proof['date'])->format('d/m/Y') }} - {{ $proof['description'] }}<br>
                    <span class="font-bold">Rp {{ number_format($proof['amount'], 0, ',', '.') }}</span>
                </div>
            </td>
            @if(($i + 1) % 3 == 0)
            </tr><tr>
            @endif
            @endforeach
        </tr>
    </table>
    @endif

    <div class="footer">
        Dicetak otomatis oleh Sistem Masjid Digital pada {{ now()->translatedFormat('d F Y H:i') }}
    </div>

</body>
</html>