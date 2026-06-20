import React from 'react'
import { Roboto_Flex } from 'next/font/google'
import Footer from './_components/layouts/footer'
import { Header } from './_components/layouts/header'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${robotoFlex.className}`}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
