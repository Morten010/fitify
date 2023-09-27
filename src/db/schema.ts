import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  varchar,
  serial,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { InferModel, relations } from "drizzle-orm";


//user
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  password: text("password").notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
	workouts: many(workouts),
}));

export type Users = InferModel<typeof users>;

//accounts
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export type Accounts = InferModel<typeof accounts>;

//session
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

//verificationTokens
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
export type VerificationTokens = InferModel<typeof verificationTokens>;

// workouts
export const workouts = pgTable(
  "workout",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("text").notNull(),
    description: varchar('description', { length: 256 }).notNull(),
    public: boolean("public").default(false).notNull(),
    userId: text("userId").notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  }
)

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
	user: one(users, {
		fields: [workouts.userId],
		references: [users.id],
	}),
  days: many(workoutDays),
}));

export type Workouts= InferModel<typeof workouts>;

export const workoutDays = pgTable(
  "workoutDays", 
  {
    id: serial("id").primaryKey().notNull(),
    workoutId: integer("workoutId")
      .references(() => workouts.id, { onDelete: "cascade" }),
    dayName: text("dayName").notNull()
  }
)

export const workoutDaysRelations = relations(workoutDays, ({ one, many }) => ({
	workout: one(workouts, {
		fields: [workoutDays.workoutId],
		references: [workouts.id],
	}),
  exercises: many(exercises)
}));

export type WorkoutDays = InferModel<typeof workoutDays>;

export const exercises = pgTable(
  "exercises", 
  {
    id: serial("id").primaryKey().notNull(),
    workoutDayId: integer("workoutId").notNull()
      .references(() => workoutDays.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: varchar("description"),
    reps: integer("reps").notNull(),
    sets: text("sets").notNull(),
    video: varchar("video")
  }
)
export const exercisesRelations = relations(exercises, ({ one, many }) => ({
	workoutDay: one(workoutDays, {
		fields: [exercises.workoutDayId],
		references: [workoutDays.id],
	}),
  weights: many(weights)
}));

export type Exercises = InferModel<typeof exercises>;

export const weights = pgTable(
  "weights", 
  {
    id: serial("id").primaryKey().notNull(),
    weight: integer("weight").notNull(),
    exerciseId: integer("exerciseId").notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  }
)

export const weightsRelations = relations(weights, ({ one }) => ({
	exercise: one(exercises, {
		fields: [weights.exerciseId],
		references: [exercises.id],
	}),
}));

export type Weights = InferModel<typeof weights>;
