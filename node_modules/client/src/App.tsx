import React, { useState } from 'react';
import { UrlForm } from './components/UrlForm';
import { ResultDisplay } from './components/ResultDisplay';
import styles from './App.module.css';

function App() {
  const [result, setResult] = useState<{
    originalUrl: string;
    shortUrl: string;
    shortCode: string;
    clickCount: number;
    createdAt: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShortenSuccess = (data: {
    originalUrl: string;
    shortUrl: string;
    shortCode: string;
    clickCount: number;
    createdAt: string;
  }) => {
    setResult(data);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>LinkCini</h1>
        <p className={styles.subtitle}>Uzun bağlantılarınızı kısaltın, paylaşımı kolaylaştırın</p>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <UrlForm 
            onShortenSuccess={handleShortenSuccess}
            onError={handleError}
            isLoading={isLoading}
          />
          
          {error && (
            <div className={styles.errorAlert}>
              <p>{error}</p>
            </div>
          )}
          
          {result && <ResultDisplay result={result} />}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} LinkCini - Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

export default App;
