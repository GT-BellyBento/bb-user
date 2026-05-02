'use client';

export default function Hero() {
  const scrollToWaitlist = (userType: 'customer' | 'provider') => {
    const form = document.getElementById('waitlist');
    form?.scrollIntoView({ behavior: 'smooth' });

    // Set the user type after a brief delay to allow scroll
    setTimeout(() => {
      const customerBtn = document.querySelector('[data-type="customer"]') as HTMLButtonElement;
      const providerBtn = document.querySelector('[data-type="provider"]') as HTMLButtonElement;

      if (userType === 'customer') {
        customerBtn?.click();
      } else {
        providerBtn?.click();
      }
    }, 500);
  };

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* BellyBento Name */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="text-dark">Belly</span>
            <span className="text-primary">Bento</span>
          </h2>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark mb-4 sm:mb-6">
            Homemade Tiffins,{' '}
            <span className="text-primary">Delivered Daily</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10">
            Connecting you with trusted tiffin providers in your area.
            Fresh, home-cooked meals delivered to your doorstep every day.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToWaitlist('customer')}
              className="btn-primary text-lg w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span>🍱</span>
              I Need Tiffins
            </button>
            <button
              onClick={() => scrollToWaitlist('provider')}
              className="btn-secondary text-lg w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span>👨‍🍳</span>
              I&apos;m a Provider
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10 text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm sm:text-base">Fresh Daily Meals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm sm:text-base">Verified Providers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm sm:text-base">Affordable Prices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
