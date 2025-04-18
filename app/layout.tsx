import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { bootstrap } from "global-agent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thumbnail Image Generator",
  description: "サムネイル画像を生成するアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (
    process.env.GLOBAL_AGENT_HTTP_PROXY &&
    process.env.GLOBAL_AGENT_HTTPS_PROXY
  ) {
    bootstrap();
  }

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
