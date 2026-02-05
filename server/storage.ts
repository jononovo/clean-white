import { db } from "./db";
import { skills, skillVersions, users, type InsertSkill, type Skill, type InsertSkillVersion, type SkillVersion, type InsertUser, type User } from "../shared/schema";
import { eq, desc, asc, like, sql, count, and } from "drizzle-orm";

export interface IStorage {
  getSkills(options?: { limit?: number; offset?: number; category?: string; search?: string }): Promise<Skill[]>;
  getSkillBySlug(slug: string): Promise<Skill | null>;
  getSkillByUsernameAndSlug(username: string, slug: string): Promise<Skill | null>;
  getSkillById(id: string): Promise<Skill | null>;
  getSkillCount(): Promise<number>;
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
  async getSkills(options?: { limit?: number; offset?: number; category?: string; search?: string }): Promise<Skill[]> {
    const { limit = 50, offset = 0, category, search } = options || {};
    
    let query = db.select().from(skills);
    
    if (category && category !== "all") {
      query = query.where(eq(skills.category, category)) as typeof query;
    }
    
    if (search) {
      query = query.where(like(skills.name, `%${search}%`)) as typeof query;
    }
    
    return query
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
