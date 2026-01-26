'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlaskConical, Sparkles, X } from 'lucide-react'
import confetti from 'canvas-confetti'

interface PotionBrewingProps {
  onComplete: () => void
  onClose: () => void
}

const ingredients = [
  { name: 'Rose Petals', emoji: '🌹', color: '#ff69b4' },
  { name: 'Moonlight', emoji: '🌙', color: '#e6e6fa' },
  { name: 'Stardust', emoji: '✨', color: '#ffd700' },
  { name: 'Dragon Scale', emoji: '🐉', color: '#ff4500' },
  { name: 'Phoenix Feather', emoji: '🔥', color: '#ff6347' },
  { name: 'Unicorn Hair', emoji: '🦄', color: '#9370db' },
]

export default function PotionBrewing({ onComplete, onClose }: PotionBrewingProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [isBrewing, setIsBrewing] = useState(false)
  const [potionComplete, setPotionComplete] = useState(false)

  const handleIngredientClick = (name: string) => {
    if (selectedIngredients.includes(name)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== name))
    } else if (selectedIngredients.length < 3) {
      setSelectedIngredients([...selectedIngredients, name])
    }
  }

  const handleBrew = () => {
    if (selectedIngredients.length !== 3) return

    setIsBrewing(true)

    setTimeout(() => {
      setIsBrewing(false)
      setPotionComplete(true)

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9370db', '#ff69b4', '#ffd700'],
      })

      setTimeout(() => {
        onComplete()
      }, 2000)
    }, 3000)
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
          <div className="text-6xl mb-4">🧪</div>
          <h2 className="text-4xl font-magical text-gryffindor">
            Brew the Perfect Love Potion
          </h2>
          <p className="text-ink text-lg">
            Select exactly 3 ingredients to create your potion
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
            {ingredients.map((ingredient) => {
              const isSelected = selectedIngredients.includes(ingredient.name)
              return (
                <motion.button
                  key={ingredient.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleIngredientClick(ingredient.name)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-gold bg-gold/20 shadow-lg'
                      : 'border-gray-300 bg-white/50'
                  }`}
                >
                  <div className="text-4xl mb-2">{ingredient.emoji}</div>
                  <div className="text-sm font-magical text-ink">
                    {ingredient.name}
                  </div>
                </motion.button>
              )
            })}
          </div>

          <div className="text-center">
            <p className="text-ink mb-4">
              Selected: {selectedIngredients.length}/3
            </p>

            <AnimatePresence>
              {isBrewing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="flex justify-center"
                  >
                    <FlaskConical className="w-16 h-16 text-gold" />
                  </motion.div>
                  <p className="text-ink mt-2">Brewing your potion...</p>
                </motion.div>
              )}

              {potionComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-6xl mb-4"
                >
                  ✨💜✨
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBrew}
              disabled={selectedIngredients.length !== 3 || isBrewing || potionComplete}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl rounded-xl shadow-2xl hover:magical-glow transition-all font-magical disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {potionComplete ? (
                'Potion Complete! ✨'
              ) : isBrewing ? (
                'Brewing...'
              ) : (
                'Brew Potion!'
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
