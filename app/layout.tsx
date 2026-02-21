import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Shortener",
  description: "Shorten your links easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorBackground: "oklch(0.205 0 0)",
          colorInputBackground: "oklch(0.205 0 0)",
          colorInputText: "oklch(0.985 0 0)",
          colorPrimary: "oklch(0.922 0 0)",
          colorText: "oklch(0.985 0 0)",
          colorTextSecondary: "oklch(0.708 0 0)",
          colorDanger: "oklch(0.704 0.191 22.216)",
          colorSuccess: "oklch(0.696 0.17 162.48)",
          colorNeutral: "oklch(0.556 0 0)",
          colorTextOnPrimaryBackground: "oklch(0.205 0 0)",
          borderRadius: "0.625rem",
        },
        elements: {
          card: "bg-card border-border shadow-lg",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton:
            "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80",
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90",
          footerActionLink: "text-primary hover:text-primary/90",
          formFieldInput:
            "bg-input border-input text-foreground focus:ring-ring",
          formFieldLabel: "text-foreground",
          identityPreviewText: "text-foreground",
          identityPreviewEditButton: "text-muted-foreground hover:text-foreground",
          dividerLine: "bg-border",
          dividerText: "text-muted-foreground",
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-between items-center p-4 border-b">
            <h1 className="text-2xl font-bold">Link Shortener</h1>
            <nav>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="ml-4">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </nav>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
