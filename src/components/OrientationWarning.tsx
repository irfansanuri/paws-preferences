import { useEffect, useState } from "react";

export default function OrientationWarning() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeNow = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscapeNow);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (!isLandscape) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-[9999] flex items-center justify-center p-6">
      <div className="text-center text-gray-800 text-xl font-semibold">
        Please rotate your device to portrait mode 📱
      </div>
    </div>
  );
}
