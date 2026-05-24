"use client"


import { navLinks } from "../../utils/nav-links.data";
import NavLinksItem from "./nav-links-item";

export default function NavLinks() {
  return (
    <div className="w-full space-y-1 py-4">
      {
        navLinks !== null && navLinks.map((link) => (
          <NavLinksItem key={link.module} {...link} />
        ))
      }
    </div>
  )
}