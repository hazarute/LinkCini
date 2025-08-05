### Proje Anayasası v1.0: LinkCini

**Proje Adı:** LinkCini
**Tarih:** 05.08.2025
**Versiyon:** 1.0 (MVP)
**Teknoloji Yığını:** Full-stack TypeScript

-----

### 1\. Proje Özeti ve Amaç

  * **Kısa Açıklama:** Kullanıcıların uzun URL'leri girerek bunları kalıcı, kısa ve yönetilebilir linklere dönüştürmesini sağlayan kişisel bir web uygulaması.
  * **Projenin Amacı ve Çözdüğü Sorun:** Uzun ve karmaşık linkleri sosyal medya, mesajlaşma uygulamaları veya sunumlar gibi yerlerde paylaşmayı kolaylaştırmak. Kullanıcıya kendi linkleri üzerinde kontrol ve basit analiz imkanı sunmak.
  * **Hedef Kitle:** Sık sık link paylaşımı yapan geliştiriciler, sosyal medya kullanıcıları ve dijital pazarlamacılar.
  * **Minimum Viable Product (MVP) Kapsamındaki Temel Özellikler:**
    1.  Ana sayfada uzun bir URL'nin girileceği bir form alanı olması.
    2.  Girilen uzun URL için benzersiz, kısa bir kod (`shortCode`) üretilmesi.
    3.  Orijinal URL ve kısa kodun veritabanına kaydedilmesi.
    4.  Kullanıcıya oluşturulan kısa linkin (`site.com/shortCode`) sunulması.
    5.  Kısa linke gidildiğinde, kullanıcının orijinal URL'ye yönlendirilmesi.
    6.  **(Bonus MVP Özelliği):** Her linkin kaç defa tıklandığının sayılması ve gösterilmesi.

-----

### 2\. Teknik Gereksinimler ve Araçlar (Teknik Yığın)

  * **Çalışma Ortamı:** Node.js
  * **Backend (Sunucu):**
      * **Dil:** TypeScript
      * **Framework:** Express.js
      * **Veritabanı ORM:** Prisma (Type-safe veritabanı erişimi için)
      * **Veritabanı:** SQLite (Basit, dosya tabanlı ve sunucusuz)
  * **Frontend (İstemci):**
      * **Dil:** TypeScript
      * **Framework/Kütüphane:** React
      * **Build Aracı:** Vite (Hızlı geliştirme ortamı için)
      * **Styling:** CSS Modules veya Tailwind CSS (Kararlaştırılacak)
  * **Diğer Araçlar:**
      * `concurrently`: Hem backend hem de frontend sunucusunu tek komutla başlatmak için.
      * `nodemon`: Backend'de yapılan değişikliklerde sunucuyu otomatik yeniden başlatmak için.

-----

### 3\. Klasör ve Dosya Mimarisi

```
/link-cini/
|
├── /client/                  # Frontend React Uygulaması
|   ├── /src/
|   |   ├── /components/
|   |   |   ├── UrlForm.tsx
|   |   |   └── ResultDisplay.tsx
|   |   ├── App.tsx
|   |   └── main.tsx
|   ├── index.html
|   ├── package.json
|   └── tsconfig.json
|
├── /server/                  # Backend Express Uygulaması
|   ├── /prisma/
|   |   ├── schema.prisma     # Veritabanı modeli burada tanımlanacak
|   |   └── dev.db            # SQLite veritabanı dosyası
|   |
|   ├── /src/
|   |   ├── controllers/
|   |   |   └── url.controller.ts  # HTTP isteklerini yöneten mantık
|   |   |
|   |   ├── services/
|   |   |   └── url.service.ts     # İş mantığı ve veritabanı işlemleri
|   |   |
|   |   └── index.ts          # Sunucunun başlangıç noktası
|   |
|   ├── package.json
|   └── tsconfig.json
|
└── package.json              # Proje kök package.json (concurrently script'leri için)
```

-----

### 4\. Modüler Planlama (Detaylı Görev Dökümü)

#### Backend (`/server/src/`)

  * **Dosya: `prisma/schema.prisma`**

      * **Sorumluluğu:** Veritabanı modelini tanımlar.
      * **İçereceği Model:** `Url` adında bir model.
          * `id`: Int (Otomatik artan, Primary Key)
          * `originalUrl`: String
          * `shortCode`: String (Benzersiz)
          * `clickCount`: Int (Varsayılan: 0)
          * `createdAt`: DateTime

  * **Dosya: `services/url.service.ts`**

      * **Sorumluluğu:** Tüm iş mantığını ve veritabanı operasyonlarını yürütür.
      * **İçereceği Fonksiyonlar:**
          * `createShortUrl(originalUrl: string)`:
            1.  Benzersiz bir `shortCode` (örn: 6 haneli rastgele karakter) üretir.
            2.  Bu kodun veritabanında daha önce kullanılmadığından emin olur.
            3.  `originalUrl` ve `shortCode`'u Prisma kullanarak veritabanına kaydeder.
            4.  Oluşturulan `Url` nesnesini döndürür.
          * `findUrlByShortCode(shortCode: string)`:
            1.  Verilen `shortCode`'a sahip URL'yi veritabanında arar.
            2.  Bulursa `clickCount`'ı bir artırır.
            3.  Bulunan `Url` nesnesinin `originalUrl`'ini döndürür.
            4.  Bulamazsa `null` döndürür.

  * **Dosya: `controllers/url.controller.ts`**

      * **Sorumluluğu:** HTTP isteklerini alır, ilgili servis fonksiyonunu çağırır ve HTTP cevabını döner.
      * **İçereceği Fonksiyonlar/Routes:**
          * `POST /api/shorten`:
            1.  Request body'sinden `originalUrl`'i alır.
            2.  `url.service.createShortUrl()` fonksiyonunu çağırır.
            3.  Sonucu (oluşturulan kısa link) JSON olarak kullanıcıya döner.
          * `GET /:shortCode`:
            1.  URL'den `shortCode`'u alır.
            2.  `url.service.findUrlByShortCode()` fonksiyonunu çağırır.
            3.  Bir `originalUrl` bulursa, kullanıcıyı o adrese yönlendirir (301 Redirect).
            4.  Bulamazsa 404 Not Found hatası döner.

#### Frontend (`/client/src/`)

  * **Dosya: `components/UrlForm.tsx`**
      * **Sorumluluğu:** Kullanıcının uzun URL girdiği input ve butonu içeren form.
      * **İş Mantığı:** Form gönderildiğinde, içindeki URL'yi alır ve backend'in `/api/shorten` endpoint'ine bir POST isteği gönderir.
  * **Dosya: `components/ResultDisplay.tsx`**
      * **Sorumluluğu:** Backend'den gelen başarılı cevap sonrası oluşturulan yeni kısa linki ve bir "Kopyala" butonunu gösterir.
  * **Dosya: `App.tsx`**
      * **Sorumluluğu:** Ana uygulama bileşeni. `UrlForm` ve `ResultDisplay` bileşenlerini içerir ve aralarındaki state (durum) yönetimini yapar.

#### Frontend Uygulama Giriş Noktaları (Entry Points) (LinkCini Proje Anayasası - Yama 1.0.1)

* **Dosya: `/client/index.html`**
    * **Sorumluluğu:** React uygulamasının içine yerleşeceği ana HTML iskeletini oluşturur. Tarayıcının ilk yüklediği dosyadır.
    * **Temel İçerik:**
        1.  Standart HTML5 yapısı (`<!DOCTYPE html>`).
        2.  Mobil uyumluluk için `<meta name="viewport">` etiketi.
        3.  Uygulama başlığı için `<title>LinkCini</title>`.
        4.  React'in uygulama bileşenlerini render edeceği, `<body>` içinde yer alan tek bir `div`: `<div id="root"></div>`.
        5.  Uygulamanın JavaScript kodunu yüklemek için `main.tsx` dosyasını işaret eden bir `<script>` etiketi: `<script type="module" src="/src/main.tsx"></script>`.

* **Dosya: `/client/src/main.tsx`**
    * **Sorumluluğu:** React uygulamasını başlatan ve ana `<App />` bileşenini `index.html` içerisindeki `<div id="root">` elemanına bağlayan TypeScript dosyasıdır.
    * **İş Mantığı:**
        1.  Gerekli kütüphaneleri (`React`, `ReactDOM`) ve ana bileşeni (`App`) import eder.
        2.  Varsa, global CSS dosyasını import eder (örn: `import './index.css'`).
        3.  `ReactDOM.createRoot()` kullanarak `index.html`'deki `root` ID'li elementi seçer.
        4.  Seçilen elementin içine `<App />` bileşenini `.render()` metodu ile render eder. Geliştirme sürecinde olası hataları yakalamak için genellikle `<React.StrictMode>` içine sarılır.
```

-----