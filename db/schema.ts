import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const generationBudget = sqliteTable('generation_budget', {
 key: text('key').primaryKey(),
 day: text('day').notNull(),
 dayCount: integer('day_count').notNull(),
 minute: text('minute').notNull(),
 minuteCount: integer('minute_count').notNull(),
});
