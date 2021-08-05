import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Button({ icon, name, width, height, color, click }) {
  const [ripple, setRipple] = useState({
    diameter: 0,
    top: 0,
    left: 0,
    show: false,
  });
  function rippleEffect(e) {
    let diaMeter = Math.max(e.target.clientWidth, e.target.clientHeight);
    setRipple({
      diameter: diaMeter,
      top: e.clientY - (e.target.offsetTop + diaMeter / 2),
      left: e.clientX - (e.target.offsetLeft + diaMeter / 2),
      show: true,
    });
  }
  return (
    <button
      onClick={(e) => {
        rippleEffect(e);
        click();
      }}
      className={`relative overflow-hidden transition duration-200 hover:bg-${color}-700 text-white font-bold uppercase bg-${color}-500 text-xl px-5 py-2 border-4 border-${color}-600`}
      style={{ width: width, height: height }}
    >
      <AnimatePresence>
        {ripple.show && (
          <motion.div
            onAnimationComplete={() => setRipple({ ...ripple, show: false })}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1], opacity: [1, 0] }}
            className="absolute rounded-full bg-white bg-opacity-50"
            style={{
              width: ripple.diameter,
              height: ripple.diameter,
              top: ripple.top,
              left: ripple.left,
            }}
          ></motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-center">
        {icon}
        {name}
      </div>
    </button>
  );
}
