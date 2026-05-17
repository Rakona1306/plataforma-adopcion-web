import NosotrosPage from "@/components/pages/web/aboiut-page";
import { Suspense } from "react";


export default async function Page() {

  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>
        <NosotrosPage />
      </Suspense>
    </div>
  )
}