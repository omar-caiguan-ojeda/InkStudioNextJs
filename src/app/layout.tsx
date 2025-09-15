import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "InkStudio - Arte en tu Piel | Estudio de Tatuajes Profesional",
    template: `%s | InkStudio`,
  },
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
    images: ["/tatto_011.jpg"],
    siteName: "InkStudio",
  },
  twitter: {
    card: "summary_large_image",
    title: "InkStudio - Arte en tu Piel | Estudio de Tatuajes Profesional",
    description:
      "Estudio de tatuajes profesional especializado en blackwork, fine line, geométrico y realismo.",
    images: ["/tatto_011.jpg"],
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
      <head>
        <script type="application/ld+json">
          {
            JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TattooParlor",
              "name": "InkStudio",
              "description": "Estudio de tatuajes profesional especializado en blackwork, fine line, geométrico y realismo. Más de 5 años de experiencia y 500+ tatuajes realizados.",
              "url": "https://inkstudio-tattoo.vercel.app/",
              "logo": "https://inkstudio-tattoo.vercel.app/icon.png",
              "image": "https://inkstudio-tattoo.vercel.app/tatto_011.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Libertador 1234",
                "addressLocality": "Buenos Aires",
                "postalCode": "C1425",
                "addressCountry": "AR"
              },
              "telephone": "+54-11-4567-8900",
              "openingHours": "Mo-Sa 10:00-20:00",
              "priceRange": "$$"
            })
          }
        </script>
      </head>
      <body>{children}</body>
    </html>
  );
}
