import { allServices as originalServices } from './servicesData';

export const serviceCategories = [
  { id: 'all', label: 'Semua Perkhidmatan' },
  { id: 'software-development', label: 'Pembangunan Perisian' },
  { id: 'application-development', label: 'Pembangunan Aplikasi' },
  { id: 'technology-services', label: 'Perkhidmatan Teknologi' },
  { id: 'quality-devops', label: 'Kualiti & DevOps' },
];

export const allServices = originalServices.map((service) => {
  switch (service.id) {
    case 'software-consulting':
      return {
        ...service,
        title: 'Perundingan Perisian',
        description: 'Perkhidmatan nasihat teknologi strategik untuk menyelaraskan peta jalan IT anda dengan matlamat perniagaan, mengurangkan risiko, dan mempercepatkan transformasi digital.',
        features: ['Penilaian Teknologi', 'Perancangan Seni Bina', 'Pemilihan Vendor', 'Reka Bentuk Peta Jalan'],
      };
    case 'erp-software-development':
      return {
        ...service,
        title: 'Pembangunan Perisian ERP',
        description: 'Sistem perancangan sumber perusahaan tersuai yang menyatukan operasi anda — kewangan, HR, rantaian bekalan, dan inventori — ke dalam satu platform.',
        features: ['Penyesuaian Modul', 'Automasi Aliran Kerja', 'Pelaporan Masa Nyata', 'Integrasi Pihak Ketiga'],
      };
    case 'custom-crm-development':
      return {
        ...service,
        title: 'Pembangunan CRM Tersuai',
        description: 'Sistem pengurusan perhubungan pelanggan tersuai yang direka untuk mengurus petunjuk, mengautomasikan saluran jualan, dan meningkatkan pengekalan pelanggan.',
        features: ['Pengurusan Petunjuk', 'Saluran Paip Jualan', 'Analisis Pelanggan', 'Automasi Pemasaran'],
      };

    case 'product-development':
      return {
        ...service,
        title: 'Pembangunan Produk',
        description: 'Kejuruteraan produk hujung ke hujung dari idea hingga pelancaran — termasuk pembangunan MVP, kitaran lelaran, dan keluaran sedia pasaran.',
        features: ['Strategi MVP', 'Sprint Agile', 'Ujian Pengguna', 'Sokongan Go-to-Market'],
      };
    case 'maintenance-support':
      return {
        ...service,
        title: 'Penyelenggaraan & Sokongan',
        description: 'Sokongan aplikasi berterusan, pembetulan pepijat, pengoptimuman prestasi, dan pemantauan infrastruktur untuk memastikan sistem berjalan 24/7.',
        features: ['Pemantauan 24/7', 'Penyelesaian Pepijat', 'Penalaan Prestasi', 'Tambalan Keselamatan'],
      };
    case 'web-application':
      return {
        ...service,
        title: 'Pembangunan Aplikasi Web',
        description: 'Aplikasi web stack penuh yang dibina dengan React, Next.js, dan Node.js — dioptimumkan untuk prestasi, kebolehaksesan, dan skala.',
        features: ['Reka Bentuk Responsif', 'Aplikasi Web Progresif', 'API REST & GraphQL', 'Ciri Masa Nyata'],
      };
    case 'custom-application':
      return {
        ...service,
        title: 'Pembangunan Aplikasi Tersuai',
        description: 'Perisian khusus yang dibina dari awal untuk menyelesaikan cabaran perniagaan unik yang tidak dapat ditangani oleh produk sedia ada.',
        features: ['Analisis Keperluan', 'Seni Bina Tersuai', 'Backend Boleh Skala', 'Keselamatan Perusahaan'],
      };
    case 'application-modernization':
      return {
        ...service,
        title: 'Pemodenan Aplikasi',
        description: 'Ubah sistem warisan kepada aplikasi moden, asli awan menggunakan rangka kerja dan strategi migrasi terkini.',
        features: ['Migrasi Warisan', 'Pemfaktoran Semula Kod', 'Penukaran Asli Awan', 'Naik Taraf Stack Teknologi'],
      };
    case 'application-management':
      return {
        ...service,
        title: 'Pengurusan Aplikasi',
        description: 'Pengurusan kitaran hayat aplikasi yang komprehensif termasuk pemantauan, pengoptimuman, tindak balas insiden, dan peningkatan berterusan.',
        features: ['Pengurusan Kitaran Hayat', 'Tindak Basas Insiden', 'Pengurusan SLA', 'Peningkatan Berterusan'],
      };
    case 'application-maintenance':
      return {
        ...service,
        title: 'Penyelenggaraan Aplikasi',
        description: 'Perkhidmatan penyelenggaraan proaktif untuk memastikan aplikasi anda kekal selamat, dikemas kini, dan berprestasi pada kecekapan puncak.',
        features: ['Penyelenggaraan Pencegahan', 'Naik Taraf Versi', 'Ujian Keserasian', 'Sandaran & Pemulihan'],
      };

    case 'application-integration':
      return {
        ...service,
        title: 'Integrasi Aplikasi',
        description: 'Hubungkan sistem perniagaan yang berbeza, API pihak ketiga, dan sumber data secara lancar ke dalam ekosistem bersatu.',
        features: ['Pembangunan API', 'Penyegerakan Data', 'Penyelesaian Perisian Perantara', 'Integrasi iPaaS'],
      };
    case 'ecommerce-application':
      return {
        ...service,
        title: 'Aplikasi E-Dagang',
        description: 'Kedai dalam talian boleh skala dengan gerbang pembayaran selamat, pengurusan inventori, dan aliran daftar keluar yang dioptimumkan untuk penukaran.',
        features: ['Integrasi Pembayaran', 'Sistem Inventori', 'Dagangan Mudah Alih', 'Papan Pemuka Analisis'],
      };
    case 'mobile-app-development':
      return {
        ...service,
        title: 'Pembangunan Aplikasi Mudah Alih',
        description: 'Aplikasi mudah alih iOS/Android asli dan rentas platform dibina dengan React Native dan Flutter untuk jangkauan dan prestasi maksimum.',
        features: ['Rentas Platform', 'Prestasi Asli', 'Pemberitahuan Tolak', 'Sokongan Luar Talian'],
      };
    case 'hire-dedicated-developers':
      return {
        ...service,
        title: 'Sewa Pemaju Berdedikasi',
        description: 'Tingkatkan pasukan anda dengan pemaju berdedikasi sepenuh masa yang telah ditapis terlebih dahulu, mahir dalam React, Node.js, Python, Java, dan lain-lain.',
        features: ['Jurutera Ditapis', 'Penglibatan Fleksibel', 'Standup Harian', 'Perlindungan IP'],
      };
    case 'full-stack-development':
      return {
        ...service,
        title: 'Pembangunan Stack Penuh',
        description: 'Pembangunan lengkap dari frontend ke backend menggunakan stack teknologi moden — React, Node.js, Python, PostgreSQL, MongoDB, dan lain-lain.',
        features: ['Frontend & Backend', 'Reka Bentuk Pangkalan Data', 'Seni Bina API', 'Penggunaan & CI/CD'],
      };
    case 'saas-development':
      return {
        ...service,
        title: 'Pembangunan SaaS',
        description: 'Platform SaaS pelbagai penyewa dengan pengebilan langganan, akses berasaskan peranan, analisis penggunaan, dan penyesuaian label putih.',
        features: ['Pelbagai Penyewa', 'Pengebilan Langganan', 'Analisis Penggunaan', 'Pilihan Label Putih'],
      };

    case 'ux-ui-design':
      return {
        ...service,
        title: 'Reka Bentuk UX/UI',
        description: 'Perkhidmatan reka bentuk berpusatkan pengguna — dari rangka wayar hingga prototaip kesetiaan tinggi — memastikan produk anda intuitif dan menarik.',
        features: ['Penyelidikan Pengguna', 'Rangka Wayar', 'Prototaip', 'Sistem Reka Bentuk'],
      };

    case 'qa-testing':
      return {
        ...service,
        title: 'QA & Ujian',
        description: 'Perkhidmatan ujian komprehensif — manual, automatik, prestasi, dan ujian keselamatan — untuk menghantar perisian yang boleh dipercayai dan bebas pepijat.',
        features: ['Ujian Automatik', 'Ujian Prestasi', 'Audit Keselamatan', 'Ujian Regresi'],
      };

    default:
      return service;
  }
});
