import { useEffect } from "react";

export const useKeyPress = (
  key: string,
  action: (e: KeyboardEvent) => void,
  startListening = true
) => {
  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === key) action(e);
    };

    if(startListening){
      window.addEventListener("keyup", onKeyUp);
    }else{
      window.removeEventListener("keyup", onKeyUp);
    }

    return () => window.removeEventListener("keyup", onKeyUp);

  }, [action, key, startListening]);
};