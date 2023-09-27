import { db } from "@/src/db";
import { weights } from "@/src/db/schema";

export async function POST(req: Request, res: Response) {
    const {id, weight}: {
        id: number,
        weight: string
    } = await req.json()
    console.log(id, weight);

    const addedWeight = await db.insert(weights).values({
        exerciseId: id,
        weight: parseInt(weight)
    }).returning({
        id: weights.id,
        weight: weights.weight,
        createdAt: weights.createdAt,
    })

    console.log(addedWeight);

    if(!addedWeight) return new Response("Something went wrong trying to get the data", {status: 400})
        
    return new Response(JSON.stringify(addedWeight))
}
