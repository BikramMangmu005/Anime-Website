import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export function useHlsPlayer(source: string | null | undefined) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const video = videoRef.current;

        if (!video || !source) return;

        let hls: Hls | null = null;
        setError("");

        if (source.includes(".m3u8") && Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(source);
            hls.attachMedia(video);

            hls.on(Hls.Events.ERROR, (_event, data) => {
                if (data.fatal) {
                    setError("The video stream could not be played.");
                }
            });
        } else {
            video.src = source;
        }

        return () => {
            hls?.destroy();
            video.pause();
            video.removeAttribute("src");
            video.load();
        };
    }, [source]);

    return { videoRef, error };
}