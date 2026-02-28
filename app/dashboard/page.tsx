import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserLinks } from '@/data/get-links';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateLinkDialog } from './create-link-dialog';
import { EditLinkDialog } from './edit-link-dialog';
import { DeleteLinkDialog } from './delete-link-dialog';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const links = await getUserLinks(userId);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <CreateLinkDialog />
      </div>
      
      {links.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              No links yet. Create your first short link!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {links.map((link) => {
            const isExpired = link.expiresAt && link.expiresAt < new Date();
            const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${link.shortCode}`;
            
            return (
              <Card key={link.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{link.title || 'Untitled Link'}</CardTitle>
                      <CardDescription className="mt-2">
                        <span className="font-mono text-xs">{shortUrl}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {isExpired && (
                        <Badge variant="destructive">Expired</Badge>
                      )}
                      <EditLinkDialog link={link} />
                      <DeleteLinkDialog linkId={link.id} linkTitle={link.title} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Original URL: </span>
                      <a 
                        href={link.originalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {link.originalUrl}
                      </a>
                    </div>
                    <div className="flex gap-4 text-muted-foreground">
                      <span>Created: {link.createdAt.toLocaleDateString()}</span>
                      {link.expiresAt && (
                        <span>Expires: {link.expiresAt.toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
