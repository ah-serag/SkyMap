'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "../Link/Link"
import { useForm } from "react-hook-form"
import { logoutSchema, Logoutschema } from "@/app/schemas/LogoutSchema"
import { zodResolver } from "@hookform/resolvers/zod"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Logoutschema>({
    resolver: zodResolver(logoutSchema),
  })

const onSubmit = async (data: Logoutschema) => {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result.message);
    reset();
  } catch (error) {
    console.error("Error registering user:", error);
  }
};


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Create a new account
        </p>
      </div>

      <div className="grid gap-4">
        {/* First Name */}
        <div className="grid gap-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            placeholder="First Name"
            {...register("first_name")}
          />
          {errors.first_name && (
            <p className="text-sm text-red-500">{errors.first_name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="grid gap-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            placeholder="Last Name"
            {...register("last_name")}
          />
          {errors.last_name && (
            <p className="text-sm text-red-500">{errors.last_name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Create new account
        </Button>
      </div>

      {/* Link to Login */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </div>
    </form>
  )
}
