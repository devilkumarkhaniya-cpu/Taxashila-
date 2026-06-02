
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AnalyticsTracker } from '@/components/analytics/tracker';
import { SubscriptionPrompt } from '@/components/notifications/subscription-prompt';

export const metadata: Metadata = {
  title: 'Takshashila - GPSC, GSSSB, SSC, Police Constable & PSI Preparation',
  description: 'Gujarat\'s leading platform for official exam materials. Get free study notes for SSC, GPSC, GSSSB, Police Constable, PSI, and GSSSB. Free mock tests, official PDFs, and current affairs.',
  keywords: 'GPSC Material, GSSSB Bin Sachivalay, SSC CGL Gujarat, Police Constable Study Material, PSI Exam Prep, Gujarat Government Job Preparation, Free Mock Test Gujarati, Bharat nu Bandharan PDF, Reasoning for GPSC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background">
        <FirebaseClientProvider>
          <AnalyticsTracker />
          {children}
          <SubscriptionPrompt />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
