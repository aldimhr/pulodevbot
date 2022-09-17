exports.commands = [
  { command: 'follow', description: 'Mengikuti konten setiap harinya' },
  { command: 'pulo', description: 'follow' },
  { command: 'latest', description: 'Melihat konten hari ini' },
  { command: 'unfollow', description: 'Berhenti mengikuti konten setiap harinya' },
  {
    command: 'unpulo',
    description: 'unfollow',
  },
];

exports.message = {
  welcome: `Selamat datang di PuloDev Bot - Kumpulan konten developer Indonesia

Command yang tersedia:
/follow - Mendapat konten terbaru setiap harinya
/unfollow - Berhenti mendapat konten terbaru setiap harinya
/latest - Melihat konten terbaru hari ini

Command yang tersedia juga dapat dilihat di menu sebelah kiri bawah`,
  follow: `Berhasil mengikuti PuloDev Bot`,
  unfollow: `Berhasil berhenti mengikuti PuloDev Bot`,
};
