'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Gift, Sparkles, Heart } from 'lucide-react'
import { WeekTheme } from '@/utils/valentineWeekSystem'
import confetti from 'canvas-confetti'

interface WeekSurpriseProps {
  theme: WeekTheme
  onClose: () => void
}

export default function WeekSurprise({ theme, onClose }: WeekSurpriseProps) {
  useEffect(() => {
    // Special surprise confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: [theme.color, '#d3a625', '#f5e6c8'],
    })
  }, [theme.color])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-parchment via-white to-parchment rounded-2xl p-8 max-w-md w-full border-4 border-gold shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 text-6xl opacity-20">{theme.character}</div>

        <div className="relative z-10 text-center space-y-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <Gift className="w-16 h-16 text-gold" />
          </motion.div>

          <h2 className="text-4xl font-magical" style={{ color: theme.color }}>
            {theme.weekName} 🎁
          </h2>

          <div className="space-y-4">
            <p className="text-2xl font-magical text-ink">{theme.greeting}</p>
            <p className="text-lg text-ink italic">{theme.specialMessage}</p>

            <div className="bg-white/50 p-4 rounded-lg border-2 border-gold/30">
              <p className="text-ink font-handwritten text-lg">
                This week&apos;s feature: <span className="font-magical text-gryffindor">{theme.mainFeature}</span>
              </p>
            </div>

            <div className="flex justify-center gap-2 pt-4">
              <Heart className="w-6 h-6 text-gryffindor animate-pulse" />
              <Sparkles className="w-6 h-6 text-gold animate-pulse" />
              <Heart className="w-6 h-6 text-gryffindor animate-pulse" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-gold to-yellow-400 text-ink font-bold rounded-lg font-magical"
          >
            Continue the Magic ✨
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
