"use client";

import { useState } from "react";

type AvatarProps = {
  avatarUrl: string | null;
  name: string;
};

export default function Avatar({ avatarUrl, name }: AvatarProps) {
  const [failedToLoad, setFailedToLoad] = useState(false);
  const initial = name.charAt(0);

  function handleError() {
    setFailedToLoad(true);
  }

  return (
    <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center overflow-hidden rounded-full bg-sky-500 text-2xl font-bold text-white">
      {avatarUrl && !failedToLoad ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt={name} onError={handleError} className="h-full w-full object-cover" />
      ) : (
        initial
      )}
    </div>
  );
}
