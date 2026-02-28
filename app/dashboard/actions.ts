'use server'

import { z } from 'zod'
import { auth } from '@clerk/nextjs/server'
import { createLink } from '@/data/create-link'
import { updateLink } from '@/data/update-link'
import { deleteLink } from '@/data/delete-link'
import { revalidatePath } from 'next/cache'

const createLinkSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  expiresAt: z.string().optional(),
})

export async function createLinkAction(data: { originalUrl: string; title: string; expiresAt?: string }) {
  try {
    // 1. Check authentication
    const { userId } = await auth()
    if (!userId) {
      return { error: 'Unauthorized' }
    }
    
    // 2. Validate data
    const validated = createLinkSchema.parse(data)
    
    // 3. Process expiration date if provided
    let expiresAt: Date | undefined
    if (validated.expiresAt) {
      expiresAt = new Date(validated.expiresAt)
      if (expiresAt <= new Date()) {
        return { error: 'Expiration date must be in the future' }
      }
    }
    
    // 4. Use helper function from /data directory
    const result = await createLink({
      userId,
      originalUrl: validated.originalUrl,
      title: validated.title,
      expiresAt,
    })
    
    // 5. Revalidate the dashboard page to show the new link
    revalidatePath('/dashboard')
    
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message }
    }
    return { error: error instanceof Error ? error.message : 'An error occurred' }
  }
}

const updateLinkSchema = z.object({
  linkId: z.number(),
  originalUrl: z.string().url('Please enter a valid URL'),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  expiresAt: z.string().optional(),
})

export async function updateLinkAction(data: { linkId: number; originalUrl: string; title: string; expiresAt?: string }) {
  try {
    // 1. Check authentication
    const { userId } = await auth()
    if (!userId) {
      return { error: 'Unauthorized' }
    }
    
    // 2. Validate data
    const validated = updateLinkSchema.parse(data)
    
    // 3. Process expiration date if provided
    let expiresAt: Date | null | undefined
    if (validated.expiresAt === '') {
      expiresAt = null // Clear expiration date
    } else if (validated.expiresAt) {
      expiresAt = new Date(validated.expiresAt)
      if (expiresAt <= new Date()) {
        return { error: 'Expiration date must be in the future' }
      }
    }
    
    // 4. Use helper function from /data directory
    const result = await updateLink({
      linkId: validated.linkId,
      userId,
      originalUrl: validated.originalUrl,
      title: validated.title,
      expiresAt,
    })
    
    // 5. Revalidate the dashboard page to show the updated link
    revalidatePath('/dashboard')
    
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message }
    }
    return { error: error instanceof Error ? error.message : 'An error occurred' }
  }
}

export async function deleteLinkAction(linkId: number) {
  try {
    // 1. Check authentication
    const { userId } = await auth()
    if (!userId) {
      return { error: 'Unauthorized' }
    }
    
    // 2. Validate linkId
    if (!linkId || linkId <= 0) {
      return { error: 'Invalid link ID' }
    }
    
    // 3. Use helper function from /data directory
    await deleteLink(linkId, userId)
    
    // 4. Revalidate the dashboard page to remove the deleted link
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'An error occurred' }
  }
}

