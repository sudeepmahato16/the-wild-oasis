import { useEffect, useRef } from "react";

const useOutsideClick = (
  action: () => void,
  listenCapturing = true,
  startListening = true,
) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        action();
      }
    };

    if (startListening) {
      document.addEventListener("click", handleClick, listenCapturing);
    } else {
      document.removeEventListener("click", handleClick, listenCapturing);
    }

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [action, listenCapturing, startListening]);

  return { ref };
};

export default useOutsideClick;
