'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function Gallery({ images }: { images: string[] }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {images.map((src, index) => (
        <div 
          key={index}
          className="relative break-inside-avoid group transform transition-transform duration-300 hover:scale-[0.98]"
        >
          <Image
            src={src}
            alt={`Gallery image ${index + 1}`}
            width={600}
            height={400}
            className="w-full h-auto rounded-xl border border-green-100/30 dark:border-green-900/30"
            style={{
              aspectRatio: 'auto',
              objectFit: 'cover'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent rounded-xl" />
        </div>
      ))}
    </div>
  )
}