import { Toaster } from "sileo"

export default function SileoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster 
        position="top-center"
        theme="dark"
        options={{
          fill: "#171717",
          styles: { description: "text-white/75!" },
        }}
      />
      {children}
    </div>
  )
}