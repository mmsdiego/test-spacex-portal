'use client';

import { memo, useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type LaunchCarouselProps = {
  images: string[];
  missionName: string;
};

const fallbackImage = "https://placehold.co/600x400?text=No+Image";

const ImageSlide = memo(({ src, alt }: { src: string; alt: string }) => {
  const [error, setError] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={error ? fallbackImage : src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover rounded-xl transition-opacity duration-300"
      onError={() => setError(true)}
    />
  );
});

ImageSlide.displayName = "ImageSlide";

export default function LaunchCarousel({ images, missionName }: LaunchCarouselProps) {
  return (
    <Carousel className="w-full h-200 max-w-lg mx-auto">
      <CarouselContent className="h-200">
        {images.map((url, i) => (
          <CarouselItem key={url + i}>
            <ImageSlide 
              src={url} 
              alt={`${missionName} - imagem ${i + 1}`} 
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious aria-label="Imagem anterior" />
      <CarouselNext aria-label="Próxima imagem" />
    </Carousel>
  );
} 