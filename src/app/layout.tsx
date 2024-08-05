'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, type Locale } from '@rainbow-me/rainbowkit';
import { Toaster } from "@/components/ui/toaster";

import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { config } from '../walletConnet';

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

// Initialize QueryClient for react-query
const queryClient = new QueryClient();

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
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
          {/* <RainbowKitProvider locale={locale} > */}
            <RainbowKitProvider appInfo={{
                appName: 'Staked Habit',
                learnMoreUrl: 'https://staked-habit.vercel.app/',
              }}>
                {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        <Toaster />
      </body>
    </html>
  );
}
