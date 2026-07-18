"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

export function LaunchVideo() {
  const [show, setShow] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const startVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasStarted(true);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden"
        >
          <video
            ref={videoRef}
            src="/launch.mp4"
            playsInline
            onEnded={handleVideoEnd}
            className="absolute h-[100dvw] w-[100dvh] origin-center -rotate-90 object-cover lg:static lg:h-full lg:w-full lg:rotate-0"
          />

          {!hasStarted && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={startVideo}
              className="absolute z-50 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-medium tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105"
            >
              LAUNCH Quick Shortly
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
