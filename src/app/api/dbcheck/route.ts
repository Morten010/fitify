import { db } from "@/src/db";
import { workouts } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async () => {
  const workout = await db.query.workouts.findFirst({
    where: eq(workouts.id, 1),
  });

  if (!workout) {
    return NextResponse.json("Could not find a workout to update");
  }

  const res = await db
    .update(workouts)
    .set({
      userId: workout?.userId,
    })
    .where(eq(workouts.id, workout.id));

  return new Response(JSON.stringify(res));
};
