'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'

interface PensieveGalleryProps {
  onClose: () => void
}

// Placeholder images - replace with actual photos later
const photos = [
  { id: 1, src: '/api/placeholder/300/400', alt: 'Memory 1' },
  { id: 2, src: '/api/placeholder/300/400', alt: 'Memory 2' },
  { id: 3, src: '/api/placeholder/300/400', alt: 'Memory 3' },
  { id: 4, src: '/api/placeholder/300/400', alt: 'Memory 4' },
  { id: 5, src: '/api/placeholder/300/400', alt: 'Memory 5' },
  { id: 6, src: '/api/placeholder/300/400', alt: 'Memory 6' },
]

export default function PensieveGallery({ onClose }: PensieveGalleryProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

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
        className="bg-parchment rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-magical text-gryffindor">The Pensieve</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gold/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-ink" />
          </button>
        </div>
        <p className="text-ink text-lg mb-8 text-center italic">
          &quot;View our core memories.&quot;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative bg-white p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
                hoveredId === photo.id ? 'ripple-effect scale-105' : ''
              }`}
              style={{
                rotate: index % 2 === 0 ? '-2deg' : '2deg',
              }}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gryffindor/20 rounded flex items-center justify-center">
                <span className="text-ink/50 text-sm">Photo {photo.id}</span>
              </div>
              {hoveredId === photo.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 border-2 border-gold rounded-lg pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
