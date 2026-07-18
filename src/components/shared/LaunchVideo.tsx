"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Volume2, VolumeX, X } from "lucide-react";

export function LaunchVideo() {
  const [show, setShow] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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
            muted={isMuted}
            playsInline
            onEnded={handleVideoEnd}
            className="h-full w-full object-cover"
          />

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white backdrop-blur-md transition-colors hover:bg-black/70"
          >
            {isMuted ? (
              <>
                <VolumeX className="h-5 w-5" />
                <span className="text-sm font-medium">Tap to unmute</span>
              </>
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={handleVideoEnd}
            className="absolute top-8 right-8 z-50 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
