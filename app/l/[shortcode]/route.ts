import { getLinkByShortCode } from '@/data/get-link-by-shortcode';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;

  // Fetch the link from the database
  const link = await getLinkByShortCode(shortcode);

  // If link not found, return 404
  if (!link) {
    return NextResponse.json(
      { error: 'Link not found' },
      { status: 404 }
    );
  }

  // Check if the link has expired
  if (link.expiresAt && new Date() > link.expiresAt) {
    return NextResponse.json(
      { error: 'Link has expired' },
      { status: 410 }
    );
  }

  // Redirect to the original URL
  return NextResponse.redirect(link.originalUrl);
}
