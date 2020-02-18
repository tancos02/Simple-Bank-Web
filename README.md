# Bank Pro

## Deskripsi Bank Pro

Bank Pro menggunakan ReactJS. Pada aplikasi ini, pengguna dapat melakukan transaksi di Bank Pro. Pengguna yang dapat menggunakan aplikasi adalah nasabah Bank Pro. Berikut adalah hal yang dapat dilakukan oleh pengguna pada aplikasi Bank Pro.

1. Login
Nasabah login dengan memasukkan bank nomor rekening. Jika nasabah berhasil masuk, akan muncul halaman utama yang menampilkan nama pemilik, nomor rekening, nama bank, dan saldo terakhir. Pada menu utama, pengguna juga dapat memilih untuk transfer ke rekening lain dan melihat riwayat transaksi.

2. Melakukan Transfer
Pengguna dapat mentransfer uang ke rekening lain di Bank Pro. Tidak ada potongan tambahan ketika mentransfer ke rekening bank lain. Saat transaksi selesai, ada pesan berhasil atau gagal yang muncul.

3. Melihat Riwayat Transaksi
Pada riwayat transaksi, pengguna dapat melihat daftar data berikut: waktu transaksi, jenis transaksi (debit/kredit), jumlah transaksi, dan rekening terkait (jika ada).

## Screenshot

### Login

![](screenshot/Login.jpg)

### Home

![](screenshot/Home.jpg)

### Transfer

![](screenshot/Transfer.jpg)

### Transaction History

![](screenshot/Transfer_History.jpg)

## Pembagian Kerja

### WBD

1. Login: 13517111, 13517141
2. Halaman utama: 13517111, 13517141
3. Transfer: 13517111
4. Transaction History: 13516066, 13517111

### DPPL

1. CI/CD: 13517111, 13517141
2. Eksplorasi dan setup mesin deployment: 13517111
3. Unit testing: 13517111

## URL Deployment

http://ec2-54-234-117-233.compute-1.amazonaws.com:3001