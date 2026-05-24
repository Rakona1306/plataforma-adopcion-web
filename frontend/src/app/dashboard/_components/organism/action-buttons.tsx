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
    <div className="w-full flex gap-2 justify-between items-center">
      <p className="text-slate-900 font-bold">{title}:</p>
      <div className="flex gap-2 items-center">
        {buttons.map((button, index) => {
          if (button.href) {
            return (
              <Link href={button.href}>
                <Button
                  key={index}
                  size="md"
                  className={`bg-primary! ${manrope.className} ${button.className || ""}`}
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
              className={`bg-primary! ${manrope.className} ${button.className || ""}`}
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