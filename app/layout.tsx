import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://harikrishnan-weds-dhana.netlify.app"),
  title: "Hari 🫶🏻 Dhana",
  description:
    "With the blessings of the Almighty, we joyfully invite you and your family to the wedding of Hari & Dhana on 24th June 2026 at Srinivasa Mandapam, Udayarpalayam, Thammampatti.",
  authors: [{ name: "Hari & Dhana" }],
  openGraph: {
    type: "website",
    url: "https://harikrishnan-weds-dhana.netlify.app/",
    title: "Wedding Invitation | Hari & Dhana | 24th June 2026",
    description:
      "Join us to celebrate the wedding of Hari & Dhana on 24th June 2026 at Srinivasa Mandapam, Udayarpalayam, Thammampatti.",
    siteName: "Wedding Invitation | Hari & Dhana",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hari & Dhana Wedding Invitation - 24th June 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Invitation | Hari & Dhana | 24th June 2026",
    description:
      "Join us to celebrate the wedding of Hari & Dhana on 24th June 2026 at Srinivasa Mandapam, Udayarpalayam, Thammampatti.",
    images: ["/og-image.png"],
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
