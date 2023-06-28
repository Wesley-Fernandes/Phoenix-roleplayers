import Navbar from "@modules/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Security from "@modules/components/Security";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Phoenix Roleplayer",
  description: "Site de rpg modernizado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Security>
          {children}
        </Security>
      </body>
    </html>
  );
}
