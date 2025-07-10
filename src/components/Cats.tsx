import React from "react";
import type { Cat } from "../types/types";
import Card from "./Card";

type Props = {
  cats: Cat[];
  setCats: React.Dispatch<React.SetStateAction<Cat[]>>;
  choosenCats: Cat[];
  setChoosenCats: React.Dispatch<React.SetStateAction<Cat[]>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  progression: number;
  setProgression: React.Dispatch<React.SetStateAction<number>>;
  totalProgression: number;
};

function Cats({
  cats,
  setCats,
  setChoosenCats,
  count,
  setCount,
  progression,
  setProgression,
  totalProgression,
}: Props) {
  const handleSwipe = (id: string, direction: "left" | "right") => {
    setProgression(progression + 1);
    if (direction === "right") {
      setCount((prev) => prev + 1);
      const liked = cats.find((cat) => cat.id === id);
      if (liked) {
        setChoosenCats((prev) => [...prev, liked]);
      }
    }
    setCats((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* Card Stack */}
        <div className="relative w-full">
          {cats.map((cat, index) => (
            <div
              key={cat.id}
              className="absolute translate-x-[-50%]"
            >
              <Card
                id={cat.id}
                zIndex={cats.length - index}
                onSwipe={handleSwipe}
                progress={progression}
                totalProgression={totalProgression}
                count={count}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cats;
