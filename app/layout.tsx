import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding Invitation | 28th April 2026 | Ashish & Ayushi",
  description:
    "With the blessings of the Almighty, we joyfully invite you and your family to the wedding of Dr. Ashish & Dr. Ayushi on 28th April 2026 at Tivoli Lotus Court, Sector 117, Noida.",
  authors: [{ name: "Ashish & Ayushi" }],
  openGraph: {
    type: "website",
    title: "Wedding Invitation | Ashish & Ayushi | 28th April 2026",
    description:
      "Join us to celebrate the wedding of Dr. Ashish & Dr. Ayushi on 28th April 2026 at Tivoli Lotus Court, Noida.",
    siteName: "Wedding Invitation | Ashish & Ayushi",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
