import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const skills = pgTable("skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  authorUsername: text("author_username").notNull(),
  authorId: varchar("author_id").references(() => users.id),
  version: text("version").notNull().default("1.0.0"),
  category: text("category").notNull().default("utility"),
  stars: integer("stars").notNull().default(0),
  downloads: integer("downloads").notNull().default(0),
  currentUsers: integer("current_users").notNull().default(0),
  allTimeUsers: integer("all_time_users").notNull().default(0),
  securityScore: integer("security_score").notNull().default(0),
  auditStatus: text("audit_status").notNull().default("pending"),
  isVerified: boolean("is_verified").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  readme: text("readme"),
  features: text("features").array(),
  tags: text("tags").array(),
  repositoryUrl: text("repository_url"),
  websiteUrl: text("website_url"),
  licenseType: text("license_type").default("MIT"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export const skillVersions = pgTable("skill_versions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  skillId: varchar("skill_id").notNull().references(() => skills.id),
  version: text("version").notNull(),
  changelog: text("changelog"),
  downloadUrl: text("download_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSkillVersionSchema = createInsertSchema(skillVersions).omit({
  id: true,
  createdAt: true,
});

export type InsertSkillVersion = z.infer<typeof insertSkillVersionSchema>;
export type SkillVersion = typeof skillVersions.$inferSelect;
