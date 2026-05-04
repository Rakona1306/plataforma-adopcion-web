'use client'

import { motion } from 'motion/react'

const socialLinks = [
  {
    icon: '🚀',
    label: 'Google',
    color: 'hover:bg-blue-50',
    border: 'hover:border-blue-300',
  },
  {
    icon: '👍',
    label: 'Facebook',
    color: 'hover:bg-blue-100',
    border: 'hover:border-blue-400',
  },
  {
    icon: '𝕏',
    label: 'Twitter',
    color: 'hover:bg-gray-50',
    border: 'hover:border-gray-300',
  },
  {
    icon: '🔗',
    label: 'LinkedIn',
    color: 'hover:bg-blue-50',
    border: 'hover:border-blue-200',
  },
]

export default function SocialLinks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-4 gap-3"
    >
      {socialLinks.map((social, index) => (
        <motion.button
          key={index}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
          whileTap={{ scale: 0.95 }}
          className={`py-3 px-2 rounded-lg border-2 border-slate-200 transition-all duration-300 ${social.color} ${social.border}`}
          aria-label={`Continuar con ${social.label}`}
        >
          <span className="text-2xl block text-center">{social.icon}</span>
        </motion.button>
      ))}
    </motion.div>
  )
}
