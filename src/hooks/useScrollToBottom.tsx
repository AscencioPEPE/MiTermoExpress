import { useEffect } from 'react';

function useScrollToBottom() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return scrollToBottom;
}

export default useScrollToBottom;
