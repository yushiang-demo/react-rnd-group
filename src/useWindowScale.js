import { useState, useEffect } from "react";

export default function useWindowScale() {
  const [windowScale, setWindowScale] = useState(1);
  const [initialWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const scale = window.innerWidth / initialWidth;
      setWindowScale(scale);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialWidth]);

  return windowScale;
}
