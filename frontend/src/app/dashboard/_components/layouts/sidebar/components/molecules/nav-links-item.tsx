"use client";
import { Collapse } from "@mantine/core";
import { NavLink } from "../../utils/nav-links.data";
import { useDisclosure } from "@mantine/hooks";
import { BiChevronDown } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLinksItem({ icon, items, module }: NavLink) {
  const pathname = usePathname();
  const shouldBeExpanded = items.some((item) => pathname === item.href);
  const [expanded, { toggle }] = useDisclosure(shouldBeExpanded);

  return (
    <div>
      <div onClick={toggle} className="w-full flex items-center justify-between hover:bg-gray-100 transition-all duration-300 cursor-pointer py-4 rounded-lg px-2">
        <div className="flex items-center gap-2">
          <span>{icon({ size: 17, className: 'text-primary' })}</span>
          <p className="font-medium">{module}</p>
        </div>

        <div>
          <BiChevronDown size={17} className={`transition-all duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <Collapse expanded={expanded}>
        <div className="w-full space-y-2 py-2">
          {
            items.map((item) => (
              <Link key={item.name} href={item.href} className="w-full block rounded-lg hover:bg-slate-200 transition-all duration-300 p-3 px-4">
                {item.name}
              </Link>
            ))
          }
        </div>
      </Collapse>
    </div>
  )
}