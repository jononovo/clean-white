import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { users, type User } from "@/shared/schema";

const sql = neon(process.env.DATABASE_URL!);
const drizzleDb = drizzle(sql);

interface CreateUserFromFirebaseInput {
  firebaseUid: string;
  email: string;
  username: string;
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
};
