'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Sparkles } from 'lucide-react'
import { WeekTheme } from '@/utils/valentineWeekSystem'
import confetti from 'canvas-confetti'

interface WeekChallengeProps {
  theme: WeekTheme
  onClose: () => void
  onComplete: () => void
}

export default function WeekChallenge({ theme, onClose, onComplete }: WeekChallengeProps) {
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChallenge = () => {
    if (completed) return

    setClicks((prev) => {
      const newClicks = prev + 1
      const newProgress = Math.min(100, (newClicks / 10) * 100)
      setProgress(newProgress)

      if (newProgress >= 100 && !completed) {
        setCompleted(true)
        setShowSuccess(true)
        onComplete()

        // Celebration confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: [theme.color, '#d3a625', '#f5e6c8'],
        })

        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      }
      return newClicks
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-parchment rounded-2xl p-8 max-w-2xl w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gold/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-ink" />
        </button>

        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">{theme.character}</div>
          <h2 className="text-4xl font-magical" style={{ color: theme.color }}>
            {theme.challenge}
          </h2>
          <p className="text-ink text-lg">{theme.specialMessage}</p>

          <div className="space-y-4">
            <div className="relative h-8 bg-white/50 rounded-full overflow-hidden border-2 border-gold/30">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: theme.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-ink font-bold">
                {Math.round(progress)}%
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleChallenge}
              disabled={completed}
              className="px-8 py-4 rounded-xl font-magical text-xl text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: completed ? '#4ade80' : theme.color }}
            >
              {completed ? '✓ Challenge Complete!' : `Complete Challenge!`}
            </motion.button>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-gold text-2xl font-magical"
                >
                  <Trophy className="w-8 h-8" />
                  <span>Unlocked: {theme.unlockableContent}</span>
                  <Sparkles className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
