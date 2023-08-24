CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"workoutId" integer NOT NULL,
	"dayName" text NOT NULL,
	"reps" integer NOT NULL,
	"sets" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workoutDays" (
	"id" serial PRIMARY KEY NOT NULL,
	"workoutId" integer,
	"dayName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"description" varchar(256) NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout" ADD CONSTRAINT "workout_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
