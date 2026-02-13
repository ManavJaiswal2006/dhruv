'use client'

import { motion } from 'framer-motion'
import { X, Heart, Star, PlayCircle } from 'lucide-react'
import { useState } from 'react'
import { TimelineItems } from './constants'

interface LoveStoryProps {
  onClose: () => void
}

interface TimelineItem {
  title: string
  description: string
  icon: string
}

const timeline = TimelineItems;

export default function LoveStory({ onClose }: LoveStoryProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-rose-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFF9FA] rounded-[2.5rem] p-6 md:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-rose-100"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded-lg">
              <Star className="text-rose-500 fill-rose-500" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-rose-900">Our Story</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rose-100 rounded-full transition-colors text-rose-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-rose-400 text-lg mb-10 text-center italic font-serif">
          &quot;Every moment with you is my favorite memory.&quot;
        </p>

        <div className="space-y-12">
          {/* Video Section */}
          <div className="relative bg-rose-200/20 rounded-[2rem] aspect-video overflow-hidden border-2 border-dashed border-rose-200 shadow-inner group">
            {!isPlaying ? (
              <motion.div 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10 bg-[#FFF9FA]/40 backdrop-blur-sm transition-colors hover:bg-rose-100/40"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-center"
                >
                  <PlayCircle size={80} className="text-rose-500 mx-auto mb-4 drop-shadow-md opacity-80 group-hover:opacity-100" />
                  <p className="text-rose-900 font-serif text-xl">Watch Our Story</p>
                  <p className="text-rose-400 text-sm italic mt-1">Click to play movie</p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="w-full h-full bg-black"
              >
                {/* IMPORTANT: Place your video file in /public/videos/our-story.mp4 
                  Or replace the <video> tag with an <iframe> for YouTube.
                */}
                <video 
                  autoPlay 
                  controls 
                  className="w-full h-full object-contain"
                >
                  <source src="/videos/our-story.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            )}
          </div>

          {/* Timeline Section */}
          <div className="relative px-2">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-100 via-rose-300 to-rose-100 md:-translate-x-1/2"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot/Icon */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-rose-50">
                    <span className="text-xl">{item.icon}</span>
                  </div>

                  {/* Text Content */}
                  <div className={`w-full md:w-[45%] ml-12 md:ml-0 bg-white/60 p-6 rounded-2xl border border-rose-100 shadow-sm transition-transform hover:scale-[1.02] ${
                    index % 2 === 0 ? 'text-left' : 'md:text-right'
                  }`}>
                    <h3 className="text-xl font-bold text-rose-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-rose-900/70 leading-relaxed italic">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Heart Animation */}
        <footer className="mt-16 text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block"
          >
            <Heart size={32} className="text-rose-500 fill-rose-500" />
          </motion.div>
          <p className="text-rose-900 font-serif mt-4">To be continued...</p>
        </footer>
      </motion.div>
    </motion.div>
  )
}