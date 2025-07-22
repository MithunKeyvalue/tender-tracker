import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../database/schema.js";
import { categories, tenders, users, contractors } from "../database/schema.js";
import bcrypt from "bcrypt";
import "dotenv/config";

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function seed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const client = postgres(connectionString);
  const db = drizzle(client, { schema });

  console.log("🌱 Seeding database...");

  try {
    // Create categories
    const [construction, technology, consulting, manufacturing] = await db
      .insert(categories)
      .values([
        {
          name: "Construction & Civil Works",
          slug: "construction-civil",
          description: "Infrastructure, buildings, and civil engineering projects",
        },
        {
          name: "Technology & IT Services",
          slug: "technology-it",
          description: "Software development, IT infrastructure, and digital services",
        },
        {
          name: "Consulting Services",
          slug: "consulting",
          description: "Management consulting, advisory, and professional services",
        },
        {
          name: "Manufacturing & Supply",
          slug: "manufacturing",
          description: "Equipment supply, manufacturing, and procurement",
        },
      ])
      .returning();

    console.log("✅ Categories created");

    // Create admin user
    const adminPassword = await hashPassword("admin123");
    const [adminUser] = await db
      .insert(users)
      .values({
        email: "admin@tenderflow.com",
        passwordHash: adminPassword,
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        emailVerified: true,
      })
      .returning();

    console.log("✅ Admin user created (email: admin@tenderflow.com, password: admin123)");

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

    console.log("✅ Test contractor user created (email: lettertojishnu@gmail.com, password: password123)");

    // Create sample tenders
    const now = new Date();
    const futureDate = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    await db.insert(tenders).values([
      {
        referenceNumber: "MH/2024/INFRA/001",
        title: "Smart City Infrastructure Development - Phase 1",
        description: "Development of smart city infrastructure including IoT sensors, traffic management systems, and urban planning solutions for Mumbai Metropolitan Region.",
        organization: "Mumbai Municipal Corporation",
        categoryId: construction.id,
        estimatedValue: "25000000",
        publishedDate: now,
        submissionDeadline: futureDate(30),
        openingDate: futureDate(31),
        location: "Mumbai, Maharashtra",
        contactEmail: "tenders@mumbai.gov.in",
        eligibilityCriteria: "Minimum 5 years experience in smart city projects",
        createdBy: adminUser.id,
      },
      {
        referenceNumber: "KA/2024/IT/045",
        title: "E-Governance Portal Development",
        description: "Design and development of comprehensive e-governance portal for Karnataka state government departments with citizen services integration.",
        organization: "Karnataka State IT Department",
        categoryId: technology.id,
        estimatedValue: "15000000",
        publishedDate: now,
        submissionDeadline: futureDate(21),
        openingDate: futureDate(22),
        location: "Bangalore, Karnataka",
        contactEmail: "it-tenders@karnataka.gov.in",
        eligibilityCriteria: "ISO certified IT companies with government project experience",
        createdBy: adminUser.id,
      },
      {
        referenceNumber: "DL/2024/CONSULT/012",
        title: "Urban Transport Planning Consultancy",
        description: "Comprehensive urban transport planning and feasibility study for Delhi NCR region including metro expansion and last-mile connectivity.",
        organization: "Delhi Development Authority",
        categoryId: consulting.id,
        estimatedValue: "8000000",
        publishedDate: now,
        submissionDeadline: futureDate(14),
        openingDate: futureDate(15),
        location: "New Delhi",
        contactEmail: "dda-tenders@delhi.gov.in",
        eligibilityCriteria: "Transportation planning expertise with minimum 10 completed projects",
        createdBy: adminUser.id,
      },
      {
        referenceNumber: "GJ/2024/MFG/089",
        title: "Solar Panel Supply and Installation",
        description: "Supply, installation and commissioning of 5MW solar power plant with grid connectivity for Gujarat government buildings.",
        organization: "Gujarat Energy Development Agency",
        categoryId: manufacturing.id,
        estimatedValue: "45000000",
        publishedDate: now,
        submissionDeadline: futureDate(45),
        openingDate: futureDate(46),
        location: "Ahmedabad, Gujarat",
        contactEmail: "solar@geda.gujarat.gov.in",
        eligibilityCriteria: "MNRE empaneled solar EPC contractors",
        createdBy: adminUser.id,
      },
      {
        referenceNumber: "TN/2024/INFRA/156",
        title: "Highway Expansion Project - NH45",
        description: "Four-laning of existing two-lane highway stretch from Chennai to Trichy including bridges and service roads.",
        organization: "Tamil Nadu Highways Department",
        categoryId: construction.id,
        estimatedValue: "120000000",
        publishedDate: now,
        submissionDeadline: futureDate(60),
        openingDate: futureDate(61),
        location: "Chennai to Trichy, Tamil Nadu",
        contactEmail: "highways@tn.gov.in",
        eligibilityCriteria: "AAA rated infrastructure companies with highway experience",
        createdBy: adminUser.id,
      },
    ]);

    console.log("✅ Sample tenders created");
    console.log("🎉 Seeding completed successfully!");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  } finally {
    await client.end();
  }
}

seed().catch(console.error);