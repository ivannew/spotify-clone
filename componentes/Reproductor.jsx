import { useRef, useState, useEffect } from 'react';
import './Reproductor.css';

export default function Reproductor({ cancion, playlists, agregarACancionesDePlaylist }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [esFavorita, setEsFavorita] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!cancion) return;
    const favoritas = playlists.find(pl => pl.nombre === "Favoritas");
    const yaEsta = favoritas?.canciones?.some(c => c.id === cancion.id);
    setEsFavorita(yaEsta);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [cancion, playlists]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error al reproducir:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAgregarAFavoritos = () => {
    if (!cancion) return;
    agregarACancionesDePlaylist("Favoritas", cancion);
    setEsFavorita(true);
  };

  return (
    <div className="reproductor-container">
      {cancion && (
        <>
          <audio ref={audioRef} src={cancion.audioUrl} />

          <div className="reproductor-contenido">
            <div className="imagen-info">
              <img src={cancion.imagen} alt={`Portada de ${cancion.titulo}`} />
              <div className="info-cancion">
                <h3>{cancion.titulo}</h3>
                <p>{cancion.artista}</p>
              </div>
            </div>

            <div className="controles-centro">
              <button><img src="https://img.icons8.com/ios-filled/20/ffffff/shuffle.png" alt="Shuffle" /></button>
              <button><img src="https://img.icons8.com/ios-filled/20/ffffff/skip-to-start.png" alt="Prev" /></button>
              
              <button className="btn-play" onClick={togglePlay}>
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="30" height="30">
                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="30" height="30">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button><img src="https://img.icons8.com/ios-filled/20/ffffff/end.png" alt="Next" /></button>

              <button
                title="Añadir a Favoritas"
                onClick={handleAgregarAFavoritos}
                className="btn-favorito"
                aria-label="Añadir a Favoritas"
              >
                <img
                  src={
                    esFavorita
                      ? "https://img.icons8.com/fluency-systems-filled/24/fa314a/like.png"
                      : "https://img.icons8.com/ios/24/ffffff/like--v1.png"
                  }
                  alt="Favorito"
                />
              </button>

              <button><img src="https://img.icons8.com/ios-filled/20/ffffff/speech-bubble-with-dots.png" alt="Chat" /></button>
            </div>

            <div className="barra-progreso">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={Math.floor(duration) || 0}
                value={Math.floor(currentTime)}
                onChange={handleSeek}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
