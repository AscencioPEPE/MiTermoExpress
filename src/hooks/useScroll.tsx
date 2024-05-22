import { useEffect, useState } from 'react';

function useScrollToBottom() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (windowHeight + scrollTop >= documentHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isBottom;
}

export default useScrollToBottom;
