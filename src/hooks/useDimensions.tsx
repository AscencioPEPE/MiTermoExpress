import { useState, useEffect } from 'react';

type Sizes = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const useDimensions = () => {
  const [size, setSize] = useState<Sizes | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      let newSize: Sizes | undefined;

      if (width <= 640) {
        newSize = 'sm';
      } else if (width <= 768) {
        newSize = 'md';
      } else if (width <= 1024) {
        newSize = 'lg';
      } else if (width <= 1280) {
        newSize = 'xl';
      } else if (width <= 1536) {
        newSize = '2xl';
      }

      setSize(newSize);
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

export default useDimensions;
