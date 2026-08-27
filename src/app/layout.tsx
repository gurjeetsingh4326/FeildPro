import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { themeInitScript } from "@/components/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FieldPro",
  description: "Field service management for HVAC, electrical, plumbing, and commercial service businesses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* type swap avoids a dev-only "rendering produces <script> tags" warning on
            hydration — see node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md.
            The script still executes on the initial HTML parse because the server
            always emits type="text/javascript"; the client-only "text/plain" value
            never reaches the browser before hydration. */}
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <TooltipProvider delayDuration={200}>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
