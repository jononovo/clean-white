import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { users, providers, type User, type Provider } from "@/shared/schema";

const sql = neon(process.env.DATABASE_URL!);
const drizzleDb = drizzle(sql);

interface CreateUserFromFirebaseInput {
  firebaseUid: string;
  email: string;
  username: string;
  avatarUrl?: string;
}

interface CreateProviderInput {
  userId: string;
  handle: string;
  displayName: string;
  avatarUrl?: string;
  contactEmail?: string;
}

export const db = {
  async getUserByFirebaseUid(firebaseUid: string): Promise<User | null> {
    const result = await drizzleDb
      .select()
      .from(users)
      .where(eq(users.firebaseUid, firebaseUid))
      .limit(1);
    return result[0] || null;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await drizzleDb
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return result[0] || null;
  },

  async createUserFromFirebase(input: CreateUserFromFirebaseInput): Promise<User> {
    const result = await drizzleDb
      .insert(users)
      .values({
        firebaseUid: input.firebaseUid,
        email: input.email,
        username: input.username,
        avatarUrl: input.avatarUrl,
      })
      .returning();
    return result[0];
  },

  async getUserById(id: string): Promise<User | null> {
    const result = await drizzleDb
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0] || null;
  },

  async getProviderByUserId(userId: string): Promise<Provider | null> {
    const result = await drizzleDb
      .select()
      .from(providers)
      .where(eq(providers.userId, userId))
      .limit(1);
    return result[0] || null;
  },

  async getProviderByHandle(handle: string): Promise<Provider | null> {
    const result = await drizzleDb
      .select()
      .from(providers)
      .where(eq(providers.handle, handle))
      .limit(1);
    return result[0] || null;
  },

  async createProvider(input: CreateProviderInput): Promise<Provider> {
    const result = await drizzleDb
      .insert(providers)
      .values({
        userId: input.userId,
        handle: input.handle,
        displayName: input.displayName,
        avatarUrl: input.avatarUrl,
        contactEmail: input.contactEmail,
      })
      .returning();
    return result[0];
  },

  async isHandleAvailable(handle: string): Promise<boolean> {
    const existing = await drizzleDb
      .select()
      .from(providers)
      .where(eq(providers.handle, handle.toLowerCase()))
      .limit(1);
    return existing.length === 0;
  },
};
