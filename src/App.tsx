import { useEffect, useState } from "react";
import "./App.css";
import Cats from "./components/Cats";
import type { Cat } from "./types/types";
import axios from "axios";
import { catEndpoint } from "./api/api";
import Collection from "./components/Collection";
import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [choosenCats, setChoosenCats] = useState<Cat[]>([]);
  const [count, setCount] = useState<number>(0);

  //For progression bar
  const [progression, setProgression] = useState<number>(0);
  const [totalProgression, setTotalProgression] = useState<number>(0);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get(catEndpoint.collections);
        setCats(res.data);
        setTotalProgression(res.data.length);
      } catch (err) {
        console.error("Error fetching cats:", err);
      }
    };

    fetchCats();
  }, []);
  return (
    <>
      {cats.length === 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <Collection choosenCats={choosenCats} count={count} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <Cats
          cats={cats}
          setCats={setCats}
          choosenCats={choosenCats}
          setChoosenCats={setChoosenCats}
          count={count}
          setCount={setCount}
          progression={progression}
          setProgression={setProgression}
          totalProgression={totalProgression}
        />
      )}
    </>
  );
}

export default App;
