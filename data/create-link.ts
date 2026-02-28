import { db, links } from '@/db';
import { eq } from 'drizzle-orm';

/**
 * Generates a random 6-character alphanumeric short code
 */
function generateShortCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortCode = '';
  for (let i = 0; i < 6; i++) {
    shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return shortCode;
}

/**
 * Checks if a short code already exists in the database
 */
async function isShortCodeUnique(shortCode: string): Promise<boolean> {
  const existing = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  
  return existing.length === 0;
}

/**
 * Generates a unique short code by checking against the database
 */
async function generateUniqueShortCode(): Promise<string> {
  let shortCode = generateShortCode();
  let attempts = 0;
  const maxAttempts = 10;

  while (!await isShortCodeUnique(shortCode) && attempts < maxAttempts) {
    shortCode = generateShortCode();
    attempts++;
  }

  if (attempts === maxAttempts) {
    throw new Error('Failed to generate unique short code');
  }

  return shortCode;
}

interface CreateLinkData {
  userId: string;
  originalUrl: string;
  title?: string;
  expiresAt?: Date;
}

/**
 * Creates a new short link in the database
 */
export async function createLink(data: CreateLinkData) {
  const shortCode = await generateUniqueShortCode();

  const [newLink] = await db
    .insert(links)
    .values({
      userId: data.userId,
      shortCode,
      originalUrl: data.originalUrl,
      title: data.title || null,
      expiresAt: data.expiresAt || null,
    })
    .returning();

  return newLink;
}
