'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'

interface OwlPostProps {
  onClose: () => void
}

export default function OwlPost({ onClose }: OwlPostProps) {
  const [isOpen, setIsOpen] = useState(false)

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
          className="absolute top-4 right-4 p-2 hover:bg-gold/20 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6 text-ink" />
        </button>

        <AnimatePresence>
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center min-h-[400px] cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <div className="w-64 h-48 bg-gradient-to-br from-gold to-gryffindor rounded-lg shadow-2xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-2xl font-magical mb-2">🦉</p>
                    <p className="text-lg font-magical">Owl Post</p>
                    <p className="text-sm mt-4">Click to open</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gold rounded-full flex items-center justify-center border-4 border-parchment">
                  <span className="text-2xl">🦉</span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-4xl font-magical text-gryffindor mb-2">
                  A Letter from the Department of Mysteries
                </h2>
                <p className="text-ink italic">(My Heart)</p>
              </div>
              <div className="bg-white/50 p-8 rounded-lg border-2 border-gold/30">
                <div className="space-y-4 text-ink text-lg leading-relaxed font-handwritten">
                  <p className="text-right italic">My Dearest,</p>
                  <p>
                    In the Department of Mysteries, there are many things that
                    cannot be explained by magic alone. But you, my love, are
                    the greatest mystery of all—and the one I want to spend
                    forever solving.
                  </p>
                  <p>
                    Like the Marauder&apos;s Map, you&apos;ve shown me all the secret
                    passages of my heart. Like the Room of Requirement, you&apos;ve
                    given me everything I never knew I needed. And like the
                    Unbreakable Vow, I want to make a promise to you that will
                    last forever.
                  </p>
                  <p>
                    Will you be my Player 2? My permanent partner in mischief?
                    My always?
                  </p>
                  <p className="text-right mt-8">
                    <span className="font-magical text-gryffindor">
                      Forever yours,
                    </span>
                    <br />
                    <span className="italic">[Your Name]</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
