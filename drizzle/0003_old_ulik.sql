DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutId_user_id_fk" FOREIGN KEY ("workoutId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutDays" ADD CONSTRAINT "workoutDays_workoutId_user_id_fk" FOREIGN KEY ("workoutId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
