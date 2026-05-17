import { useCallback, useEffect, useState } from "react"

type AlertType = "success" | "error" | "warning" | "info"
 
type AlertProps = {
  type: AlertType
  message: string
  title?: string
  dismissible?: boolean
  autoDismiss?: number // ms
  icon?: boolean
  onDismiss?: () => void
  className?: string
}

const CONFIG: Record<AlertType, { bg: string; border: string; text: string; muted: string; icon: string }> = {
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
    muted: "text-emerald-700",
    icon: "✓",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-900",
    muted: "text-red-700",
    icon: "✕",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-900",
    muted: "text-amber-700",
    icon: "⚠",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
    muted: "text-blue-700",
    icon: "i",
  },
}

export function Alert({
  type,
  message,
  title,
  dismissible = false,
  autoDismiss,
  icon = true,
  onDismiss,
  className = "",
}: AlertProps) {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)
 
  const dismiss = useCallback(() => {
    setLeaving(true)
    setTimeout(() => {
      setVisible(false)
      onDismiss?.()
    }, 300)
  }, [onDismiss])
 
  useEffect(() => {
    if (!autoDismiss) return
    const t = setTimeout(dismiss, autoDismiss)
    return () => clearTimeout(t)
  }, [autoDismiss, dismiss])
 
  if (!visible) return null
 
  const c = CONFIG[type]
 
  return (
    <div
      role="alert"
      aria-live="polite"
      className={[
        "flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm transition-all duration-300",
        c.bg,
        c.border,
        leaving ? "opacity-0 -translate-y-1 scale-[0.98]" : "opacity-100 translate-y-0 scale-100",
        className,
      ].join(" ")}
    >
      {icon && (
        <span
          aria-hidden="true"
          className={[
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold leading-none",
            type === "success" && "bg-emerald-500 text-white dark:bg-emerald-400",
            type === "error" && "bg-red-500 text-white dark:bg-red-400",
            type === "warning" && "bg-amber-400 text-amber-900 dark:bg-amber-300",
            type === "info" && "bg-blue-500 text-white dark:bg-blue-400 italic",
          ].join(" ")}
        >
          {c.icon}
        </span>
      )}
 
      <div className="min-w-0 flex-1">
        {title && (
          <p className={`font-semibold leading-snug ${c.text}`}>{title}</p>
        )}
        <p className={title ? `mt-0.5 ${c.muted}` : c.text}>{message}</p>
      </div>
 
      {dismissible && (
        <button
          onClick={dismiss}
          aria-label="Cerrar alerta"
          className={[
            "ml-auto shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-1",
            c.muted,
          ].join(" ")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

