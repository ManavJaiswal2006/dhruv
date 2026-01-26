'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wand2, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

interface SpellCastingProps {
  onComplete: () => void
}

const spells = [
  { name: 'Lumos', gesture: 'swish', color: '#ffd700' },
  { name: 'Wingardium Leviosa', gesture: 'swish and flick', color: '#0e4a99' },
  { name: 'Expecto Patronum', gesture: 'circular motion', color: '#740001' },
  { name: 'Accio', gesture: 'pull motion', color: '#1a472a' },
]

export default function SpellCasting({ onComplete }: SpellCastingProps) {
  const [currentSpell, setCurrentSpell] = useState(0)
  const [gesture, setGesture] = useState('')
  const [isCasting, setIsCasting] = useState(false)

  const handleCast = () => {
    setIsCasting(true)
    const spell = spells[currentSpell]

    // Visual effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: [spell.color, '#d3a625'],
    })

    setTimeout(() => {
      setIsCasting(false)
      if (currentSpell < spells.length - 1) {
        setCurrentSpell((prev) => prev + 1)
      } else {
        onComplete()
      }
    }, 1500)
  }

  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl mb-4">✨</div>
      <h3 className="text-3xl font-magical text-gryffindor">
        Cast: {spells[currentSpell].name}
      </h3>
      <p className="text-ink text-lg">
        Gesture: {spells[currentSpell].gesture}
      </p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCast}
        disabled={isCasting}
        className="px-8 py-4 bg-gradient-to-r from-gold to-yellow-400 text-ink font-bold text-xl rounded-xl shadow-2xl hover:magical-glow transition-all font-magical disabled:opacity-50"
      >
        {isCasting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-2"
          >
            <Wand2 className="w-6 h-6" />
            <span>Casting...</span>
          </motion.div>
        ) : (
          <div className="flex items-center gap-2">
            <Wand2 className="w-6 h-6" />
            <span>Cast Spell!</span>
          </div>
        )}
      </motion.button>

      {isCasting && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="text-4xl"
        >
          <Sparkles className="w-16 h-16 mx-auto text-gold animate-pulse" />
        </motion.div>
      )}

      <div className="flex justify-center gap-2 mt-4">
        {spells.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index <= currentSpell ? 'bg-gold' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
