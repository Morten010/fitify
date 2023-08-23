import { db } from '@/src/db'
import { users } from '@/src/db/schema'
import {nanoid} from "nanoid"
import bcrypt from "bcrypt"
import { eq } from 'drizzle-orm'

type BodyProps = {
    email: string
    password: string
}

export async function POST(req: Request, res: Response) {
    const {password, email}: BodyProps = await req.json()

    if(!email || !password ){
        return new Response("Missing password and email", {
            status: 400
        })
    }

    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    })

    if(user){
        return new Response("User already exist", {
            status: 400
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.insert(users).values({
        email: email,
        password: hashedPassword,
        id: nanoid()
    })

    if(!newUser){
        return new Response("Something went wrong", {
            status: 400
        })
    }

    return new Response(JSON.stringify(newUser))
}
