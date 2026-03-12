"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Waves from "@/components/Waves"

export function BackgroundEffects() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* 1. Base Layer: Shared Grid or Dots */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: isDark 
            ? `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`
            : `radial-gradient(circle, rgba(0,0,0,0.15) 1.2px, transparent 1.2px)`,
          backgroundSize: "32px 32px",
          opacity: isDark ? 0.3 : 1
        }}
      />

      {/* 2. Effect Layer: Waves for Dark, Blobs for Light */}
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="dark-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 opacity-[0.05]"
          >
            <Waves
              lineColor="#5227FF"
              backgroundColor="transparent"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={40}
              waveAmpY={20}
              friction={0.9}
              tension={0.01}
              maxCursorMove={120}
              xGap={12}
              yGap={36}
            />
          </motion.div>
        ) : (
          <motion.div
            key="light-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Blob 1 */}
            <motion.div
              animate={{
                x: [0, 80, -40, 0],
                y: [0, -60, 30, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-5%] left-[5%] w-[450px] h-[450px] rounded-full blur-[90px]"
              style={{ backgroundColor: "rgba(0, 201, 154, 0.08)" }}
            />
            {/* Blob 2 */}
            <motion.div
              animate={{
                x: [0, -100, 50, 0],
                y: [0, 40, -80, 0],
                scale: [1, 0.95, 1.1, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[5%] right-[2%] w-[550px] h-[550px] rounded-full blur-[110px]"
              style={{ backgroundColor: "rgba(99, 102, 241, 0.08)" }}
            />
             {/* Blob 3 */}
             <motion.div
              animate={{
                y: [0, 60, -40, 0],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-[30%] right-[25%] w-[350px] h-[350px] rounded-full blur-[80px]"
              style={{ backgroundColor: "rgba(123, 97, 255, 0.06)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Global Overlay: Grain/Noise */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
          opacity: isDark ? 0.03 : 0.08,
          mixBlendMode: actsAsNoiseOverlay(isDark)
        }}
      />
    </div>
  )
}

function actsAsNoiseOverlay(isDark: boolean) {
  // Use CSS property directly or just return string
  return isDark ? ("normal" as any) : ("multiply" as any);
}
