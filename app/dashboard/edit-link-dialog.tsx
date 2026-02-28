'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateLinkAction } from './actions'
import { Edit } from 'lucide-react'

interface EditLinkDialogProps {
  link: {
    id: number
    title: string | null
    originalUrl: string
    expiresAt: Date | null
  }
}

export function EditLinkDialog({ link }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      linkId: link.id,
      originalUrl: formData.get('originalUrl') as string,
      title: formData.get('title') as string,
      expiresAt: formData.get('expiresAt') as string,
    }

    const result = await updateLinkAction(data)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      setSuccessMessage('Link updated successfully!')
      setIsLoading(false)
      // Close dialog after a short delay
      setTimeout(() => {
        setOpen(false)
        setSuccessMessage(null)
      }, 1000)
    }
  }

  // Format the date for datetime-local input
  const formatDateForInput = (date: Date | null) => {
    if (!date) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Update the details of your short link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="My awesome link"
              defaultValue={link.title || ''}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="originalUrl">Original URL</Label>
            <Input
              id="originalUrl"
              name="originalUrl"
              type="url"
              placeholder="https://example.com/very/long/url"
              defaultValue={link.originalUrl}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
            <Input
              id="expiresAt"
              name="expiresAt"
              type="datetime-local"
              defaultValue={formatDateForInput(link.expiresAt)}
              disabled={isLoading}
            />
          </div>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded p-3">
              {successMessage}
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Link'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
