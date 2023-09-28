"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Copy } from 'lucide-react'
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/src/components/ui/tooltip"
import { Icons } from '../icons';


export default function CopyButton({id}: {
    id: number
}) {
    const router = useRouter()

    const {mutateAsync: copyWorkout, isLoading} = useMutation({
        
        mutationFn: async () => {
            const {data} = await axios.post("/api/community/copy", {id});
            return data
        },
        onError: (err: AxiosError) => {
            console.log(err);
            toast({
            title: "Could not Copy workout",
            description: `Could not Copy workout ${err.response?.data} at this time try again or come back later😢`,
            })
        },
        onSuccess: () => {
            toast({
            title: "Successfully copied Workout🥳",
            description: "Redirecting you now"
            })
            setTimeout(() => {
                router.push("/")
            }, 3000);
        },
    });

    const handleCopy = () => {
        copyWorkout()
    }

  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                size="icon"
                variant="default"
                disabled={isLoading}
                className={isLoading ? "opacity-75" : ""}
                onClick={handleCopy}
                >
                    {isLoading ? (
                        <Icons.spinner className='h-4 w-4 animate-spin'/>
                    ) : (
                        <Copy className='h-4 w-4' />
                    )}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Copy workout</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}
