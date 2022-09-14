exports.commands = [
  { command: 'follow', description: 'Otomatis mengikuti konten setiap harinya' },
  { command: 'pulo_follow', description: '[GROUP] Otomatis mengikuti konten setiap harinya' },
  { command: 'latest', description: 'Melihat konten hari ini' },
  { command: 'unfollow', description: 'Otomatis berhenti mengikuti konten setiap harinya' },
  {
    command: 'pulo_unfollow',
    description: '[GROUP] Otomatis berhenti mengikuti konten setiap harinya',
  },
];

exports.message = {
  welcome: `Selamat datang di Pulo Bot - Kumpulan konten developer Indonesia

Command yang tersedia:
/follow - Mendapat konten terbaru setiap harinya
/unfollow - Berhenti mendapat konter terbaru setiap harinya
/latest - Melihat konten terbaru hari ini

Command yang tersedia juga dapat dilihat di menu sebelah kiri bawah`,
  follow: `Berhasil mengikuti Pulo Bot`,
  unfollow: `Berhasil berhenti mengikuti Pulo Bot`,
};
