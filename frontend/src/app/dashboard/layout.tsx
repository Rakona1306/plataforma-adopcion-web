import { Manrope } from "next/font/google";
import { SidebarLayout } from "./_components/layouts/sidebar";


const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className={`${manrope.className}`}>
      <main className="flex">
        <SidebarLayout />
        <div className="flex-1 h-screen bg-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
}