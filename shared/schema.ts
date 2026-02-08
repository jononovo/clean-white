import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firebaseUid: text("firebase_uid").unique(),
  email: text("email").unique(),
  username: text("username").notNull(),
  password: text("password"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  image: text("image"),
  isNew: boolean("is_new").notNull().default(false),
  skillCount: integer("skill_count").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
  examples: text("examples").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export const tags = pgTable("tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTagSchema = createInsertSchema(tags).omit({
  id: true,
  createdAt: true,
});

export type InsertTag = z.infer<typeof insertTagSchema>;
export type Tag = typeof tags.$inferSelect;

export const skills = pgTable("skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  authorUsername: text("author_username").notNull(),
  authorId: varchar("author_id").references(() => users.id),
  providerId: varchar("provider_id").references(() => providers.id),
  version: text("version").notNull().default("1.0.0"),
  category: text("category").notNull().default("utility"),
  categoryId: varchar("category_id").references(() => categories.id),
  stars: integer("stars").notNull().default(0),
  downloads: integer("downloads").notNull().default(0),
  currentUsers: integer("current_users").notNull().default(0),
  allTimeUsers: integer("all_time_users").notNull().default(0),
  securityScore: integer("security_score").notNull().default(0),
  auditStatus: text("audit_status").notNull().default("pending"),
  riskLevel: text("risk_level").notNull().default("unreviewed"),
  isVerified: boolean("is_verified").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  readme: text("readme"),
  features: text("features").array(),
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
}).extend({
  categoryId: z.string().min(1, "categoryId is required"),
});

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export const skillTags = pgTable("skill_tags", {
  skillId: varchar("skill_id").notNull().references(() => skills.id, { onDelete: "cascade" }),
  tagId: varchar("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (table) => [
  primaryKey({ columns: [table.skillId, table.tagId] }),
]);

export const insertSkillTagSchema = createInsertSchema(skillTags);
export type InsertSkillTag = z.infer<typeof insertSkillTagSchema>;
export type SkillTag = typeof skillTags.$inferSelect;

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

export const SERVICE_CATEGORIES = [
  "setup_installation",
  "managed_hosting", 
  "consulting",
  "training",
  "partnerships",
  "finance_tax",
] as const;

export const PRICING_TYPES = ["one_time", "monthly", "contact"] as const;

export const providers = pgTable("providers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  handle: text("handle").notNull().unique(),
  displayName: text("display_name").notNull(),
  description: text("description"),
  avatarUrl: text("avatar_url"),
  location: text("location"),
  website: text("website"),
  contactEmail: text("contact_email"),
  isVerified: boolean("is_verified").notNull().default(false),
  isPartner: boolean("is_partner").notNull().default(false),
  partnerRole: text("partner_role"),
  tagline: text("tagline"),
  rating: integer("rating"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProviderSchema = createInsertSchema(providers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertProvider = z.infer<typeof insertProviderSchema>;
export type Provider = typeof providers.$inferSelect;

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  providerId: varchar("provider_id").notNull().references(() => providers.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  categoryId: varchar("category_id").references(() => categories.id),
  slug: text("slug"),
  url: text("url"),
  pricingType: text("pricing_type").notNull().default("contact"),
  pricingLabel: text("pricing_label"),
  priceMin: integer("price_min"),
  priceMax: integer("price_max"),
  rating: integer("rating"),
  popularity: integer("popularity"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const featuredItems = pgTable("featured_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  href: text("href"),
  sourceUrl: text("source_url"),
  subtitle: text("subtitle"),
  author: text("author"),
  isVerified: boolean("is_verified").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertFeaturedItemSchema = createInsertSchema(featuredItems).omit({
  id: true,
  createdAt: true,
});

export type InsertFeaturedItem = z.infer<typeof insertFeaturedItemSchema>;
export type FeaturedItem = typeof featuredItems.$inferSelect;

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export const apps = pgTable("apps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  description: text("description").notNull(),
  logoUrl: text("logo_url"),
  authorHandle: text("author_handle").notNull(),
  website: text("website"),
  github: text("github"),
  isVerified: boolean("is_verified").notNull().default(false),
  isOpenSource: boolean("is_open_source").notNull().default(false),
  stars: integer("stars").notNull().default(0),
  downloads: integer("downloads").notNull().default(0),
  users: integer("users").notNull().default(0),
  platforms: text("platforms").array(),
  features: text("features").array(),
  integrations: text("integrations").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertAppSchema = createInsertSchema(apps).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertApp = z.infer<typeof insertAppSchema>;
export type App = typeof apps.$inferSelect;
