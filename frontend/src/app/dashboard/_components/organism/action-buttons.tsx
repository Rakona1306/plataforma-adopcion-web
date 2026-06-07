import { manrope } from "@/lib/fonts/manrope"
import { Button } from "@mantine/core"
import Link from "next/link"

export interface IActionButtons {
  title?: string
  buttons: Buttons[]
}

export interface Buttons {
  label: string
  href?: string
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}


export function ActionButtons({ title = "Acciones", buttons }: IActionButtons) {
  return (
    <div className="w-full flex gap-2 justify-between md:items-center md:flex-row flex-col">
      <p className="text-sm md:text-base text-slate-900 font-bold">{title}:</p>
      <div className="flex gap-2 items-center md:flex-nowrap flex-wrap">
        {buttons.map((button, index) => {
          if (button.href) {
            return (
              <Link href={button.href} key={index}>
                <Button
                  key={index}
                  size="md"
                  className={`text-sm! md:text-base! bg-primary! ${manrope.className} ${button.className || ""}`}
                >
                  {button.label}
                </Button>

              </Link>
            )
          }

          return (
            <Button
              key={index}
              size="md"
              className={`text-sm! md:text-base! bg-primary! ${manrope.className} ${button.className || ""}`}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}