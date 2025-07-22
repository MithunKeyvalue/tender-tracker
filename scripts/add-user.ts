import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../database/schema.js";
import { users, contractors } from "../database/schema.js";
import bcrypt from "bcrypt";
import "dotenv/config";

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function addUser() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const client = postgres(connectionString);
  const db = drizzle(client, { schema });

  console.log("🌱 Adding new user...");

  try {
    // Create test contractor user
    const testPassword = await hashPassword("password123");
    const [testUser] = await db
      .insert(users)
      .values({
        email: "lettertojishnu@gmail.com",
        passwordHash: testPassword,
        firstName: "Jishnu",
        lastName: "Test",
        role: "contractor",
        emailVerified: true,
      })
      .returning();

    // Create contractor profile for test user
    await db
      .insert(contractors)
      .values({
        userId: testUser.id,
        companyName: "Jishnu Contractors Ltd.",
        description: "Specializing in construction and infrastructure projects",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
      });

    console.log("✅ Test contractor user created successfully!");
    console.log("   Email: lettertojishnu@gmail.com");
    console.log("   Password: password123");

  } catch (error) {
    console.error("❌ Failed to add user:", error);
    throw error;
  } finally {
    await client.end();
  }
}

addUser().catch(console.error);