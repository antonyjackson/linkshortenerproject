import { db, links } from '@/db';
import { eq, and } from 'drizzle-orm';

/**
 * Deletes a link from the database
 * Only allows users to delete their own links
 */
export async function deleteLink(linkId: number, userId: string) {
  const [deletedLink] = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  if (!deletedLink) {
    throw new Error('Link not found or you do not have permission to delete it');
  }

  return deletedLink;
}
