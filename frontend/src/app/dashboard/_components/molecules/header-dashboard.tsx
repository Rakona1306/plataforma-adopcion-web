import { montserrat } from "@/lib/fonts/monserrat";

export default function HeaderDashboard({ children }: { children: React.ReactNode }) {
  return (
    <header className={`bg-white shadow text-slate-800 py-5 px-6 ${montserrat.className}`}>
      {children}
    </header>
  )
}