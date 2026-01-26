'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface MagicalCardProps {
  title: string
  description: string
  icon: LucideIcon
  onClick: () => void
  delay?: number
}

export default function MagicalCard({
  title,
  description,
  icon: Icon,
  onClick,
  delay = 0,
}: MagicalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: 'spring' }}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border-2 border-gold/30 hover:border-gold hover:magical-glow transition-all duration-300 max-w-sm w-full"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-gradient-to-br from-gold to-gryffindor rounded-full">
          <Icon className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-magical text-gryffindor font-bold">
          {title}
        </h3>
        <p className="text-ink text-lg">{description}</p>
      </div>
    </motion.div>
  )
}
