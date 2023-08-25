import UserAuthForm from "@/src/components/auth/UserAuthForm"
import { buttonVariants } from "@/src/components/ui/button"
import { cn } from "@/src/utils"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Join Fitness App - Start Your Fitness Journey Today",
  description: "Sign up now to access personalized workout programs, expert guidance, and a supportive fitness community. Take the first step towards a healthier lifestyle!",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-screen items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex justify-end">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Fitness
          </div>
          <div className="relative z-20">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;The secret weapon of your success&rdquo;
              </p>
            </blockquote>
          </div>
          <Image 
          src="/red-bg.jpg"
          alt="Auth pic"
          fill
          />
        </div>
        <div className="lg:p-8 h-full grid place-content-center ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}