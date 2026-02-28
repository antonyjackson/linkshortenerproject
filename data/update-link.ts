import { db, links } from '@/db';
import { eq, and } from 'drizzle-orm';

interface UpdateLinkData {
  linkId: number;
  userId: string;
  originalUrl?: string;
  title?: string;
  expiresAt?: Date | null;
}

/**
 * Updates an existing link in the database
 * Only allows users to update their own links
 */
export async function updateLink(data: UpdateLinkData) {
  const [updatedLink] = await db
    .update(links)
    .set({
      originalUrl: data.originalUrl,
      title: data.title,
      expiresAt: data.expiresAt === null ? null : data.expiresAt,
      updatedAt: new Date(),
    })
    .where(and(eq(links.id, data.linkId), eq(links.userId, data.userId)))
    .returning();

  if (!updatedLink) {
    throw new Error('Link not found or you do not have permission to update it');
  }

  return updatedLink;
}
