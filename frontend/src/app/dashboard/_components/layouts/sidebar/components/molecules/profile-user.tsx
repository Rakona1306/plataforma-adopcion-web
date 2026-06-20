'use client'
import { useLogout } from "@/features/system/auth/hooks/useLogout";
import { useProfile } from "@/features/system/auth/hooks/useProfile";
import { Badge, Menu } from "@mantine/core";
import { BiLogOut, BiUser } from "react-icons/bi";
import { CgChevronRight } from "react-icons/cg";
import { MdPets } from "react-icons/md";

export default function ProfileUser() {
  const { isLoading, profile } = useProfile()
  const { logout } = useLogout()

  if (isLoading) {
    return <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-slate-200 border-r-2 border-l-2" />
    </div>
  }

  return (
    <Menu shadow="md" width={200} position="right">
      <Menu.Target>
        <div className="w-full rounded-xl border shadow shadow-black/30 border-slate-200 hover:bg-slate-200  p-2 px-4 flex gap-2 items-center justify-between cursor-pointer transition-all duration-300">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <MdPets className="text-white" size={15} />
            </div>
            <div>
              <p className="font-medium line-clamp-1">{profile?.name} {profile?.lastName}</p>
              <Badge className="bg-primary!">{profile?.role?.name}</Badge>
            </div>
          </div>
          <CgChevronRight size={15} />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Perfil</Menu.Label>
        <Menu.Divider />
        <Menu.Item leftSection={<BiUser size={15} />} >
          Mi información
        </Menu.Item>
        <Menu.Item onClick={() => logout()} className="text-red-500!" leftSection={<BiLogOut size={15} className="text-red-500" />} >
          Cerrar sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}