import { Request, Response } from 'express';
import { createShortUrl, findUrlByShortCode } from '../services/url.service';

/**
 * Yeni bir kısa URL oluşturur
 * @route POST /api/shorten
 * @param req.body.originalUrl - Kısaltılacak orijinal URL
 * @returns Oluşturulan kısa URL bilgileri veya hata mesajı
 */
export const createShortUrlController = async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;

    // Giriş doğrulama
    if (!originalUrl) {
      return res.status(400).json({ error: 'URL zorunludur' });
    }

    // URL formatını kontrol et
    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({ error: 'Geçersiz URL formatı' });
    }

    // URL'yi kısalt
    const url = await createShortUrl(originalUrl);
    
    // Başarılı yanıt
    res.status(201).json({
      success: true,
      data: {
        originalUrl: url.originalUrl,
        shortUrl: `http://localhost:3000/${url.shortCode}`,
        shortCode: url.shortCode,
        clickCount: url.clickCount,
        createdAt: url.createdAt
      }
    });
  } catch (error) {
    console.error('URL oluşturulurken hata:', error);
    res.status(500).json({ 
      success: false, 
      error: 'URL oluşturulurken bir hata oluştu' 
    });
  }
};

/**
 * Kısa koda göre orijinal URL'ye yönlendirir
 * @route GET /:shortCode
 * @param req.params.shortCode - Yönlendirilecek kısa kod
 * @returns Orijinal URL'ye yönlendirme veya 404 hatası
 */
export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;

    if (!shortCode) {
      return res.status(400).json({ error: 'Kısa kod gereklidir' });
    }

    // Kısa koda göre orijinal URL'yi bul
    const originalUrl = await findUrlByShortCode(shortCode);

    if (!originalUrl) {
      return res.status(404).json({ 
        success: false, 
        error: 'URL bulunamadı' 
      });
    }

    // Orijinal URL'ye yönlendir (301 kalıcı yönlendirme)
    res.redirect(301, originalUrl);
  } catch (error) {
    console.error('Yönlendirme sırasında hata:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Yönlendirme sırasında bir hata oluştu' 
    });
  }
};
