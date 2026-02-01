'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface MirrorOfErisedProps {
  onClose: () => void
}

// Timeline of memories/dates - customize with your actual dates
const timeline = [
  { date: 'First Meeting', description: 'The day our story began...' },
  { date: 'First Date', description: 'When we discovered our connection...' },
  { date: 'Special Moment', description: 'A memory that made us smile...' },
  { date: 'Adventure Together', description: 'Our first big adventure...' },
  { date: 'Today', description: 'The day I ask you to be mine forever...' },
]

export default function MirrorOfErised({ onClose }: MirrorOfErisedProps) {
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
        className="bg-parchment rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-magical text-gryffindor">
            The Mirror of Erised
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gold/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-ink" />
          </button>
        </div>
        <p className="text-ink text-lg mb-8 text-center italic">
          &quot;Our story.&quot;
        </p>

        {/* Video placeholder or timeline */}
        <div className="space-y-8">
          {/* Video placeholder */}
          <div className="bg-black/20 rounded-lg aspect-video flex items-center justify-center border-2 border-gold/30">
            <div className="text-center text-ink/50">
              <p className="text-2xl mb-2">🎬</p>
              <p className="text-lg">Video Player</p>
              <p className="text-sm">(Add your video here)</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-gryffindor"></div>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex items-start space-x-4"
                >
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-gold to-gryffindor rounded-full flex items-center justify-center border-4 border-parchment">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 bg-white/50 p-6 rounded-lg border-2 border-gold/30">
                    <h3 className="text-2xl font-magical text-gryffindor mb-2">
                      {item.date}
                    </h3>
                    <p className="text-ink text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
