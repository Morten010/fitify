"use client"

import { useState, useReducer, useEffect } from "react"
import { Icons } from "@/src/components/icons"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { cn } from "@/src/utils"
import { signIn, useSession } from 'next-auth/react'
import { email, minLength, object, type Output, parse, string, flatten } from 'valibot';
import { useMutation } from "react-query"
import axios, { AxiosError } from "axios";
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  login?: boolean
}

//validation schema
const LoginSchema = object({
  email: string("Email Required",[
    email("Email required")
  ]),
  password: string("Password required",[
    minLength(6, "Password has to be atleast 6 characters"),
  ]),
});

type UserProps = Output<typeof LoginSchema>

export default function UserAuthForm({ className, login=false, ...props }: UserAuthFormProps) {
  const [userState, userDispatch] = useReducer((prev: UserProps , next: UserProps ) => {
    return {...prev, ...next}
  }, {
    email: "",
    password: ""
  })
  const [errorState, errorDispatch] = useReducer((prev: UserProps, next: UserProps) => {
    return {...prev, ...next}
  }, {
    email: "",
    password: ""
  })
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {toast} = useToast()
  const session = useSession()
  const router = useRouter()
  
  type AddUserParams ={
    email: string;
    password: string;
  }

  const {mutate: AddUser} = useMutation({
    mutationFn: async ({email, password}: AddUserParams) => {
      const sendUser = {email, password};
      const {data} = await axios.post("/api/signup", sendUser);
      return data
    },
    onError: (err) => {
      console.log(err instanceof AxiosError);
      toast({
        title: "Could not create user",
        description: "Could not create user at this time try again or come back later😢",
      })
    },
    onSuccess: () => {
      toast({
        title: "Sucessfully created account",
        description: "Go Login now🥳"
      })
    },
  });
  

  async function handleLogin(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    errorDispatch({
      email: "",
      password: ""
    })

    try{
      parse(LoginSchema, {...userState})
      
    }catch(err: any){
      //flatten error to useable object
      const errors = flatten(err).nested

      //format password
      const newErrors = {
        email: errors.email ? errors.email[0] : "",
        password: errors.password ? errors.password[0] : "",
      }

      //set error
      errorDispatch(newErrors)

      //stop loading
      setIsLoading(false)
      return
    }
    
    const res = await signIn("credentials", {
      ...userState,
      redirect: false,
    })
    
    console.log(res);
    if(!res?.url){
      toast({
        title: "Incorrect Login Credentials",
        description: "the login credentials you entered are incorrect. Please double-check your email/username and password and try again😢"
      })      
      setIsLoading(false)
      return
    }

    toast({
      title: "Logged in",
      description: "Redirecting you now🏎️"
    })   
    setIsLoading(false)
  }

  async function handleSignup(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    errorDispatch({
      email: "",
      password: ""
    })

    try{
      parse(LoginSchema, {...userState})
      
    }catch(err: any){
      //flatten error to useable object
      console.log(err);
      
      const errors = flatten(err).nested

      //format password
      const newErrors = {
        email: errors.email ? errors.email[0] : "",
        password: errors.password ? errors.password[0] : "",
      }

      //set error
      errorDispatch(newErrors)

      //stop loading
      setIsLoading(false)
    }

    const res = await AddUser(userState)

    console.log(res);
    //stop loading
    setIsLoading(false)
    
  }
    
  useEffect(() => {
    if(session.data){
      router.refresh()
    }
  }, [session])
  

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={login ? handleLogin : handleSignup}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            {!login && (
              <>
                <Label className="sr-only" htmlFor="name">
                Email
                </Label>
                <Input
                  id="name"
                  placeholder="full Name"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={userState.password}
                  onChange={(e) => {
                    userDispatch({
                      ...userState,
                      password: e.currentTarget.value
                    })
                  }}
                />
              </>
            )}
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={userState.email}
              onChange={(e) => {
                userDispatch({
                  ...userState,
                  email: e.currentTarget.value
                })
              }}
              disabled={isLoading}
            />
            {errorState.email && (
              <p className="text-red-600 text-sm">
                {errorState.email}
              </p>
            )}
            <Label className="sr-only" htmlFor="password">
              Email
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={userState.password}
              onChange={(e) => {
                userDispatch({
                  ...userState,
                  password: e.currentTarget.value
                })
              }}
            />
          </div>
          {errorState.password && (
              <p className="text-red-600 text-sm">
                {errorState.password}
              </p>
          )}
          {errorMsg && (
            <p className="text-red-600 text-sm">
              {errorMsg}
            </p>
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {login ? "Login With Email" : "Sign Up With Email"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  )
}