'use client';

import { useState, useEffect } from "react";
import styles from './page.module.css';
import { imageService, ImageStatusEnum } from "@/services/imageService";
import Spinner from "./components/spinner/page";
export default function Home() {

  const [prompt, setPrompt] = useState('')
  const [taskId, setTaskId] = useState<string | null>(null);
  const [imageData, setImageData] = useState<{ url: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async()=>{
    if(!prompt.trim()) return;

    setLoading(true);
    setImageData(null);

    try{
      const data = await imageService.generateImage(prompt);
      setTaskId(data.taskId);
    }
    catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        console.log("Enregando consulta de estado para taskId:", taskId);
        const data = await imageService.getImageStatus(taskId);
        if (data.status === ImageStatusEnum.COMPLETED && data.url) {
          setImageData({ url: data.url });
          setLoading(false);
          clearInterval(interval);
        } else if (data.status === ImageStatusEnum.FAILED) {
          console.error('La generación falló');
          setLoading(false);
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Error consultando el estado de la imagen', error);
        setLoading(false);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
    
  }, [taskId])
  

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Generador de Imágenes con IA</h1>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe un prompt..."
          className={styles.input}
        />
        <button
          onClick={handleGenerate}
          className={styles.button}
        >
          Generar
        </button>
      </div>

      {loading && 
      <div className="loading">
        <p>Generando imagen, por favor espera...</p>
        <Spinner />
      </div>
      }

      {imageData && (
        <div className={styles.image}>
          <img
            src={imageData.url}
            alt="Imagen generada"
            className={styles.generatedImage}
          />
          <div className={styles.imageActions}>
            <a
              href={imageData.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
            >
              Descargar
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(imageData.url)}
              className={styles.linkButton}
            >
              Copiar URL
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
