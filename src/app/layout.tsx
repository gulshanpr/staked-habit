'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

import './globals.css';
import { AppKit } from "@/context/web3modal";


// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Staked Habit",
//   description: "Minimal, stake based habit tracker for developers",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // const locale = router.locale as Locale;

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppKit>{children}</AppKit>
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
