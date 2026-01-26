'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ConfundusButtonProps {
  onClick: () => void
}

export default function ConfundusButton({ onClick }: ConfundusButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const getRandomPosition = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 }

    const buttonWidth = 150
    const buttonHeight = 50

    const maxX = window.innerWidth - buttonWidth - 20
    const maxY = window.innerHeight - buttonHeight - 20

    const newX = Math.max(20, Math.random() * maxX)
    const newY = Math.max(20, Math.random() * maxY)

    return { x: newX, y: newY }
  }

  const handleMouseEnter = () => {
    const newPos = getRandomPosition()
    setPosition(newPos)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    const newPos = getRandomPosition()
    setPosition(newPos)
  }

  useEffect(() => {
    // Initial random position
    const initialPos = getRandomPosition()
    setPosition(initialPos)
  }, [])

  return (
    <motion.button
      ref={buttonRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        x: position.x,
        y: position.y,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        duration: 0.1,
      }}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onClick={onClick}
      className="fixed left-0 top-0 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-colors z-50 text-lg font-magical"
    >
      Avada Kedavra
    </motion.button>
  )
}
