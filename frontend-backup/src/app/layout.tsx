import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ChatWidget from '@/components/ChatWidget';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Praxire | Premium Software & IT Solutions',
  description: 'Praxire delivers innovative software, web, mobile, AI, and digital transformation solutions for enterprises worldwide.',
  keywords: 'software development, IT services, web development, mobile apps, AI solutions, digital transformation, Praxire',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Praxire | Transforming Businesses Through Technology',
    description: 'Corporate IT, software engineering, and AI consulting services by Praxire.',
    url: 'https://praxire.com',
    siteName: 'Praxire',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-white text-text-primary transition-colors duration-200 flex flex-col font-sans">
        <Header />
        <main className="flex-grow pt-20 lg:pt-24">{children}</main>
        <Footer />
        <BackToTop />
        <ChatWidget />
      </body>
    </html>
  );
}
