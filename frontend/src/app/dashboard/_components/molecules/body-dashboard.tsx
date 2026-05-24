import classNames from "classnames";

export default function BodyDashboard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={classNames('p-6 w-full', className)}>
      {children}
    </main>
  )
}