import { useEffect, useRef } from "react";

const useOutsideClick = (action: () => void, listenCapturing = true) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        action();
      }
    };

    document.addEventListener("mousedown", handleClick, listenCapturing);
    document.addEventListener("touchstart", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("mousedown", handleClick, listenCapturing);
      document.removeEventListener("touchstart", handleClick, listenCapturing);
    };
  }, [action, listenCapturing]);

  return { ref };
};

export default useOutsideClick;
