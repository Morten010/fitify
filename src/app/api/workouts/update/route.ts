import { Changes } from "@/src/components/forms/workoutForm/WorkoutForm";
import { db } from "@/src/db";
import { exercises, workoutDays, workouts } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, res: Response) {
  const {
    newDays,
    ChangedExercises,
    daysChange,
    deletedExercises,
    descChange,
    nameChange,
    newExercises,
    workoutId,
    deletedDays,
    publicChange,
  }: Changes & {
    workoutId: number;
  } = await req.json();

  // if new days then add the new days
  if (newDays[0]) {
    newDays.map(async (day) => {
      const workoutDay = await db.insert(workoutDays).values({
        dayName: day.dayName,
        workoutId: workoutId,
      });
      const workoutDayId = workoutDay[0].insertId;
      const asyncExercises = day.exercises.map(async (ex) => {
        await db.insert(exercises).values({
          name: ex.exercise,
          reps: parseInt(ex.reps),
          sets: ex.sets,
          video: ex.video,
          workoutDayId: workoutDayId,
          description: ex.description,
        });
      });
      await Promise.all(asyncExercises);
    });
    await Promise.all(newDays);
  }

  //if name or desc changed update it
  if (nameChange && descChange && publicChange) {
    await db
      .update(workouts)
      .set({
        name: nameChange,
        description: descChange,
        public: publicChange,
      })
      .where(eq(workouts.id, workoutId));
  } else if (nameChange && descChange) {
    await db
      .update(workouts)
      .set({
        name: nameChange,
        description: descChange,
      })
      .where(eq(workouts.id, workoutId));
  } else if (nameChange && publicChange) {
    await db
      .update(workouts)
      .set({
        name: nameChange,
        public: publicChange,
      })
      .where(eq(workouts.id, workoutId));
  } else if (publicChange && descChange) {
    await db
      .update(workouts)
      .set({
        description: descChange,
        public: publicChange,
      })
      .where(eq(workouts.id, workoutId));
  } else if (nameChange) {
    await db
      .update(workouts)
      .set({
        name: nameChange,
      })
      .where(eq(workouts.id, workoutId));
  } else if (descChange) {
    await db
      .update(workouts)
      .set({
        description: descChange,
      })
      .where(eq(workouts.id, workoutId));
  } else if (publicChange) {
    await db
      .update(workouts)
      .set({
        public: publicChange,
      })
      .where(eq(workouts.id, workoutId));
  }

  //update days change
  if (daysChange) {
    const newDayChanges = daysChange.map(async (day) => {
      await db.update(workoutDays).set({
        dayName: day.dayName,
      });
    });
    await Promise.all(newDayChanges);
  }

  // update changed exercises
  if (ChangedExercises) {
    const newChangedExercises = ChangedExercises.map(async (ex) => {
      await db
        .update(exercises)
        .set({
          name: ex.exercise,
          description: ex.description,
          reps: parseInt(ex.reps),
          sets: ex.sets,
          video: ex.video,
        })
        .where(eq(exercises.id, ex.id));
    });
    await Promise.all(newChangedExercises);
  }

  // delete deleted exercises
  if (deletedExercises) {
    const newDeletedExercises = deletedExercises.map(async (ex) => {
      db.delete(exercises).where(eq(exercises.id, ex.id));
    });
    await Promise.all(newDeletedExercises);
  }

  // add new exercises
  if (newExercises) {
    const newerExercises = newExercises.map(async (ex) => {
      await db.insert(exercises).values({
        name: ex.exercise,
        description: ex.description,
        reps: parseInt(ex.reps),
        sets: ex.sets,
        video: ex.video,
        workoutDayId: ex.dayId,
      });
    });
    await Promise.all(newerExercises);
  }

  //delete days
  if (deletedDays) {
    deletedDays.map(async (day) => {
      await db.delete(workoutDays).where(eq(workoutDays.id, day));
    });
  }

  // if(!id) return new Response("Missing id", {status: 400})

  return new Response("Success");
}
