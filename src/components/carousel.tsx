import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Importa los íconos para las flechas
import { classNames } from '../lib/classes';

interface CarouselProps {
  images: string[];
}

export const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative flex justify-center">
      <img src={images[currentIndex]} alt="carousel" className="w-full max-w-[700px] object-contain" />
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded bg-gray-800 px-2 py-1 text-white"
        onClick={goToPrev}
      >
        Prev
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded bg-gray-800 px-2 py-1 text-white"
        onClick={goToNext}
      >
        Next
      </button>
    </div>
  );
};
