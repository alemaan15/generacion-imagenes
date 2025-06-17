import type { Metadata } from "next";
import "./globals.css";
import SidebarLayout from "./SidebarLayout";

export const metadata: Metadata = {
  title: "Generador de Imágenes IA",
  description: "App minimalista con menú lateral",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body>
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}
