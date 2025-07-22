import { 
  integer, 
  pgTable, 
  varchar, 
  text, 
  timestamp, 
  boolean, 
  decimal,
  pgEnum,
  uuid,
  index,
  uniqueIndex
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "contractor"]);
export const tenderStatusEnum = pgEnum("tender_status", ["draft", "published", "closed", "awarded", "cancelled"]);
export const applicationStatusEnum = pgEnum("application_status", ["draft", "submitted", "under_review", "shortlisted", "accepted", "rejected"]);
export const messageStatusEnum = pgEnum("message_status", ["sent", "delivered", "read"]);

// Users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  role: userRoleEnum("role").notNull().default("user"),
  isActive: boolean("is_active").notNull().default(true),
  emailVerified: boolean("email_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => {
  return {
    emailIdx: index("users_email_idx").on(table.email),
  };
});

// Contractors table (extended user info for contractors)
export const contractors = pgTable("contractors", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  registrationNumber: varchar("registration_number", { length: 100 }).unique(),
  taxNumber: varchar("tax_number", { length: 100 }),
  description: text("description"),
  website: varchar("website", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  postalCode: varchar("postal_code", { length: 20 }),
  country: varchar("country", { length: 100 }).notNull().default("India"),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => {
  return {
    userIdIdx: index("contractors_user_id_idx").on(table.userId),
    companyNameIdx: index("contractors_company_name_idx").on(table.companyName),
  };
});

// Categories table for tender categorization
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  parentId: uuid("parent_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Tenders table
export const tenders = pgTable("tenders", {
  id: uuid("id").defaultRandom().primaryKey(),
  referenceNumber: varchar("reference_number", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description").notNull(),
  organization: varchar("organization", { length: 255 }).notNull(),
  categoryId: uuid("category_id").references(() => categories.id),
  estimatedValue: decimal("estimated_value", { precision: 15, scale: 2 }),
  currency: varchar("currency", { length: 3 }).notNull().default("INR"),
  publishedDate: timestamp("published_date").notNull(),
  submissionDeadline: timestamp("submission_deadline").notNull(),
  openingDate: timestamp("opening_date"),
  status: tenderStatusEnum("status").notNull().default("published"),
  documentUrl: text("document_url"),
  eligibilityCriteria: text("eligibility_criteria"),
  contactEmail: varchar("contact_email", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 50 }),
  location: varchar("location", { length: 255 }),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => {
  return {
    titleIdx: index("tenders_title_idx").on(table.title),
    organizationIdx: index("tenders_organization_idx").on(table.organization),
    statusIdx: index("tenders_status_idx").on(table.status),
    deadlineIdx: index("tenders_deadline_idx").on(table.submissionDeadline),
    categoryIdx: index("tenders_category_idx").on(table.categoryId),
  };
});

// Tender applications
export const tenderApplications = pgTable("tender_applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenderId: uuid("tender_id").notNull().references(() => tenders.id, { onDelete: "cascade" }),
  contractorId: uuid("contractor_id").notNull().references(() => contractors.id, { onDelete: "cascade" }),
  status: applicationStatusEnum("status").notNull().default("draft"),
  proposalDocument: text("proposal_document"),
  quotedAmount: decimal("quoted_amount", { precision: 15, scale: 2 }),
  coverLetter: text("cover_letter"),
  submittedAt: timestamp("submitted_at"),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: uuid("reviewed_by").references(() => users.id),
  reviewNotes: text("review_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => {
  return {
    tenderContractorUnique: uniqueIndex("tender_contractor_unique").on(table.tenderId, table.contractorId),
    tenderIdx: index("applications_tender_idx").on(table.tenderId),
    contractorIdx: index("applications_contractor_idx").on(table.contractorId),
    statusIdx: index("applications_status_idx").on(table.status),
  };
});

// Saved tenders (bookmarks)
export const savedTenders = pgTable("saved_tenders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tenderId: uuid("tender_id").notNull().references(() => tenders.id, { onDelete: "cascade" }),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => {
  return {
    userTenderUnique: uniqueIndex("user_tender_unique").on(table.userId, table.tenderId),
    userIdx: index("saved_user_idx").on(table.userId),
    tenderIdx: index("saved_tender_idx").on(table.tenderId),
  };
});

// Messages table
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  senderId: uuid("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  recipientId: uuid("recipient_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subject: varchar("subject", { length: 255 }).notNull(),
  body: text("body").notNull(),
  status: messageStatusEnum("status").notNull().default("sent"),
  parentId: uuid("parent_id"),
  tenderId: uuid("tender_id").references(() => tenders.id),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => {
  return {
    senderIdx: index("messages_sender_idx").on(table.senderId),
    recipientIdx: index("messages_recipient_idx").on(table.recipientId),
    statusIdx: index("messages_status_idx").on(table.status),
    createdAtIdx: index("messages_created_at_idx").on(table.createdAt),
  };
});

// Templates table
export const templates = pgTable("templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // "proposal", "message", "cover_letter"
  subject: varchar("subject", { length: 255 }),
  content: text("content").notNull(),
  variables: text("variables"), // JSON string of variable placeholders
  isPublic: boolean("is_public").notNull().default(false),
  usageCount: integer("usage_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => {
  return {
    userIdx: index("templates_user_idx").on(table.userId),
    typeIdx: index("templates_type_idx").on(table.type),
    publicIdx: index("templates_public_idx").on(table.isPublic),
  };
});

// Audit log for important actions
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entity_type", { length: 50 }).notNull(),
  entityId: uuid("entity_id"),
  details: text("details"), // JSON string of action details
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => {
  return {
    userIdx: index("audit_user_idx").on(table.userId),
    actionIdx: index("audit_action_idx").on(table.action),
    entityIdx: index("audit_entity_idx").on(table.entityType, table.entityId),
    createdAtIdx: index("audit_created_at_idx").on(table.createdAt),
  };
});

// Define relations
export const usersRelations = relations(users, ({ one, many }) => ({
  contractor: one(contractors, {
    fields: [users.id],
    references: [contractors.userId],
  }),
  savedTenders: many(savedTenders),
  sentMessages: many(messages, {
    relationName: "sender",
  }),
  receivedMessages: many(messages, {
    relationName: "recipient",
  }),
  templates: many(templates),
  createdTenders: many(tenders),
  auditLogs: many(auditLogs),
}));

export const contractorsRelations = relations(contractors, ({ one, many }) => ({
  user: one(users, {
    fields: [contractors.userId],
    references: [users.id],
  }),
  applications: many(tenderApplications),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "categoryParent",
  }),
  children: many(categories, {
    relationName: "categoryParent",
  }),
  tenders: many(tenders),
}));

export const tendersRelations = relations(tenders, ({ one, many }) => ({
  category: one(categories, {
    fields: [tenders.categoryId],
    references: [categories.id],
  }),
  createdBy: one(users, {
    fields: [tenders.createdBy],
    references: [users.id],
  }),
  applications: many(tenderApplications),
  savedBy: many(savedTenders),
  relatedMessages: many(messages),
}));

export const tenderApplicationsRelations = relations(tenderApplications, ({ one }) => ({
  tender: one(tenders, {
    fields: [tenderApplications.tenderId],
    references: [tenders.id],
  }),
  contractor: one(contractors, {
    fields: [tenderApplications.contractorId],
    references: [contractors.id],
  }),
  reviewer: one(users, {
    fields: [tenderApplications.reviewedBy],
    references: [users.id],
  }),
}));

export const savedTendersRelations = relations(savedTenders, ({ one }) => ({
  user: one(users, {
    fields: [savedTenders.userId],
    references: [users.id],
  }),
  tender: one(tenders, {
    fields: [savedTenders.tenderId],
    references: [tenders.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one, many }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "sender",
  }),
  recipient: one(users, {
    fields: [messages.recipientId],
    references: [users.id],
    relationName: "recipient",
  }),
  tender: one(tenders, {
    fields: [messages.tenderId],
    references: [tenders.id],
  }),
  parent: one(messages, {
    fields: [messages.parentId],
    references: [messages.id],
    relationName: "messageThread",
  }),
  replies: many(messages, {
    relationName: "messageThread",
  }),
}));

export const templatesRelations = relations(templates, ({ one }) => ({
  user: one(users, {
    fields: [templates.userId],
    references: [users.id],
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}));

// Keep the original guestBook table for compatibility
export const guestBook = pgTable("guestBook", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});