import { db } from "./db";
import { 
  skills, skillVersions, users, categories, tags, skillTags,
  type InsertSkill, type Skill, 
  type InsertSkillVersion, type SkillVersion, 
  type InsertUser, type User,
  type InsertCategory, type Category,
  type InsertTag, type Tag
} from "../shared/schema";
import { eq, desc, asc, like, sql, count, and, inArray } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getCategoryById(id: string): Promise<Category | null>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | null>;
  deleteCategory(id: string): Promise<boolean>;
  
  getTags(): Promise<Tag[]>;
  getTagBySlug(slug: string): Promise<Tag | null>;
  createTag(tag: InsertTag): Promise<Tag>;
  
  getSkills(options?: { limit?: number; offset?: number; category?: string; categoryId?: string; search?: string }): Promise<Skill[]>;
  getSkillsByCategory(categorySlug: string, options?: { limit?: number; offset?: number }): Promise<Skill[]>;
  getSkillBySlug(slug: string): Promise<Skill | null>;
  getSkillByUsernameAndSlug(username: string, slug: string): Promise<Skill | null>;
  getSkillById(id: string): Promise<Skill | null>;
  getSkillCount(): Promise<number>;
  getSkillCountByCategory(categoryId: string): Promise<number>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | null>;
  deleteSkill(id: string): Promise<boolean>;
  incrementSkillDownloads(id: string): Promise<void>;
  
  getSkillVersions(skillId: string): Promise<SkillVersion[]>;
  createSkillVersion(version: InsertSkillVersion): Promise<SkillVersion>;
  
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.name));
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
    return result[0] || null;
  }

  async getCategoryById(id: string): Promise<Category | null> {
    const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return result[0] || null;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await db.insert(categories).values(category).returning();
    return result[0];
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | null> {
    const result = await db
      .update(categories)
      .set({ ...category, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return result[0] || null;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id)).returning();
    return result.length > 0;
  }

  async getTags(): Promise<Tag[]> {
    return db.select().from(tags).orderBy(asc(tags.name));
  }

  async getTagBySlug(slug: string): Promise<Tag | null> {
    const result = await db.select().from(tags).where(eq(tags.slug, slug)).limit(1);
    return result[0] || null;
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const result = await db.insert(tags).values(tag).returning();
    return result[0];
  }

  async getSkills(options?: { limit?: number; offset?: number; category?: string; categoryId?: string; search?: string; author?: string }): Promise<Skill[]> {
    const { limit = 50, offset = 0, category, categoryId, search, author } = options || {};
    
    let query = db.select().from(skills);
    
    if (categoryId) {
      query = query.where(eq(skills.categoryId, categoryId)) as typeof query;
    } else if (category && category !== "all") {
      query = query.where(eq(skills.category, category)) as typeof query;
    }
    
    if (search) {
      query = query.where(like(skills.name, `%${search}%`)) as typeof query;
    }

    if (author) {
      query = query.where(eq(skills.authorUsername, author)) as typeof query;
    }
    
    return query
      .orderBy(desc(skills.downloads))
      .limit(limit)
      .offset(offset);
  }

  async getSkillsByCategory(categorySlug: string, options?: { limit?: number; offset?: number }): Promise<Skill[]> {
    const { limit = 50, offset = 0 } = options || {};
    
    const category = await this.getCategoryBySlug(categorySlug);
    if (!category) return [];
    
    return db
      .select()
      .from(skills)
      .where(eq(skills.categoryId, category.id))
      .orderBy(desc(skills.downloads))
      .limit(limit)
      .offset(offset);
  }

  async getSkillBySlug(slug: string): Promise<Skill | null> {
    const result = await db.select().from(skills).where(eq(skills.slug, slug)).limit(1);
    return result[0] || null;
  }

  async getSkillByUsernameAndSlug(username: string, slug: string): Promise<Skill | null> {
    const result = await db
      .select()
      .from(skills)
      .where(and(eq(skills.authorUsername, username), eq(skills.slug, slug)))
      .limit(1);
    return result[0] || null;
  }

  async getSkillById(id: string): Promise<Skill | null> {
    const result = await db.select().from(skills).where(eq(skills.id, id)).limit(1);
    return result[0] || null;
  }

  async getSkillCount(): Promise<number> {
    const result = await db.select({ count: count() }).from(skills);
    return result[0]?.count || 0;
  }

  async getSkillCountByCategory(categoryId: string): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(skills)
      .where(eq(skills.categoryId, categoryId));
    return result[0]?.count || 0;
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const result = await db.insert(skills).values(skill).returning();
    return result[0];
  }

  async updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | null> {
    const result = await db
      .update(skills)
      .set({ ...skill, updatedAt: new Date() })
      .where(eq(skills.id, id))
      .returning();
    return result[0] || null;
  }

  async deleteSkill(id: string): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id)).returning();
    return result.length > 0;
  }

  async incrementSkillDownloads(id: string): Promise<void> {
    await db
      .update(skills)
      .set({ downloads: sql`${skills.downloads} + 1` })
      .where(eq(skills.id, id));
  }

  async getSkillVersions(skillId: string): Promise<SkillVersion[]> {
    return db
      .select()
      .from(skillVersions)
      .where(eq(skillVersions.skillId, skillId))
      .orderBy(desc(skillVersions.createdAt));
  }

  async createSkillVersion(version: InsertSkillVersion): Promise<SkillVersion> {
    const result = await db.insert(skillVersions).values(version).returning();
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0] || null;
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
