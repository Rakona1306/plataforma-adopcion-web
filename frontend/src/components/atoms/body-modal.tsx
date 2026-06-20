export default function BodyModal({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-4 py-6 rounded-bl-md rounded-br-md">
      {
        children
      }
    </div>
  )
}