'use client'

import { motion } from 'framer-motion'
import { X, Camera, Heart } from 'lucide-react'
import { useState } from 'react'

interface MemoryGalleryProps {
  onClose: () => void
}

const memories = [
  { id: 1, caption: 'The day we first met', date: 'Sept 2023' },
  { id: 2, caption: 'That rainy afternoon coffee', date: 'Oct 2023' },
  { id: 3, caption: 'Our first long walk', date: 'Nov 2023' },
  { id: 4, caption: 'Watching the sunset', date: 'Dec 2023' },
  { id: 5, caption: 'The laugh we couldn’t stop', date: 'Jan 2024' },
  { id: 6, caption: 'Our favorite dinner spot', date: 'Feb 2024' },
]

export default function MemoryGallery({ onClose }: MemoryGalleryProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-rose-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFF9FA] rounded-[2.5rem] p-8 md:p-12 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(255,182,193,0.3)] border border-rose-100"
      >
        <div className="flex justify-between items-center mb-10">
          <div className="space-y-1">
            <h2 className="text-4xl font-serif text-rose-900 flex items-center gap-3">
              Gallery of Us <Heart className="text-rose-500 fill-rose-500" size={28} />
            </h2>
            <p className="text-rose-400 font-light tracking-wide">A journey through our favorite snapshots</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-rose-100 rounded-full transition-colors text-rose-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, rotate: index % 2 === 0 ? -3 : 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group cursor-pointer"
            >
              {/* Polaroid Frame */}
              <div className="bg-white p-4 pb-12 rounded-sm shadow-xl border border-rose-50 transition-all duration-500 group-hover:shadow-rose-200 group-hover:-translate-y-2 group-hover:rotate-0">
                <div className="aspect-square bg-rose-50 overflow-hidden relative rounded-sm">
                  {/* Placeholder for actual image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 to-pink-50 flex items-center justify-center">
                    <Camera size={32} className="text-rose-200" />
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === photo.id ? 1 : 0 }}
                    className="absolute inset-0 bg-rose-500/10 flex items-center justify-center"
                  >
                    <Heart size={40} className="text-white fill-white/80" />
                  </motion.div>
                </div>

                {/* Polaroid Caption Area */}
                <div className="mt-4 px-1">
                  <p className="font-serif italic text-rose-800 text-lg line-clamp-1">{photo.caption}</p>
                  <p className="text-xs font-mono text-rose-300 mt-1 uppercase tracking-tighter">{photo.date}</p>
                </div>
              </div>

              {/* Decorative Tape Element */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8 bg-rose-100/40 backdrop-blur-sm -rotate-3 border-x border-rose-200/20" />
            </motion.div>
          ))}
        </div>

        <footer className="mt-16 text-center">
          <p className="text-rose-300 italic font-serif">And many more chapters yet to be written...</p>
        </footer>
      </motion.div>
    </motion.div>
  )
}