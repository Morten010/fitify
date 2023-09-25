"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import React, { useEffect, useReducer} from 'react'
import { Button } from '../../ui/button'
import Days from './Days'
import Workouts from './Workouts'
import { useMutation } from 'react-query'
import { toast } from '../../ui/use-toast'
import axios, { AxiosError } from 'axios'
import { flatten, minLength, object, parse, string } from 'valibot'
import { useRouter } from 'next/navigation'
import { Icons } from '../../icons'


// props
export type WorkoutProps = {
    id: number
    exercise: string
    description: string
    reps: string
    sets: string
    video: string
}

export type DayProps = {
    id: number
    dayName: string
    exercises: WorkoutProps[]
}

export type FormProps = {
    title: string,
    description: string
    days: DayProps[]
}

// validation schemas
const workoutSchema = object({
    title: string("workout name required",[
      minLength(1, "workout name required"),
    ]),
    description: string("description required",[
        minLength(1, "description required"),
    ]),
});
const daysSchema = object({
    dayName: string("day name required",[
      minLength(1, "day name required"),
    ]),
});
const exerciseSchema = object({
    exercise: string("exercise required",[
      minLength(1, "exercise required"),
    ]),
    description: string("description required", [
        minLength(1, "description required")
    ]),
    reps: string("reps required",[
        minLength(1, "reps required"),
    ]),
    sets: string("sets required",[
        minLength(1, "sets required"),
    ]),
});

type WorkoutFormProps = {
    edit?: boolean
    workout?: ExistingWorkout
}

type ExistingWorkout = {
    id: number;
    name: string;
    description: string;
    userId: string;
    days: {
        id: number;
        workoutId: number | null;
        dayName: string;
        exercises: {
            id: number;
            name: string;
            description: string | null;
            workoutDayId: number;
            reps: number;
            sets: number;
            video: string | null
        }[];
    }[];
}

type NewExerciseProps = WorkoutProps &  {
    dayId: number 
}

export type Changes = {
    newDays: DayProps[];
    nameChange: string | undefined;
    descChange: string | undefined;
    daysChange: DayProps[];
    deletedDays: number[]
    ChangedExercises: WorkoutProps[];
    newExercises: NewExerciseProps[];
    deletedExercises: WorkoutProps[];
}


export default function WorkoutForm({edit = false, workout}: WorkoutFormProps) {
    const [workoutState, workoutDispatch] = useReducer((prev: FormProps, next: FormProps) => {
        return {...prev, ...next}
    }, {
       title: "",
       description: "",
        days: [{
            id: Date.now(),
            dayName: "legs",
            exercises: [{
                id: Date.now(),
                exercise: "",
                description: "",
                reps: "3",
                sets: "12",
                video: ""
            }]
        }]
    })
    console.log(workoutState);
    
    const router = useRouter()
    
    const {mutateAsync: createWorkout, isLoading} = useMutation({
        
        mutationFn: async () => {
            console.log(workoutState);
            const {data} = await axios.post("/api/workouts/create", workoutState);
            return data
        },
        onError: (err: AxiosError) => {
            console.log(err);
            toast({
            title: "Could not create user",
            description: `Could not create workout ${err.response?.data} at this time try again or come back later😢`,
            })
        },
        onSuccess: () => {
            toast({
            title: "Successfully created Workout🥳",
            description: "Redirecting you now"
            })
            setTimeout(() => {
                router.push("/")
            }, 3000);
        },
    });

    const {mutateAsync: UpdateWorkout, isLoading: isLoadingUpdate} = useMutation({
        
        mutationFn: async (changes: Changes & {workoutId: number}) => {
            console.log(changes);
            
            const {data} = await axios.put("/api/workouts/update", changes);
            return data
        },
        onError: (err: AxiosError) => {
            console.log(err);
            toast({
            title: "Could not Update the workout",
            description: `Could not Update the ${err.response?.data} at this time try again or come back later😢`,
            })
        },
        onSuccess: () => {
            toast({
            title: "Successfully Updated the workout🥳",
            description: "Redirecting you now"
            })
            setTimeout(() => {
                router.push("/")
            }, 3000);
        },
    });

    useEffect(() => {
      if(workout){
        workoutDispatch({
            days: workout.days.map(d => {
                return {
                    dayName: d.dayName,
                    id: d.id,
                    exercises: d.exercises.map(ex => {
                        return {
                            id: ex.id,
                            exercise: ex.name,
                            description: ex.description ? ex.description : "",
                            reps: ex.reps.toString(),
                            sets: ex.sets.toString(),
                            video: ex.video ? ex.video  : ""
                        }
                    })
                }
            }),
            description: workout.description,
            title: workout.name ,
        })
      }
    }, [])
    

    const handleSubmit = async () => {
        try{
            console.log(workoutState);
            const workoutDetails = {
                title: workoutState.title,
                description: workoutState.description
            }
            parse(workoutSchema, workoutDetails)

            workoutState.days.map(d => {
                if(!d.dayName){
                    const {exercises} = d
                    parse(daysSchema, exercises)
                }
                d.exercises.map(e => {
                    if(!e.exercise || !e.reps || !e.sets){
                        parse(exerciseSchema, e)
                    }
                })
            })

        }catch{
            toast({
                title: "Fill out everything",
                description: "Something in the form is missing. good luck hunting🔎",
                variant: "destructive"
            })
            return
        }
        await createWorkout()
    }    




    const handleEditSubmit = () => {
        //validate form
        try{
            console.log(workoutState);
            const workoutDetails = {
                title: workoutState.title,
                description: workoutState.description
            }
            parse(workoutSchema, workoutDetails)

            workoutState.days.map(d => {
                if(!d.dayName){
                    const {exercises} = d
                    parse(daysSchema, exercises)
                }
                d.exercises.map(e => {
                    if(!e.exercise || !e.reps || !e.sets){
                        parse(exerciseSchema, e)
                    }
                })
            })

        }catch{
            toast({
                title: "Fill out everything",
                description: "Something in the form is missing. good luck hunting🔎",
                variant: "destructive"
            })
            return
        }


        //check for changes
        const changes: Changes  = {
            newDays: [],
            nameChange: undefined,
            descChange: undefined,
            daysChange: [],
            ChangedExercises: [],
            newExercises: [],
            deletedExercises: [],
            deletedDays: []
        };

        // check for new days added
        workoutState.days.filter(d => {
            const oldDays = workout?.days.map(d => d.id)
            if(!oldDays?.includes(d.id)){
                changes.newDays.push(d)
            }
        })
        
        // check for changes in workout Description
        changes.nameChange = workout?.name !== workoutState.title ? workoutState.title : undefined;
        changes.descChange = workout?.description !== workoutState.description ? workoutState.description : undefined

        // Check for changes in existing days
        workout?.days.forEach((day) => {
            // Find the corresponding day in workoutState
            const newDay = workoutState?.days.find((newDay) => newDay.id === day.id);
            
            if (newDay) {
            // If a corresponding day is found in workoutState, check for changes
                if (day.dayName !== newDay.dayName) {
                    // If the day name has changed, update it
                    changes.daysChange.push({
                    id: day.id,
                    dayName: newDay.dayName,
                    exercises: [],
                    });
                }
            }
        });

        // checks for changes in existing exercises
        const oldExercises: Number[] = []
        workout?.days.map(d => {
            d.exercises.map(ex => {
                oldExercises.push(ex.id)
            })
        })
        console.log(oldExercises);

        workoutState.days.map(d => {
            let day = workout?.days.filter(day => {
                if(day.id === d.id) return day
            })
            
            //if day has been romoved stop running
            if(!day) return 
            if(!day[0]) return

            const exercises = day[0].exercises;
            console.log(exercises);
            
            return {
                dayName: d.dayName,
                exercises: d.exercises.filter(ex => {
                    const exercise = exercises.filter(e => {
                        if(e.id == ex.id) return e
                    })

                    //if exercise has been romoved stop running
                    if(!exercise) return

                    if(!exercise[0]) return

                    //if a change has occured return exercise
                    if(
                        
                        ex.exercise !== exercise[0].name ||
                        ex.description !== exercise[0].description ||
                        parseInt(ex.reps) !== exercise[0].reps ||
                        parseInt(ex.sets) !== exercise[0].sets
                    ){
                        changes.ChangedExercises.push(ex)
                    }
                }),
                id: d.id,
            }
        })

        // check for new exercises
        const oldDays = workoutState.days.filter(d => {
            const oldDaysId = workout?.days.map(d => d.id)
            if(oldDaysId?.includes(d.id)) return d

        })
        oldDays.map(i => {
            
            i.exercises.map(e => {
                if(!oldExercises.includes(e.id)){
                    changes.newExercises.push({
                        ...e,
                        dayId: i.id
                    })
                }
            })
        })

        // Check for deleted days
        if (workout) {
        workout.days.forEach((oldDay) => {
            const existsInWorkoutState = workoutState.days.some((newDay) => newDay.id === oldDay.id);
                if (!existsInWorkoutState) {
                changes.deletedDays.push(oldDay.id);
                }
            });
        }
        
        //check for deleted exercises
        const deletedExercises: WorkoutProps[] = [];

        if (workout) {
            workout.days.forEach((d) => {
                d.exercises.forEach((ex) => {
                    const existsInWorkoutState = workoutState.days.some((day) =>
                    day.exercises.some((exercise) => exercise.id === ex.id)
                    );

                    if (!existsInWorkoutState) {
                        const {name, description, reps, sets, video, ...rest} = ex
                        console.log(ex);
                        const formatted = {
                            ...rest,
                            exercise: name,
                            description: description ? description : "",
                            reps: reps.toString(),
                            sets: sets.toString(),
                            video: video ? video : ""
                        }
                    deletedExercises.push(formatted);
                    }
                });
            });
        }

        if(changes.newDays[0] ||
            changes.nameChange !== undefined ||
            changes.descChange !== undefined ||
            changes.daysChange[0] ||
            changes.ChangedExercises[0] ||
            changes.newExercises[0] ||
            changes.deletedExercises[0] ||
            changes.deletedDays[0]
        ){
            UpdateWorkout({
               ...changes, 
                workoutId: workout?.id!
             })
            return
        }
        toast({
            title: "There was nothing to update🤷‍♂️",
        })
        
    }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <Card>
            <CardHeader>
                <CardTitle>
                    Workout Details
                </CardTitle>
            </CardHeader>
            <CardContent
            className='gap-3 flex flex-col'
            >
                <Input 
                placeholder='workout name'
                value={workoutState.title}
                onChange={(e) => workoutDispatch({
                    ...workoutState,
                    title: e.currentTarget.value
                })}
                />
                <Textarea
                placeholder='description'
                className='resize-none'
                rows={5}
                value={workoutState.description}
                onChange={(e) => workoutDispatch({
                    ...workoutState,
                    description: e.currentTarget.value
                })}
                />
            </CardContent>
        </Card>
        
        <Days 
        workoutDispatch={workoutDispatch} 
        workoutState={workoutState} 
        />

        {workoutState.days.map(day => (
            <Workouts 
            workoutDispatch={workoutDispatch} 
            workoutState={workoutState} 
            workoutDay={day}
            key={day.id}
            />
        ))}

        <Button
        disabled={workout ? isLoadingUpdate : isLoading}
        onClick={() => workout ? handleEditSubmit() : handleSubmit()}
        >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoadingUpdate && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
        </Button>
    </form>
  )
}
