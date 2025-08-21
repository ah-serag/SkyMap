import { GalleryVerticalEnd } from "lucide-react"

import {SignUpForm }from '../components/sinUpcom/FormSignUp'

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full bg-card items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}
