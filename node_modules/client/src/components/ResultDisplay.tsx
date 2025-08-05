import React, { useState } from 'react';
import styles from './ResultDisplay.module.css';

interface ResultDisplayProps {
  result: {
    originalUrl: string;
    shortUrl: string;
    shortCode: string;
    clickCount: number;
    createdAt: string;
  } | null;
}

export const ResultDisplay = ({ result }: ResultDisplayProps) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!result) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setIsCopied(true);
      
      // 3 saniye sonra kopyalandı yazısını kaldır
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.error('URL kopyalanırken hata oluştu:', error);
    }
  };

  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultCard}>
        <div className={styles.originalUrl}>
          <span>Orijinal URL:</span>
          <a 
            href={result.originalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.urlLink}
          >
            {result.originalUrl}
          </a>
        </div>
        
        <div className={styles.shortUrlContainer}>
          <div className={styles.shortUrl}>
            <span>Kısa URL:</span>
            <a 
              href={result.shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.urlLink}
            >
              {result.shortUrl}
            </a>
          </div>
          
          <button 
            onClick={handleCopy} 
            className={`${styles.copyButton} ${isCopied ? styles.copied : ''}`}
            aria-label="URL'yi panoya kopyala"
          >
            {isCopied ? '✓ Kopyalandı!' : 'Kopyala'}
          </button>
        </div>
        
        <div className={styles.metaInfo}>
          <span>Kısa Kod: <strong>{result.shortCode}</strong></span>
          <span>Tıklanma: <strong>{result.clickCount}</strong></span>
          <span>Oluşturulma: <strong>{new Date(result.createdAt).toLocaleDateString('tr-TR')}</strong></span>
        </div>
      </div>
    </div>
  );
};
