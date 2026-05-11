import { Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Suspense fallback={<div className="py-16 sm:py-24 bg-primary" />}>
        <WaitlistForm />
      </Suspense>
      <Footer />
    </main>
  );
}
