ALTER TABLE "exercises" DROP CONSTRAINT "exercises_workoutId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workoutDays" DROP CONSTRAINT "workoutDays_workoutId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutId_workoutDays_id_fk" FOREIGN KEY ("workoutId") REFERENCES "workoutDays"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutDays" ADD CONSTRAINT "workoutDays_workoutId_workout_id_fk" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
