'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Wand2, BookOpen, Mail, Video, Gift, Trophy, Sparkles, Calendar, FlaskConical, Heart } from 'lucide-react'
import ConfundusButton from '@/components/ConfundusButton'
import MagicalCard from '@/components/MagicalCard'
import PensieveGallery from '@/components/PensieveGallery'
import OwlPost from '@/components/OwlPost'
import MirrorOfErised from '@/components/MirrorOfErised'
import WeekChallenge from '@/components/WeekChallenge'
import WeekSurprise from '@/components/WeekSurprise'
import EasterEgg from '@/components/EasterEgg'
import SpellCasting from '@/components/SpellCasting'
import PotionBrewing from '@/components/PotionBrewing'
import { getWeekTheme, getValentineWeek, getDaysUntilValentines } from '@/utils/valentineWeekSystem'

type Phase = 'landing' | 'dashboard'
type Modal = 'pensieve' | 'owlpost' | 'mirror' | 'challenge' | 'spell' | 'potion' | null
type Surprise = 'week' | 'easter' | null

export default function Home() {
  const [phase, setPhase] = useState<Phase>('landing')
  const [modal, setModal] = useState<Modal>(null)
  const [surprise, setSurprise] = useState<Surprise>(null)
  const [showNoButton, setShowNoButton] = useState(true)
  const [unlockedContent, setUnlockedContent] = useState<string[]>([])
  const [easterEggClicks, setEasterEggClicks] = useState(0)
  const characterRef = useRef<HTMLDivElement>(null)

  const weekTheme = getWeekTheme()
  const currentWeek = getValentineWeek()
  const daysUntil = getDaysUntilValentines()

  // Show week surprise on dashboard load (once per week)
  useEffect(() => {
    if (phase === 'dashboard' && !localStorage.getItem(`week-surprise-${currentWeek}`)) {
      setTimeout(() => {
        setSurprise('week')
        localStorage.setItem(`week-surprise-${currentWeek}`, 'true')
      }, 1000)
    }
  }, [phase, currentWeek])

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('valentine-progress')
    if (saved) {
      const data = JSON.parse(saved)
      setUnlockedContent(data.unlocked || [])
    }
  }, [])

  // Save progress
  const saveProgress = (newUnlocked: string[]) => {
    localStorage.setItem('valentine-progress', JSON.stringify({
      unlocked: newUnlocked,
      week: currentWeek,
    }))
  }

  const handleYesClick = () => {
    // Lumos Maxima animation - confetti
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: [weekTheme.color, '#d3a625', '#f5e6c8'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: [weekTheme.color, '#d3a625', '#f5e6c8'],
      })
    }, 250)

    // Flash effect
    const flash = document.createElement('div')
    flash.className =
      'fixed inset-0 bg-gradient-to-br from-gold to-yellow-200 opacity-0 pointer-events-none z-50'
    document.body.appendChild(flash)

    requestAnimationFrame(() => {
      flash.style.transition = 'opacity 0.3s'
      flash.style.opacity = '0.8'
      setTimeout(() => {
        flash.style.opacity = '0'
        setTimeout(() => {
          document.body.removeChild(flash)
          setPhase('dashboard')
        }, 300)
      }, 500)
    })
  }

  const handleNoClick = () => {
    setShowNoButton(false)
  }

  const handleChallengeComplete = () => {
    const newUnlocked = [...unlockedContent, weekTheme.unlockableContent]
    setUnlockedContent(newUnlocked)
    saveProgress(newUnlocked)
    setModal(null)
  }

  const handleCharacterClick = () => {
    setEasterEggClicks((prev) => {
      const newCount = prev + 1
      const threshold = currentWeek === 1 ? 7 : currentWeek === 3 ? 10 : 5

      if (newCount >= threshold && !unlockedContent.includes('Easter Egg: Secret')) {
        setSurprise('easter')
        setUnlockedContent([...unlockedContent, 'Easter Egg: Secret'])
        saveProgress([...unlockedContent, 'Easter Egg: Secret'])
      }

      return newCount
    })
  }

  const handleSpellComplete = () => {
    const newUnlocked = [...unlockedContent, 'Master Spellcaster Badge']
    setUnlockedContent(newUnlocked)
    saveProgress(newUnlocked)
    setModal(null)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [weekTheme.color, '#d3a625'],
    })
  }

  const handlePotionComplete = () => {
    const newUnlocked = [...unlockedContent, 'Master Potion Brewer']
    setUnlockedContent(newUnlocked)
    saveProgress(newUnlocked)
    setModal(null)
  }

  // Floating elements with week theme
  useEffect(() => {
    const elements = Array.from({ length: 5 }, (_, i) => {
      const el = document.createElement('div')
      el.className = 'fixed text-4xl animate-float pointer-events-none'
      el.textContent = i === 2 ? weekTheme.character : '💕'
      el.style.left = `${20 + i * 20}%`
      el.style.top = `${10 + Math.random() * 20}%`
      el.style.animationDelay = `${i * 0.5}s`
      el.style.opacity = '0.6'
      document.body.appendChild(el)
      return el
    })

    return () => {
      elements.forEach((el) => document.body.removeChild(el))
    }
  }, [weekTheme.character])

  return (
    <main
      className="min-h-screen bg-parchment relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${weekTheme.color}15 0%, #f5e6c8 50%, ${weekTheme.color}15 100%)`,
      }}
    >
      {/* Week indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-20 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border-2 border-gold/30 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" style={{ color: weekTheme.color }} />
          <div className="flex flex-col">
            <span className="font-magical text-sm" style={{ color: weekTheme.color }}>
              {weekTheme.weekName}
            </span>
            {daysUntil > 0 && (
              <span className="text-xs text-ink">
                {daysUntil} days until Valentine&apos;s
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Footsteps effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute bottom-10 left-10 text-2xl opacity-30 animate-float">
          👣
        </div>
        <div className="absolute bottom-20 right-20 text-2xl opacity-30 animate-float">
          👣
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-8"
          >
            {/* Animated Character - Clickable for Easter Egg */}
            <motion.div
              ref={characterRef}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-8xl mb-4 cursor-pointer"
              onClick={handleCharacterClick}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {weekTheme.character}
              </motion.div>
            </motion.div>

            {/* Main Text with Week Theme */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 max-w-2xl"
            >
              <h1
                className="text-5xl md:text-7xl font-magical text-shadow"
                style={{ color: weekTheme.color }}
              >
                {weekTheme.greeting}
              </h1>
              <p className="text-3xl md:text-4xl font-magical text-ink">
                I solemnly swear that I am up to no good...
              </p>
              <p className="text-2xl md:text-3xl font-magical text-ink italic">
                but will you make this mischief permanent?
              </p>
              <p className="text-xl text-ink italic mt-4">
                {weekTheme.specialMessage}
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYesClick}
                className="px-12 py-6 bg-gradient-to-r from-gold to-yellow-400 text-ink font-bold text-2xl rounded-xl shadow-2xl hover:magical-glow transition-all font-magical z-40"
              >
                Always
              </motion.button>

              {showNoButton && (
                <ConfundusButton onClick={handleNoClick} />
              )}
            </motion.div>
          </motion.div>
        )}

        {phase === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-screen p-8"
          >
            {/* Header with Week Theme */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2
                className="text-5xl md:text-6xl font-magical mb-4"
                style={{ color: weekTheme.color }}
              >
                {weekTheme.greeting} ⚡️
              </h2>
              <p className="text-2xl text-ink italic">
                {weekTheme.weekName}
              </p>
              <p className="text-lg text-ink mt-2">{weekTheme.specialMessage}</p>
            </motion.div>

            {/* Magical Cards - Week Specific */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 flex-wrap max-w-6xl mx-auto mb-8">
              {weekTheme.cards.map((card, index) => {
                let iconComponent
                let onClickHandler = () => {}

                if (card.title === 'The Pensieve') {
                  iconComponent = BookOpen
                  onClickHandler = () => setModal('pensieve')
                } else if (card.title === 'Owl Post') {
                  iconComponent = Mail
                  onClickHandler = () => setModal('owlpost')
                } else if (card.title === 'The Mirror' || card.title.includes('Mirror')) {
                  iconComponent = Video
                  onClickHandler = () => setModal('mirror')
                } else if (card.title === 'Spell Chamber') {
                  iconComponent = Wand2
                  onClickHandler = () => setModal('spell')
                } else if (card.title === 'Potion Lab') {
                  iconComponent = FlaskConical
                  onClickHandler = () => setModal('potion')
                } else if (card.title === 'The Proposal') {
                  iconComponent = Heart
                  onClickHandler = () => {
                    confetti({
                      particleCount: 200,
                      spread: 100,
                      origin: { y: 0.5 },
                      colors: [weekTheme.color, '#d3a625', '#f5e6c8'],
                    })
                    alert('Will you be mine forever? 💍')
                  }
                } else {
                  iconComponent = Gift
                }

                return (
                  <MagicalCard
                    key={index}
                    title={card.title}
                    description={card.description}
                    icon={iconComponent}
                    onClick={onClickHandler}
                    delay={index * 0.1}
                  />
                )
              })}

              {/* Week Challenge Card */}
              {currentWeek < 4 && (
                <MagicalCard
                  title={weekTheme.challenge}
                  description={`Week ${currentWeek} Challenge`}
                  icon={Trophy}
                  onClick={() => setModal('challenge')}
                  delay={weekTheme.cards.length * 0.1}
                />
              )}
            </div>

            {/* Unlocked Content Display */}

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 text-center text-ink text-lg"
            >
              <p className="font-magical">
                Managed by [Your Name]. Together until the very end.
              </p>
              <p className="text-sm mt-2 italic">
                {weekTheme.secretHint}
              </p>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {modal === 'pensieve' && (
          <PensieveGallery onClose={() => setModal(null)} />
        )}
        {modal === 'owlpost' && <OwlPost onClose={() => setModal(null)} />}
        {modal === 'mirror' && (
          <MirrorOfErised onClose={() => setModal(null)} />
        )}
        {modal === 'challenge' && (
          <WeekChallenge
            theme={weekTheme}
            onClose={() => setModal(null)}
            onComplete={handleChallengeComplete}
          />
        )}
        {modal === 'spell' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-parchment rounded-2xl p-8 max-w-2xl w-full"
            >
              <SpellCasting onComplete={handleSpellComplete} />
            </motion.div>
          </motion.div>
        )}
        {modal === 'potion' && (
          <PotionBrewing
            onComplete={handlePotionComplete}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>

      {/* Surprises */}
      <AnimatePresence>
        {surprise === 'week' && (
          <WeekSurprise
            theme={weekTheme}
            onClose={() => setSurprise(null)}
          />
        )}
        {surprise === 'easter' && (
          <EasterEgg
            message={weekTheme.secretHint}
            onClose={() => setSurprise(null)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
