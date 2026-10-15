// GPS Location Pin Icon
const LocationPinIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C16.268 4 10 10.268 10 18C10 28.5 24 44 24 44C24 44 38 28.5 38 18C38 10.268 31.732 4 24 4Z" fill="#FF6B6B" stroke="#E55555" strokeWidth="2"/>
    <circle cx="24" cy="18" r="6" fill="white"/>
  </svg>
);

export default function HowItWorks() {
  const steps = [
    {
      icon: <LocationPinIcon />,
      title: 'Find',
      description: 'Discover tiffin providers near you based on your location and preferences.',
    },
    {
      icon: '🍱',
      title: 'Choose',
      description: 'Browse menus, read reviews, and select the perfect meal plan for your needs.',
    },
    {
      icon: '🛵',
      title: 'Enjoy',
      description: 'Get fresh, homemade tiffins delivered to your doorstep daily.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Getting your daily homemade tiffin is as easy as 1-2-3
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-primary-200" />
              )}

              {/* Step Card */}
              <div className="relative bg-white">
                {/* Icon Circle */}
                <div className="w-24 h-24 mx-auto mb-6 bg-primary-50 rounded-full flex items-center justify-center shadow-md text-5xl">
                  {step.icon}
                </div>

                {/* Step Number */}
                <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
