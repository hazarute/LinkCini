import React, { useState } from 'react';
import styles from './UrlForm.module.css';

interface UrlFormProps {
  onShortenSuccess: (data: {
    originalUrl: string;
    shortUrl: string;
    shortCode: string;
    clickCount: number;
    createdAt: string;
  }) => void;
  onError: (error: string) => void;
  isLoading: boolean;
}

export const UrlForm = ({ onShortenSuccess, onError, isLoading }: UrlFormProps) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // URL doğrulama
    const isValidUrl = validateUrl(url);
    setIsValid(isValidUrl);
    
    if (!isValidUrl) {
      onError('Lütfen geçerli bir URL giriniz');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      onShortenSuccess(data.data);
      setUrl('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'URL kısaltılırken bir hata oluştu';
      onError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Kısaltmak istediğiniz URL'yi girin..."
          className={`${styles.input} ${!isValid ? styles.invalid : ''}`}
          disabled={isLoading}
          aria-label="URL giriş alanı"
        />
        <button 
          type="submit" 
          className={styles.button}
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? 'Kısaltılıyor...' : 'Kısalt'}
        </button>
      </div>
      {!isValid && (
        <p className={styles.errorMessage}>
          Lütfen geçerli bir URL girin (örn: https://ornek.com)
        </p>
      )}
    </form>
  );
};
