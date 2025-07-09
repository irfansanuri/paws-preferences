import { motion } from "framer-motion";
import type { Cat } from "../types/types";

type Props = {
  choosenCats: Cat[];
  count: number;
};

function Collection({ choosenCats, count }: Props) {
  return (
    <div
      className="h-fit
                 lg:w-200 md:w-165 w-75 
                 px-8 pt-4 my-8 pb-8
                 rounded-lg
                 text-center text-gray-700 innerBg"
    >
      <h1 className="text-3xl font-bold my-6">
        You have chosen {count} {count === 1 ? "cat" : "cats"} 🐾
      </h1>

      {choosenCats.length === 0 ? (
        <p className="text-xl text-gray-500">No cats liked yet 😿</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 place-items-center">
          {choosenCats.map((cat) => (
            <motion.img
              key={cat.id}
              src={`https://cataas.com/cat/${cat.id}`}
              alt={`Cat ${cat.id}`}
              loading="lazy"
              className="rounded-xl shadow-md w-48 h-48 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Collection;
