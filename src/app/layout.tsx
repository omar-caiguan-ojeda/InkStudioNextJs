import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InkStudio - Arte en tu Piel | Estudio de Tatuajes Profesional",
  description:
    "InkStudio - Estudio de tatuajes profesional especializado en blackwork, fine line, geométrico y realismo. Más de 5 años de experiencia y 500+ tatuajes realizados. Agenda tu cita hoy.",
  keywords: [
    "tatuajes",
    "tattoo",
    "blackwork",
    "fine line",
    "geométrico",
    "realismo",
    "estudio tatuajes",
    "arte corporal",
    "InkStudio",
  ],
  authors: [{ name: "InkStudio Team" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://inkstudio-tattoo.vercel.app/",
    title: "InkStudio - Arte en tu Piel | Estudio de Tatuajes Profesional",
    description:
      "Estudio de tatuajes profesional especializado en blackwork, fine line, geométrico y realismo. Más de 5 años de experiencia.",
    images: ["/tatto_01.jpeg"],
    siteName: "InkStudio",
  },
  twitter: {
    card: "summary_large_image",
    title: "InkStudio - Arte en tu Piel | Estudio de Tatuajes Profesional",
    description:
      "Estudio de tatuajes profesional especializado en blackwork, fine line, geométrico y realismo.",
    images: ["/tatto_01.jpeg"],
  },
  metadataBase: new URL("https://inkstudio-tattoo.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
