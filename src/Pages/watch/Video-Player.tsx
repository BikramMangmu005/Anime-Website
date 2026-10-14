import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

import type { Anime } from "../../types/Anime-Types";
import { getImageUrl } from "../../utils/Image-URL";

interface VideoPlayerProps {
  anime: Anime;
  videoUrl: string | null | undefined;
}

export default function VideoPlayer({ anime, videoUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !videoUrl) return;

    let hls: Hls | null = null;
    let cancelled = false;

    setError("");

    if (videoUrl.includes(".m3u8") && Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal && !cancelled) {
          setError("The video stream could not be played.");
        }
      });
    } else {
      video.src = videoUrl;
    }

    return () => {
      cancelled = true;
      hls?.destroy();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [videoUrl]);

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-black">
        {videoUrl ? (
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-black"
          >
            Your browser does not support video playback.
          </video>
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center gap-3 px-5 text-center">
            {anime.image && (
              <img
                src={getImageUrl(anime.image)}
                alt={anime.title}
                className="h-24 w-16 rounded object-cover"
              />
            )}

            <p className="text-lg font-semibold text-white">
              Episode stream unavailable
            </p>

            <p className="max-w-md text-sm text-gray-400">
              This episode does not have a playable video URL yet. Connect a
              licensed stream to enable playback.
            </p>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
