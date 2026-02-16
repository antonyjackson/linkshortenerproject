import Link from "next/link";
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <Badge variant="secondary" className="mb-4">
          Fast • Reliable • Secure
        </Badge>
        <h1 className="mb-6 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Shorten Links.
          <br />
          Track Everything.
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Create short, memorable links in seconds. Track clicks, analyze traffic, and optimize your marketing campaigns with powerful analytics.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-base">
            <Link href="/dashboard">Get Started Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to manage your links
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Powerful features to help you create, manage, and track your shortened links.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Instant Short Links
                </CardTitle>
                <CardDescription>
                  Create branded short links in milliseconds with our lightning-fast link shortener.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No waiting, no hassle. Just paste your long URL and get a clean, shareable short link instantly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Advanced Analytics
                </CardTitle>
                <CardDescription>
                  Track clicks, locations, devices, and referrers in real-time with detailed analytics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Make data-driven decisions with comprehensive insights into how your links perform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  Custom Branded Links
                </CardTitle>
                <CardDescription>
                  Create memorable, branded short links that match your business identity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Choose custom slugs and domains to reinforce your brand with every link you share.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  Secure & Reliable
                </CardTitle>
                <CardDescription>
                  Enterprise-grade security ensures your links are safe and always available.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bank-level encryption and 99.9% uptime guarantee keep your links protected and accessible.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  Mobile Optimized
                </CardTitle>
                <CardDescription>
                  Manage your links on the go with our fully responsive mobile interface.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create and track links from any device, anywhere, anytime with seamless mobile experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  Lightning Fast
                </CardTitle>
                <CardDescription>
                  Blazing fast redirects ensure your users reach their destination instantly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Optimized infrastructure delivers redirects in milliseconds for the best user experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of users who trust us with their links. Start creating short links today.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link href="/dashboard">Start Shortening Links</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
