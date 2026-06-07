"use client";

import { useState } from "react";
import { getAssetUrl } from "@/lib/utils/asset";

type Props = {
  uuid?: string;
  imageUrl?: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
};

export default function AssetImage({ uuid, imageUrl, alt, className, fallback }: Props) {
  const [failed, setFailed] = useState(false);

  const src = uuid ? getAssetUrl(uuid) : imageUrl;

  if (!src || failed) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
