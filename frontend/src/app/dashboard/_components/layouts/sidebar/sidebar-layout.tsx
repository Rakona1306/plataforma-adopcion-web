import { Divider } from "@mantine/core"
import ProfileUser from "./components/molecules/profile-user"
import NavLinks from "./components/molecules/nav-links"

export function SidebarLayout() {
  return (
    <div className="w-64 h-screen flex flex-col overflow-hidden bg-white border-r border-gray-200">

      <div className="p-4 shrink-0">
        <span className="font-bold text-lg text-gray-800">Logo</span>
      </div>

      <div className="px-4 shrink-0">
        <Divider />
      </div>

      <div className="flex-1 min-h-0 py-2 px-2 overflow-y-auto">
        <NavLinks />
      </div>

      <div className="w-full shrink-0 mt-auto">
        <div className="px-4">
          <Divider />
        </div>

        <div className="py-4 px-3 w-full">
          <ProfileUser />
        </div>
      </div>

    </div>
  )
}