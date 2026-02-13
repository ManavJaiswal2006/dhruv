'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Mail, Sparkles } from 'lucide-react'
import { useState } from 'react'

interface LovePostProps {
  onClose: () => void
}

export default function LovePost({ onClose }: LovePostProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-rose-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFF9FA] rounded-[2rem] p-6 md:p-10 max-w-2xl w-full relative shadow-2xl border border-rose-100"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-rose-100 rounded-full transition-colors z-10 text-rose-400"
        >
          <X className="w-6 h-6" />
        </button>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
              className="flex flex-col items-center justify-center min-h-[400px] cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Envelope Visual */}
                <div className="w-72 h-52 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl shadow-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_white_0%,_transparent_70%)]" />
                  <div className="text-white text-center z-10">
                    <Mail size={48} className="mx-auto mb-3 opacity-90" />
                    <p className="text-xl font-medium tracking-wide">A Secret Message</p>
                    <p className="text-sm mt-2 font-light italic opacity-80">Click to unseal</p>
                  </div>
                </div>
                
                {/* Heart Seal */}
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-rose-50"
                >
                  <Heart className="text-rose-500 fill-rose-500" size={28} />
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
                  Private & Confidential
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-rose-900 leading-tight">
                  To the one who has my heart...
                </h2>
              </div>

              <div className="relative bg-white/60 p-6 md:p-8 rounded-2xl border border-rose-100 shadow-inner">
                <div className="absolute -top-3 -left-3 text-rose-200">
                    <Sparkles size={40} />
                </div>

                <div className="space-y-5 text-rose-900/80 text-lg leading-relaxed font-serif italic">
                  <p>My Dearest,</p>
                  <p>
                    They say that love is a journey, but with you, every single step feels like 
                    the destination. I never knew that life could be this vibrant, this kind, 
                    and this beautiful until you walked into it.
                  </p>
                  <p>
                    You are the quiet comfort in my toughest days and the loudest joy in my 
                    happiest moments. You've turned my ordinary world into something 
                    extraordinary, just by being exactly who you are.
                  </p>
                  <p>
                    So here is my simple, honest truth: I am so incredibly lucky to love you. 
                    Will you be my Valentine, today and every day after?
                  </p>
                  <div className="text-right mt-10">
                    <p className="text-rose-600 font-bold not-italic">Always yours,</p>
                    <p className="text-sm mt-1">[Your Name]</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}