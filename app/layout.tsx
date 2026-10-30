import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa Agent OS",
  description: "AI-powered visa applications with secure browser automation"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
