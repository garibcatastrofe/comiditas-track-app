import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const reports = sqliteTable("reports", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull().unique(),
  breakfast: text("breakfast").notNull().default("empty"),
  lunch: text("lunch").notNull().default("empty"),
  dinner: text("dinner").notNull().default("empty"),
});
