import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation, useQuery } from 'react-query';
import { toast } from './ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Weights } from '../db/schema';
import ExerciseWeightChart from './charts/ExerciseWeightChart';

export default function TrackWeights({exerciseId} : {
  exerciseId: number
}) {
  const [weight, setWeight] = useState("")
  const [amount, setAmount] = useState(3)

  // Get weights
  const {data: weights, isFetching, refetch, isFetched, isSuccess, isError} = useQuery({
    queryFn: async () => {
      
      const {data} = await axios.get(`/api/weights/find?id=${exerciseId}&amount=${amount}`)


      return data
    },
  })

  //add weight function
  const {mutateAsync: addWeight} = useMutation({
    mutationFn: async () => {
      const {data} = await axios.post(`/api/weights/create`, {
        id: exerciseId,
        weight: weight
      });
      return data
    },
    onError: (err: AxiosError) => {
      console.log(err);
      toast({
        title: "Could not add weight",
        description: `Could not add weight ${err.response?.data} at this time try again or come back later😢`,
        variant: "destructive"
      })
    },
    onSuccess: () => {
      toast({
        title: "Succesfully added🥳",
      })
      refetch()
    },
  });

  const handleAddWeight = () => {
    if(weight.length === 0){
      toast({
        title: "Need a weight",
        variant: "destructive"
      })
      return
    }
    addWeight()
  }

  useEffect(() => {
    if(amount !== 3){
        refetch()
    }
  }, [amount])
  

  return (
    <div
    className='flex flex-col'
    onClick={(e) => {
      e.stopPropagation()
    }}
    >
      <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className='flex flex-col gap-3 mt-3'
      >
        <Input 
        type='number'
        placeholder='How much did you lift?'
        className='text-base'
        value={weight}
        onChange={(e) => setWeight(e.currentTarget.value)}
        />
        <Button
        variant="default"
        onClick={() => handleAddWeight()}
        >
          Add this workouts weight
        </Button>
      </form>
      <div>
        <h4
        className='font-bold mt-3'
        >
          Last lifts
        </h4>
        <ul>
          {weights && isSuccess && !!weights[0] && weights.map((w: Weights) => (
            <li
            className='flex justify-between py-2 border-y border-border'
            >
              <span>{w.weight} kg</span>
              <span>{new Date(w.createdAt!).toLocaleDateString([], {
                  weekday: 'short', 
                  day : 'numeric', 
                  month: 'short', 
                })}
              </span>
            </li>
          ))}
        </ul>
        <Button
        variant="link"
        className='mt-2 w-full'
        onClick={() => setAmount(amount + 3)}
        >
            Show more
        </Button>
        {weights && weights.length >= 3 && <ExerciseWeightChart weights={weights} />}
      </div>
    </div>
  )
}
