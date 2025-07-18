import { useRef, useState, useEffect } from 'react';
import './Reproductor.css';

export default function Reproductor({ cancion }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        if (audio) {
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [cancion]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="reproductor-container">
            {cancion && (
                <>
                    {/* Imagen de la canción */}
                    <div className="imagen-cancion">
                        <img src={cancion.imagen} alt={`Portada de ${cancion.titulo}`} />
                        <div className="info-cancion">
                            <h3>{cancion.titulo}</h3>
                            <p>{cancion.artista}</p>
                        </div>
                    </div>

                    <audio ref={audioRef} src={cancion.audioUrl} />

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
                        <button><img src="https://img.icons8.com/ios-filled/20/ffffff/speech-bubble-with-dots.png" alt="Chat" /></button>
                    </div>

                    <div className="barra-progreso">
                        <span>{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                        />
                        <span>{formatTime(duration)}</span>
                    </div>
                </>
            )}
        </div>
    );
}

