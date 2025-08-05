# 🔗 LinkCini - URL Kısaltma Uygulaması

LinkCini, uzun URL'leri kısa ve yönetilebilir linklere dönüştürmenizi sağlayan modern bir web uygulamasıdır. Tamamen TypeScript ile yazılmış olup, React ve Express.js kullanılarak geliştirilmiştir.

## 🌟 Özellikler

- ⚡ Anında URL kısaltma
- 📊 Tıklanma istatistikleri
- 🔗 Özel URL oluşturma
- 📱 Responsive tasarım
- ⚡ Hızlı yönlendirme
- 🔒 Güvenli bağlantılar

## 🛠️ Teknoloji Yığını

### Backend
- **Dil:** TypeScript 5.0+
- **Framework:** Express.js 4.18+
- **Veritabanı:** SQLite (Prisma ORM)
- **Doğrulama:** Zod
- **API Dokümantasyonu:** Swagger (Yakında)

### Frontend
- **Dil:** TypeScript 5.0+
- **Kütüphane:** React 18+
- **State Yönetimi:** React Hooks
- **HTTP İstemcisi:** Fetch API
- **Stil:** CSS Modules
- **Build Aracı:** Vite 4.0+

## 🚀 Hızlı Başlangıç

### Ön Gereksinimler
- Node.js 18+
- npm 9+ veya yarn 1.22+
- Git

### Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/hazarute/LinkCini1.0.git
   cd LinkCini1.0
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   # Kök dizinde
   npm install
   
   # Backend bağımlılıkları
   cd server
   npm install
   
   # Frontend bağımlılıkları
   cd ../client
   npm install
   ```

3. Veritabanını başlatın:
   ```bash
   cd server
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. Uygulamayı başlatın:
   ```bash
   # Kök dizininde
   npm run dev
   ```

   Bu komut hem backend hem de frontend sunucularını aynı anda başlatacaktır.

## 🌐 Erişim

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **API Dokümantasyonu:** http://localhost:3001/api-docs (Yakında)

## 📂 Proje Yapısı

```
LinkCini1.0/
├── client/                 # Frontend uygulaması
│   ├── public/            # Statik dosyalar
│   └── src/               # Kaynak kodları
│       ├── components/    # React bileşenleri
│       ├── types/         # TypeScript tipleri
│       └── App.tsx        # Ana uygulama bileşeni
│
└── server/                # Backend uygulaması
    ├── prisma/           # Veritabanı şemaları
    └── src/              # Kaynak kodları
        ├── controllers/   # API kontrolcüleri
        ├── services/      # İş mantığı servisleri
        └── index.ts       # Uygulama giriş noktası
```

## 🧪 Test

```bash
# Backend testleri
cd server
npm test

# Frontend testleri
cd ../client
npm test
```

## 🤝 Katkıda Bulunma

1. Fork'layın (https://github.com/hazarute/LinkCini1.0/fork)
2. Yeni özellik için bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'e push yapın (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır - ayrıntılar için `LICENSE` dosyasına bakınız.

## 📞 İletişim

Proje Sahibi: Hazar ÜTE
E-posta: [e-posta@example.com](mailto:e-posta@example.com)
GitHub: [@hazarute](https://github.com/hazarute)

## 🙏 Teşekkürler

- [Vite](https://vitejs.dev/) ekibine hızlı geliştirme ortamı için
- [Prisma](https://www.prisma.io/) ekibine harika ORM çözümü için
- Tüm açık kaynak topluluğuna
