"use client"

import { useScroll } from "@/core/application/hooks/useScroll"
import Image from "next/image"
import Link from "next/link"

export default function ImageExpandable({ alt, src, width, height, className, widthExpanded, heightExpanded, loading, href, notExpandable }: ImageExpandableProps) {

  const scrollY = useScroll()

  if (href) {
    return (
      <Link href={href}>
        <Image 
          src={src} 
          alt={alt}  
          width={notExpandable ? width : scrollY === 0 ? widthExpanded : width} 
          height={notExpandable ? height : scrollY === 0 ? heightExpanded : height}
          className={`${className} transition-all duration-300 ${!notExpandable && scrollY === 0 ? "cursor-pointer" : ""}`} 
          loading={loading}
        />
      </Link>
    )
  }

  return (
    <>
      <Image 
        src={src} 
        alt={alt}  
        width={notExpandable ? width : scrollY === 0 ? widthExpanded : width} 
        height={notExpandable ? height : scrollY === 0 ? heightExpanded : height} 
        className={`${className} transition-all duration-300 ${!notExpandable && scrollY === 0 ? "cursor-pointer" : ""}`} 
        loading={loading}
      />
    </>
  )
}

interface ImageExpandableProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string

  widthExpanded?: number
  heightExpanded?: number
  
  href?: string

  loading?: "eager" | "lazy"

  notExpandable?: boolean
}