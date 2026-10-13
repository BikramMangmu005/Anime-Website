import { useState } from "react";
import { getImageUrl } from "../../utils/Image-URL";

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  className?: string;
  alt?: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc,
  className,
  alt = "",
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(getImageUrl(src));

  const handleError = () => {
    console.log("IMAGE FAILED:", imageSrc);

    if (fallbackSrc) {
      const fallbackUrl = getImageUrl(fallbackSrc);

      console.log("TRYING FALLBACK:", fallbackUrl);

      setImageSrc(fallbackUrl);
    }
  };

  console.log("IMAGE LOADING:", imageSrc);

  return (
    <img
      src={imageSrc}
      onError={handleError}
      className={className}
      alt={alt}
    />
  );
}

