import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Rastgele kısa kod oluşturur
 * @param length Oluşturulacak kodun uzunluğu (varsayılan: 6)
 * @returns Rastgele oluşturulmuş string
 */
const generateShortCode = (length: number = 6): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Benzersiz bir kısa kod oluşturur
 * @returns Benzersiz kısa kod
 */
const generateUniqueShortCode = async (): Promise<string> => {
  let shortCode: string;
  let isUnique = false;
  
  while (!isUnique) {
    shortCode = generateShortCode();
    const existingUrl = await prisma.url.findUnique({
      where: { shortCode }
    });
    
    if (!existingUrl) {
      isUnique = true;
      return shortCode;
    }
  }
  
  return generateShortCode(); // Fallback
};

/**
 * Orijinal URL'den kısa URL oluşturur
 * @param originalUrl Kısaltılacak orijinal URL
 * @returns Oluşturulan kısa URL bilgileri
 */
export const createShortUrl = async (originalUrl: string) => {
  try {
    // URL'nin daha önce kısaltılıp kısaltılmadığını kontrol et
    const existingUrl = await prisma.url.findFirst({
      where: { originalUrl }
    });
    
    if (existingUrl) {
      return existingUrl;
    }
    
    // Yeni bir kısa kod oluştur ve kaydet
    const shortCode = await generateUniqueShortCode();
    
    const newUrl = await prisma.url.create({
      data: {
        originalUrl,
        shortCode,
        clickCount: 0
      }
    });
    
    return newUrl;
  } catch (error) {
    console.error('URL oluşturulurken hata:', error);
    throw new Error('URL oluşturulamadı');
  }
};

/**
 * Kısa koda göre orijinal URL'yi bulur ve tıklama sayacını artırır
 * @param shortCode Aranacak kısa kod
 * @returns Orijinal URL veya null
 */
export const findUrlByShortCode = async (shortCode: string) => {
  try {
    const url = await prisma.url.update({
      where: { shortCode },
      data: {
        clickCount: { increment: 1 }
      }
    });
    
    return url.originalUrl;
  } catch (error) {
    console.error('URL bulunamadı:', error);
    return null;
  }
};
