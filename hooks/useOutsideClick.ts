import { useEffect, useRef } from "react";

const useOutsideClick = (action: () => void, listenCapturing = true) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        action();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [action, listenCapturing]);

  return { ref };
};

export default useOutsideClick;
