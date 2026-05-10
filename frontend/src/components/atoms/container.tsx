import React from 'react'

export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`container mx-auto px-2 sm:px-4 lg:px-6 ${className || ''}`}>
      {children}
    </div>
  )
}
