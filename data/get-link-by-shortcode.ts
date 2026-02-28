import { db, links } from '@/db';
import { eq } from 'drizzle-orm';

/**
 * Fetch a link by its short code
 */
export async function getLinkByShortCode(shortCode: string) {
  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return result[0] || null;
}
