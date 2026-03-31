import Hls from "hls.js";
import { useEffect, useRef } from "react";

interface HlsVideoProps {
  src: string;
  className?: string;
  poster?: string;
  desaturated?: boolean;
}

export function HlsVideo({
  src,
  className,
  poster,
  desaturated = false,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    let hls: Hls | null = null;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        enableWorker: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      video.src = src;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!video) {
          return;
        }

        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.25,
      },
    );

    observerRef.current.observe(video);

    return () => {
      observerRef.current?.disconnect();
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      style={desaturated ? { filter: "saturate(0)" } : undefined}
    />
  );
}
