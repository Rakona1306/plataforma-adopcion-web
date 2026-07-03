"use client"

import { useLogout } from "@/features/system/auth/hooks/useLogout"
// import { useAuth } from "@/core/application/features/system/auth/hooks/useAuth"
import { useRouter } from "next/navigation"

export const useMenuRedirects = () => {

  const router = useRouter()
  const { logout } = useLogout()

  const onMyInfo = () => {
    router.push("/account/profile")
  }

  const onEditProfile = () => {
    router.push("/account/edit")
  }

  const onLogout = () => {
    logout()
  }

  return {
    onMyInfo,
    onEditProfile,
    onLogout,
  }
}