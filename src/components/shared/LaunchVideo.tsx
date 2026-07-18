"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function LaunchVideo() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenLaunch = sessionStorage.getItem("hasSeenLaunch");
    if (!hasSeenLaunch) {
      setShow(true);
    }
  }, []);

  const handleVideoEnd = () => {
    setShow(false);
    sessionStorage.setItem("hasSeenLaunch", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
        >
          <video
            src="/launch.mp4"
            autoPlay
            playsInline
            onEnded={handleVideoEnd}
            className="h-full w-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
