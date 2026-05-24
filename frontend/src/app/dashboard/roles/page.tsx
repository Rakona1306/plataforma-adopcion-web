import RolesPage from "@/components/pages/dashboard/roles/roles-page";
import { Suspense } from "react";

export default function RolesPageNext() {
  return (
    <Suspense>
      <RolesPage />
    </Suspense>
  )
}