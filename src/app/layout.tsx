import type { Metadata } from "next";
import "@/app/globals.css";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: "Quick Shotly — Professional iPhone Shoots & Cinematic Video Editing",
  description:
    "Premium creative agency for cinematic iPhone shoots, wedding films, Instagram reels, AI videos, and motion graphics with fast delivery.",
  openGraph: {
    title: "Quick Shotly — Professional iPhone Shoots & Cinematic Video Editing",
    description: "Cinematic iPhone shoots & professional video editing for brands and creators.",
    type: "website",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f26fa3e2-8aea-4346-a261-6eefaa15bb6f/id-preview-81a8c43a--cbf5b8f2-2994-46a6-b3e2-14c6e1e8cd11.lovable.app-1782794063859.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@QuickShotly",
    title: "Quick Shotly — Professional iPhone Shoots & Cinematic Video Editing",
    description:
      "Premium creative agency for cinematic iPhone shoots, wedding films, Instagram reels, AI videos, and motion graphics. Shoot on iPhone. Edit Like Cinema.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f26fa3e2-8aea-4346-a261-6eefaa15bb6f/id-preview-81a8c43a--cbf5b8f2-2994-46a6-b3e2-14c6e1e8cd11.lovable.app-1782794063859.png",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark font-poppins">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
