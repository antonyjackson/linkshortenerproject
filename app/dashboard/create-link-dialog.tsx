'use client'

import { useState, useRef } from 'react'
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
import { createLinkAction } from './actions'
import { Plus } from 'lucide-react'
import { LinkCreatedSuccessDialog } from './link-created-success-dialog'

export function CreateLinkDialog() {
  const formRef = useRef<HTMLFormElement>(null)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [createdLink, setCreatedLink] = useState<{ shortCode: string; title: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      originalUrl: formData.get('originalUrl') as string,
      title: formData.get('title') as string,
      expiresAt: formData.get('expiresAt') as string,
    }

    const result = await createLinkAction(data)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      // Reset form
      formRef.current?.reset()
      // Close create dialog
      setOpen(false)
      // Show success dialog with created link info
      if (result.data) {
        setCreatedLink({
          shortCode: result.data.shortCode,
          title: result.data.title || 'Untitled Link',
        })
        setShowSuccessDialog(true)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Short Link</DialogTitle>
          <DialogDescription>
            Enter the URL you want to shorten and give it a memorable title.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="My awesome link"
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
              disabled={isLoading}
            />
          </div>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
              {error}
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
              {isLoading ? 'Creating...' : 'Create Link'}
            </Button>
          </div>
        </form>
      </DialogContent>
      {createdLink && (
        <LinkCreatedSuccessDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
          shortCode={createdLink.shortCode}
          title={createdLink.title}
        />
      )}
    </Dialog>
  )
}
