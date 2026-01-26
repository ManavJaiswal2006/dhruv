'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, Star } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useEffect, useState } from 'react'

interface EasterEggProps {
  message: string
  onClose: () => void
}

export default function EasterEgg({ message, onClose }: EasterEggProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Special confetti for easter eggs
    const duration = 2000
    const animationEnd = Date.now() + duration

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d3a625', '#740001', '#0e4a99'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d3a625', '#740001', '#0e4a99'],
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0] }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            className="bg-gradient-to-br from-gold via-yellow-300 to-gryffindor p-8 rounded-2xl shadow-2xl border-4 border-white max-w-md mx-4 pointer-events-auto"
            onClick={() => {
              setShow(false)
              setTimeout(onClose, 300)
            }}
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="flex justify-center"
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-3xl font-magical text-white">🎉 Easter Egg Found! 🎉</h3>
              <p className="text-white text-lg font-handwritten">{message}</p>
              <div className="flex justify-center gap-2">
                <Heart className="w-6 h-6 text-white animate-pulse" />
                <Star className="w-6 h-6 text-white animate-pulse" />
                <Heart className="w-6 h-6 text-white animate-pulse" />
              </div>
              <p className="text-white/80 text-sm">Click to close</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
