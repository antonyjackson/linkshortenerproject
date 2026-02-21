import { pgTable, integer, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: text('user_id').notNull(),
  shortCode: varchar('short_code', { length: 6 }).notNull().unique(),
  originalUrl: text('original_url').notNull(),
  title: text('title'),
  expiresAt: timestamp('expires_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => ({
  // Composite index for querying user's links sorted by creation date
  userCreatedIdx: {
    name: 'idx_user_created',
    columns: [table.userId, table.createdAt],
  },
}));
