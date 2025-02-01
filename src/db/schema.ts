import {
  timestamp,
  primaryKey,
  varchar,
  serial,
  boolean,
  mysqlTable,
  int,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

//user
export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  workouts: many(workouts),
}));

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

//accounts
export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export type SelectAccounts = typeof accounts.$inferSelect;
export type InsertAccounts = typeof accounts.$inferInsert;

//session
export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

//verificationTokens
export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export type SelectVerificationToken = typeof verificationTokens.$inferSelect;
export type InsertVerificationToken = typeof verificationTokens.$inferInsert;

// workouts
export const workouts = mysqlTable("workout", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("text", { length: 255 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  public: boolean("public").default(false).notNull(),
  isCopied: boolean("isCopied").default(false).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
});

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  user: one(users, {
    fields: [workouts.userId],
    references: [users.id],
  }),
  days: many(workoutDays),
}));

export type SelectWorkouts = typeof workouts.$inferSelect;
export type InsertWorkouts = typeof workouts.$inferInsert;

export const workoutDays = mysqlTable("workoutDays", {
  id: serial("id").primaryKey().notNull(),
  workoutId: int("workoutId"),
  dayName: varchar("dayName", { length: 255 }).notNull(),
});

export const workoutDaysRelations = relations(workoutDays, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [workoutDays.workoutId],
    references: [workouts.id],
  }),
  exercises: many(exercises),
}));

export type SelectWorkoutDays = typeof workoutDays.$inferSelect;
export type InsertWorkoutDays = typeof workoutDays.$inferInsert;

export const exercises = mysqlTable("exercises", {
  id: serial("id").primaryKey().notNull(),
  workoutDayId: int("workoutId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  reps: int("reps").notNull(),
  sets: varchar("sets", { length: 255 }).notNull(),
  video: varchar("video", { length: 255 }),
});
export const exercisesRelations = relations(exercises, ({ one, many }) => ({
  workoutDay: one(workoutDays, {
    fields: [exercises.workoutDayId],
    references: [workoutDays.id],
  }),
  weights: many(weights),
}));

export type SelectExercises = typeof exercises.$inferSelect;
export type InsertExercises = typeof exercises.$inferInsert;

export const weights = mysqlTable("weights", {
  id: serial("id").primaryKey().notNull(),
  weight: int("weight").notNull(),
  exerciseId: int("exerciseId").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const weightsRelations = relations(weights, ({ one }) => ({
  exercise: one(exercises, {
    fields: [weights.exerciseId],
    references: [exercises.id],
  }),
}));

export type SelectWeights = typeof weights.$inferSelect;
export type InsertWeights = typeof weights.$inferInsert;
