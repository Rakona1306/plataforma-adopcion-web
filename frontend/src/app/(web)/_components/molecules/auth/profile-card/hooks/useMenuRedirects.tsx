"use client"

import { useAuth } from "@/core/application/features/system/auth/hooks/useAuth"
import { useRouter } from "next/navigation"

export const useMenuRedirects = () => {

  const router = useRouter()
  const { logout } = useAuth()

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