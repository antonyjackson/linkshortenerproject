'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, Copy } from 'lucide-react'

interface LinkCreatedSuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shortCode: string
  title: string
}

export function LinkCreatedSuccessDialog({
  open,
  onOpenChange,
  shortCode,
  title,
}: LinkCreatedSuccessDialogProps) {
  const [copied, setCopied] = useState(false)
  const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${shortCode}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-green-600">Link Created Successfully! 🎉</DialogTitle>
          <DialogDescription>
            Your short link has been created and is ready to use.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Link Title</Label>
            <div className="font-medium">{title}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortUrl">Shortened URL</Label>
            <div className="flex gap-2">
              <Input
                id="shortUrl"
                value={shortUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Click the copy button to copy the link to your clipboard.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
