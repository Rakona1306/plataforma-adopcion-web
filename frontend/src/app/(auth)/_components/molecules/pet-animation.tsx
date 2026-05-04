'use client'

import { motion, Variants } from 'motion/react'

export default function PetAnimation() {
  // Paw print animation - fluttering in the background
  const pawVariants: Variants = {
    float: {
      y: [-20, 20, -20],
      x: [0, 10, 0],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  // Emoji animation
  const emojiVariants: Variants = {
    float: {
      y: [0, -30, 0],
      x: [0, 20, 0],
      opacity: [0.2, 0.5, 0.2],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const pets = [
    { emoji: '🐕', delay: 0 },
    { emoji: '🐈', delay: 1 },
    { emoji: '🐦', delay: 2 },
    { emoji: '🐰', delay: 3 },
  ]

  return (
    <>
      {/* Top left corner */}
      {pets.map((pet, index) => (
        <motion.div
          key={`pet-${index}`}
          className="absolute text-6xl"
          style={{
            top: `${10 + index * 15}%`,
            left: `${5 + index * 10}%`,
          }}
          variants={emojiVariants}
          animate="float"
          initial={{ opacity: 0 }}
          transition={{ delay: pet.delay }}
        >
          {pet.emoji}
        </motion.div>
      ))}

      {/* Floating paw prints */}
      <motion.div
        className="absolute text-5xl"
        style={{ top: '20%', right: '10%' }}
        variants={pawVariants}
        animate="float"
        initial={{ opacity: 0 }}
      >
        🐾
      </motion.div>

      <motion.div
        className="absolute text-4xl"
        style={{ bottom: '15%', left: '5%' }}
        variants={pawVariants}
        animate="float"
        initial={{ opacity: 0 }}
        transition={{ delay: 2 }}
      >
        🐾
      </motion.div>

      <motion.div
        className="absolute text-6xl"
        style={{ bottom: '25%', right: '15%' }}
        variants={pawVariants}
        animate="float"
        initial={{ opacity: 0 }}
        transition={{ delay: 1 }}
      >
        🐾
      </motion.div>

      {/* Bouncing hearts */}
      <motion.div
        className="absolute text-4xl"
        style={{ top: '40%', right: '5%' }}
        animate={{
          y: [-10, 10, -10],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ❤️
      </motion.div>

      {/* Animated circles background */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-10 border-2 border-primary"
        style={{ top: '10%', right: '20%' }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute w-48 h-48 rounded-full opacity-10 border-2 border-secondary"
        style={{ bottom: '20%', left: '10%' }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [180, 90, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </>
  )
}
