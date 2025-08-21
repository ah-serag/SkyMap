import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
     <div className="bg-muted relative hidden lg:block w-full h-screen">
  <Image 
    src="/photo/treeSignin.svg" 
    alt="Tree Signin" 
    fill 
    className="object-cover" // أو object-contain حسب الشكل المطلوب
     priority

 />
</div>

    </div>
  )
}
