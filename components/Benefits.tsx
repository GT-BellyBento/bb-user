export default function Benefits() {
  const customerBenefits = [
    {
      icon: '🏠',
      title: 'Home-Cooked Meals',
      description: 'Enjoy authentic, homemade food made with love and care.',
    },
    {
      icon: '💰',
      title: 'Affordable Pricing',
      description: 'Save money compared to restaurants with our competitive monthly plans.',
    },
    {
      icon: '🥗',
      title: 'Healthy & Fresh',
      description: 'Nutritious meals prepared fresh daily with quality ingredients.',
    },
    {
      icon: '⏰',
      title: 'Save Time',
      description: 'No more cooking or meal prep. Focus on what matters to you.',
    },
  ];

  const providerBenefits = [
    {
      icon: '📈',
      title: 'Grow Your Business',
      description: 'Reach more customers and expand your tiffin service easily.',
    },
    {
      icon: '📱',
      title: 'Easy Management',
      description: 'Manage orders, menus, and subscriptions from one dashboard.',
    },
    {
      icon: '💵',
      title: 'Reliable Income',
      description: 'Get stable monthly income with subscription-based customers.',
    },
    {
      icon: '🌟',
      title: 'Build Reputation',
      description: 'Collect reviews and ratings to attract more customers.',
    },
  ];

  return (
    <section id="benefits" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
            Why Choose BellyBento?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Benefits for both customers and tiffin service providers
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* For Customers */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                🍽️
              </div>
              <h3 className="text-2xl font-bold text-dark">For Customers</h3>
            </div>

            <div className="space-y-6">
              {customerBenefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Providers */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                👨‍🍳
              </div>
              <h3 className="text-2xl font-bold text-dark">For Providers</h3>
            </div>

            <div className="space-y-6">
              {providerBenefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
