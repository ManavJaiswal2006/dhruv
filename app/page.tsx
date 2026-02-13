'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, MessageSquare, BookOpen, Sparkles, Calendar, Gift } from 'lucide-react'

// Components
import MagicalCard from '@/components/MagicalCard'
import ConfundusButton from '@/components/ConfundusButton'
import PensieveGallery from '@/components/PensieveGallery'
import OwlPost from '@/components/OwlPost'
import MirrorOfErised from '@/components/MirrorOfErised'

// Utils
import { getDaysUntilValentines } from '@/utils/valentineWeekSystem'

type Phase = 'landing' | 'dashboard'
type Modal = 'letters' | 'journey' | 'wish' | null

// 1. Static data moved outside to prevent re-creation
const ROMANTIC_CARDS = [
  { 
    title: 'Love Letters', 
    description: 'Ink-stained whispers of my deepest affection.', 
    icon: MessageSquare, 
    id: 'letters' as Modal,
    color: 'bg-rose-50'
  },
  { 
    title: 'Our Journey', 
    description: 'A magical Pensieve of our favorite memories.', 
    icon: BookOpen, 
    id: 'journey' as Modal,
    color: 'bg-pink-50'
  },
  { 
    title: 'Wish Jar', 
    description: 'A Mirror of Erised for our shared future.', 
    icon: Gift, 
    id: 'wish' as Modal,
    color: 'bg-fuchsia-50'
  }
] as const;

export default function Home() {
  const [phase, setPhase] = useState<Phase>('landing')
  const [modal, setModal] = useState<Modal>(null)
  const daysUntil = getDaysUntilValentines()

  const handleYesClick = () => {
    const heart = confetti.shapeFromPath({ 
        path: 'M167 10c-33.738 0-61.086 27.348-61.086 61.086 0 5.29 0.676 10.422 1.954 15.305L167 250l59.132-173.61c1.278-4.883 1.954-10.015 1.954-15.305 0-33.738-27.348-61.086-61.086-61.086z' 
    })
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4D6D', '#FF758F', '#C9184A'],
      shapes: [heart],
      scalar: 2
    })
    
    // Transition to the dashboard
    setPhase('dashboard')
  }

  // 2. Memoized background elements
  const backgroundElements = useMemo(() => (
    [...Array(12)].map((_, i) => (
      <motion.div
        key={`float-${i}`}
        className="absolute opacity-30 text-2xl select-none"
        initial={{ y: '110vh', x: `${Math.random() * 100}vw` }}
        animate={{ y: '-10vh', rotate: 360 }}
        transition={{ 
          duration: 15 + Math.random() * 10, 
          repeat: Infinity, 
          ease: 'linear',
          delay: Math.random() * 5 
        }}
      >
        {i % 2 === 0 ? '🌸' : '✨'}
      </motion.div>
    ))
  ), []);

  return (
    <main className="min-h-screen bg-[#FFF0F3] relative overflow-hidden text-[#5D1220] selection:bg-pink-200">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,182,193,0.4)_0%,_rgba(255,240,243,0)_70%)]" />
        {backgroundElements}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'landing' ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                filter: [
                    'drop-shadow(0 0 0px #FF4D6D)', 
                    'drop-shadow(0 0 20px #FF4D6D)', 
                    'drop-shadow(0 0 0px #FF4D6D)'
                ]
              }} 
              transition={{ repeat: Infinity, duration: 3 }}
              className="mb-8"
            >
              <Heart size={100} fill="#FF4D6D" className="text-[#FF4D6D]" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif italic mb-6 tracking-tight text-[#C9184A]">
              My Dearest...
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-12 text-[#800F2F]">
              In a world full of muggles, you are my most beautiful magic. 
              Will you be my Valentine?
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(255 77 109 / 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="group relative px-12 py-4 bg-[#FF4D6D] text-white font-bold text-xl rounded-full transition-all flex items-center gap-2"
              >
                Always <Sparkles className="group-hover:rotate-12 transition-transform" />
              </motion.button>
              
              {/* FIXED: Added the required onClick prop */}
              <ConfundusButton onClick={() => {}} />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 max-w-6xl mx-auto px-6 py-20"
          >
            <header className="text-center mb-20">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-bold tracking-widest uppercase mb-4"
              >
                Welcome Home
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-serif text-[#5D1220] mb-4">Our Sanctuary</h2>
              <p className="text-xl italic text-[#FF758F] flex items-center justify-center gap-2">
                <Sparkles size={18} /> where every second is a love story <Sparkles size={18} />
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {ROMANTIC_CARDS.map((card, i) => (
                <MagicalCard
                  key={card.id}
                  {...card}
                  onClick={() => setModal(card.id)}
                  delay={i * 0.1}
                />
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 p-10 rounded-[2.5rem] shadow-xl shadow-pink-200/50 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
                  <Calendar className="text-[#FF4D6D]" /> The Grand Occasion
                </h3>
                <p className="text-[#800F2F]/70">Counting down the heartbeats until our special day.</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-serif text-[#FF4D6D]">{daysUntil}</span>
                <span className="text-xl font-medium text-pink-400 uppercase tracking-tighter">Days to go</span>
              </div>
            </motion.div>

            <footer className="mt-20 text-center opacity-40 hover:opacity-100 transition-opacity">
              <p className="font-serif italic text-[#5D1220]">Hand-crafted with love, just for you.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modal === 'letters' && <OwlPost onClose={() => setModal(null)} />}
        {modal === 'journey' && <PensieveGallery onClose={() => setModal(null)} />}
        {modal === 'wish' && <MirrorOfErised onClose={() => setModal(null)} />}
      </AnimatePresence>
    </main>
  )
}