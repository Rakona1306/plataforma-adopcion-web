import { Toaster } from "sileo"

export default function SileoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster 
        position="top-center"
        options={{
          fill: "#EEEEEE"
        }}
      />
      {children}
    </div>
  )
}