import { db, links } from '@/db';
import { eq, desc } from 'drizzle-orm';

/**
 * Fetch all links for a specific user, ordered by update date (newest first)
 */
export async function getUserLinks(userId: string) {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}
