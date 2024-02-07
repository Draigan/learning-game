import { useEffect } from "react";

export function useCustomEffect(callback) {
  useEffect(() => {
    callback();
  }, [callback]);
}
