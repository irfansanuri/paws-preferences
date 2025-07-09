import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { ImCross } from "react-icons/im";

type Props = {
  id: string;
  url: string;
  zIndex: number;
  onSwipe: (id: string, direction: "left" | "right") => void;
  progress: number;
  totalProgression: number;
  count: number;
};

export default function Card({
  id,
  url,
  zIndex,
  onSwipe,
  progress,
  totalProgression,
  count,
}: Props) {
  const [loading, setLoading] = useState(true);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = () => {
    //Event handler for dragging Card
    const currentX = x.get();
    if (Math.abs(currentX) > 60) {
      const direction = currentX > 0 ? "right" : "left";
      onSwipe(id, direction);
    }
  };

  return (
    <motion.div
      className="h-fit mb-8 my-[10vh]
                 lg:w-120 md:w-100 w-80 
                 text-gray-700 
                 rounded-lg overflow-hidden
                 hover:cursor-grab active:cursor-grabbing
                 innerBg"
      style={{
        zIndex,
        x,
        opacity,
        rotate,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col items-center py-6">
        {/* Title */}
        <div className="flex items-center gap-2 lg:text-3xl md:text-3xl text-2xl font-bold text-[#F9896B]">
          <span className="text-4xl">😺</span>
          <span>Paws & Preferences</span>
        </div>
        <div className="font-bold">Swipe left or right</div>

        {/* Progress Bar */}
        <div className="relative w-64 h-3 mt-4 bg-orange-100 rounded-full mt-8">
          <div
            className="absolute h-3 bg-[#F9896B] rounded-full duration-300"
            style={{ width: `${(progress / totalProgression) * 100}%` }}
          ></div>
          <span className="absolute right-0 top-[-1.5rem] text-sm font-semibold">
            {progress}/{totalProgression}
          </span>
        </div>
      </div>

      {/* Image + Icons Layout*/}
      <div className="flex w-full px-1 items-center justify-between">
        {/* Left Icon */}
        <div className="w-1/6 flex justify-center">
          <div className="w-14 h-14 flex items-center justify-center text-2xl">
            <ImCross className="w-10 h-10 text-[#F8C6B4]" />
          </div>
        </div>

        {/* Cat Image */}
        <div className="w-4/6 flex justify-center items-center">
          {loading && (
            <motion.div
              className="absolute animate-spin rounded-full 
                           h-35 w-35 
                           border-5 border-orange-300 border-t-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          <img
            src={url}
            alt={`Cat ${id}`}
            loading="lazy"
            onLoad={() => setLoading(false)}
            className={`lg:h-72 md:h-72 h-45 
             lg:w-72 md:w-72 w-45 
             object-cover pointer-events-none rounded-lg 
             ${loading ? "invisible" : "visible"}`}
          />
        </div>

        {/* Right Icon */}
        <div className="w-1/6 flex items-center justify-center text-2xl">
          <FaHeart className="w-10 h-10 text-[#F8C6B4]" />
        </div>
      </div>
      {/* Like Counter */}
      <div className="text-lg font-bold mt-8 my-14" style={{ zIndex: 1000 }}>
        Your like count: {count}
      </div>
    </motion.div>
  );
}
