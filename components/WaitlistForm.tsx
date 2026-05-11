'use client';

import { useState, useRef, useEffect } from 'react';
import { getStates, getCitiesForState } from '@/lib/locations';
import { useToast } from '@/components/Toast';

type UserType = 'customer' | 'provider';
type Step = 1 | 2 | 'success';

interface FormData {
  // Step 1 - Basic Info
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  userType: UserType;
  // Step 2 - Customer Fields
  dietPreference?: string;
  budgetRange?: string;
  mealsNeeded?: string;
  currentSolution?: string;
  urgency?: string;
  // Step 2 - Provider Fields
  businessName?: string;
  dailyCapacity?: string;
  cuisineType?: string;
  fssaiStatus?: string;
  experience?: string;
  currentCustomers?: string;
}

export default function WaitlistForm() {
  const [step, setStep] = useState<Step>(1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    userType: 'customer',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { showToast } = useToast();
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  // Field refs for auto-scroll
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLSelectElement>(null);
  const cityRef = useRef<HTMLSelectElement>(null);
  const step2FormRef = useRef<HTMLFormElement>(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  // Get states list
  const states = getStates();
  // Get cities based on selected state
  const cities = formData.state ? getCitiesForState(formData.state) : [];

  // Update card height based on current step
  useEffect(() => {
    const updateHeight = () => {
      if (step === 1 && frontRef.current) {
        setCardHeight(frontRef.current.scrollHeight);
      } else if (step === 2 && backRef.current) {
        setCardHeight(backRef.current.scrollHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [step, isFlipped]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Phone: only allow digits, max 10
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      return;
    }

    // If state changes, reset city
    if (name === 'state') {
      setFormData((prev) => ({ ...prev, state: value, city: '' }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (type: UserType) => {
    setFormData((prev) => ({ ...prev, userType: type }));
  };

  // Step 1 Submit - Save basic info
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields and scroll to first error
    if (!formData.name.trim()) {
      showToast('Please enter your full name', 'error');
      setIsSubmitting(false);
      nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameRef.current?.focus();
      return;
    }

    if (!formData.email.trim()) {
      showToast('Please enter your email address', 'error');
      setIsSubmitting(false);
      emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emailRef.current?.focus();
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      setIsSubmitting(false);
      emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emailRef.current?.focus();
      return;
    }

    // Validate phone is exactly 10 digits
    if (formData.phone.length !== 10) {
      showToast('Please enter a valid 10-digit phone number', 'error');
      setIsSubmitting(false);
      phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      phoneRef.current?.focus();
      return;
    }

    if (!formData.state) {
      showToast('Please select your state', 'error');
      setIsSubmitting(false);
      stateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      stateRef.current?.focus();
      return;
    }

    if (!formData.city) {
      showToast('Please select your city', 'error');
      setIsSubmitting(false);
      cityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      cityRef.current?.focus();
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: `+91${formData.phone}`, // Add +91 prefix when sending to API
          step: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit. Please try again.');
      }

      setUserId(data.id);
      setIsFlipped(true);
      setTimeout(() => setStep(2), 300);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Something went wrong', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2 Submit - Update with additional details
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          userType: formData.userType,
          // Customer fields
          dietPreference: formData.dietPreference,
          budgetRange: formData.budgetRange,
          mealsNeeded: formData.mealsNeeded,
          currentSolution: formData.currentSolution,
          urgency: formData.urgency,
          // Provider fields
          businessName: formData.businessName,
          dailyCapacity: formData.dailyCapacity,
          cuisineType: formData.cuisineType,
          fssaiStatus: formData.fssaiStatus,
          experience: formData.experience,
          currentCustomers: formData.currentCustomers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update. Please try again.');
      }

      setStep('success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Something went wrong', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsFlipped(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      state: '',
      city: '',
      userType: 'customer',
    });
    setUserId(null);
  };

  // Share messages based on user type
  const shareMessages = {
    customer: "Found this cool tiffin service called BellyBento! Fresh homemade meals delivered daily. Join the waitlist: https://bellybento.com",
    provider: "Hey! I signed up for BellyBento - a platform that connects tiffin providers with customers. Great for growing your business! Check it out: https://bellybento.com",
  };

  const [copied, setCopied] = useState(false);

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(shareMessages[formData.userType]);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareMessages[formData.userType]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Success State
  if (step === 'success') {
    return (
      <section id="waitlist" className="py-16 sm:py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
              🎉
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              You&apos;re on the list!
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Thank you for joining the BellyBento waitlist. We&apos;ll notify you as soon as we launch in your area.
            </p>

            {/* Share Section */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-gray-700 font-medium mb-4">
                Know someone who&apos;d love this?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleWhatsAppShare}
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Share on WhatsApp
                </button>
                <button
                  onClick={handleCopyMessage}
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-16 sm:py-24 bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flip-container">
          <div
            className={`flip-card ${isFlipped ? 'flipped' : ''}`}
            style={{ height: cardHeight ? `${cardHeight}px` : 'auto' }}
          >
            {/* FRONT - Step 1 */}
            <div
              ref={frontRef}
              className={`flip-card-front bg-white rounded-2xl p-6 sm:p-10 shadow-xl ${isFlipped ? 'invisible' : ''}`}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-3">
                  Join the Waitlist
                </h2>
                <p className="text-gray-600">
                  Be the first to know when BellyBento launches in your city
                </p>
              </div>

              {/* User Type Toggle with Sliding Animation */}
              <div className="relative flex rounded-lg bg-gray-100 p-1 mb-8">
                {/* Sliding Background */}
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-md shadow transition-all duration-300 ease-out ${formData.userType === 'provider' ? 'left-[calc(50%+2px)]' : 'left-1'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => handleUserTypeChange('customer')}
                  className={`relative flex-1 py-3 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 z-10 ${formData.userType === 'customer'
                      ? 'text-white'
                      : 'text-gray-600 hover:text-dark'
                    }`}
                >
                  <span>🍱</span>
                  I Need Tiffins
                </button>
                <button
                  type="button"
                  onClick={() => handleUserTypeChange('provider')}
                  className={`relative flex-1 py-3 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 z-10 ${formData.userType === 'provider'
                      ? 'text-white'
                      : 'text-gray-600 hover:text-dark'
                    }`}
                >
                  <span>👨‍🍳</span>
                  I&apos;m a Provider
                </button>
              </div>

              {/* Step 1 Form */}
              <form onSubmit={handleStep1Submit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-600 font-medium">
                      +91
                    </span>
                    <input
                      ref={phoneRef}
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      className="input-field rounded-l-none flex-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <select
                      ref={stateRef}
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="select-field"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <select
                      ref={cityRef}
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!formData.state}
                      className={`select-field ${!formData.state ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    >
                      <option value="">
                        {formData.state ? 'Select City' : 'Select state first'}
                      </option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    `Join as ${formData.userType === 'customer' ? 'Customer' : 'Provider'}`
                  )}
                </button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-6">
                We respect your privacy. No spam, ever.
              </p>
            </div>

            {/* BACK - Step 2 */}
            <div
              ref={backRef}
              className={`flip-card-back bg-white rounded-2xl p-6 sm:p-10 shadow-xl ${!isFlipped ? 'invisible' : ''}`}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-2">
                  You&apos;re in, {formData.name.split(' ')[0]}! 🎉
                </h2>
                <p className="text-gray-600">
                  Help us serve you better with a few more details
                </p>
              </div>

              <form ref={step2FormRef} onSubmit={handleStep2Submit} className="space-y-5">
                {/* Customer Step 2 Fields */}
                {formData.userType === 'customer' && (
                  <>
                    <div>
                      <label htmlFor="dietPreference" className="block text-sm font-medium text-gray-700 mb-1">
                        Diet Preference
                      </label>
                      <select
                        id="dietPreference"
                        name="dietPreference"
                        value={formData.dietPreference || ''}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Select your preference</option>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                        <option value="jain">Jain</option>
                        <option value="vegan">Vegan</option>
                        <option value="eggetarian">Eggetarian</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Budget (per meal)
                      </label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange || ''}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Select budget range</option>
                        <option value="80-100">₹80 - ₹100</option>
                        <option value="100-150">₹100 - ₹150</option>
                        <option value="150-200">₹150 - ₹200</option>
                        <option value="200+">₹200+</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="mealsNeeded" className="block text-sm font-medium text-gray-700 mb-1">
                        Meals Needed
                      </label>
                      <select
                        id="mealsNeeded"
                        name="mealsNeeded"
                        value={formData.mealsNeeded || ''}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Select meals</option>
                        <option value="lunch">Lunch only</option>
                        <option value="dinner">Dinner only</option>
                        <option value="both">Both Lunch & Dinner</option>
                        <option value="all">All meals (Breakfast + Lunch + Dinner)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="currentSolution" className="block text-sm font-medium text-gray-700 mb-1">
                        How do you currently manage meals?
                      </label>
                      <select
                        id="currentSolution"
                        name="currentSolution"
                        value={formData.currentSolution || ''}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Select option</option>
                        <option value="cook">Cook at home</option>
                        <option value="swiggy-zomato">Swiggy / Zomato</option>
                        <option value="local-tiffin">Local tiffin service</option>
                        <option value="pg-mess">PG / Mess food</option>
                        <option value="office-canteen">Office canteen</option>
                        <option value="skip">Often skip meals</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
                        When do you need this?
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency || ''}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="1-3-months">1-3 months</option>
                        <option value="exploring">Just exploring</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Provider Step 2 Fields */}
                {formData.userType === 'provider' && (
                  <>
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName || ''}
                        onChange={handleChange}
                        placeholder="Enter your tiffin center name"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label htmlFor="dailyCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                        Daily Tiffin Capacity
                      </label>
                      <select
                        id="dailyCapacity"
                        name="dailyCapacity"
                        value={formData.dailyCapacity || ''}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Select capacity</option>
                        <option value="10-25">10 - 25 tiffins/day</option>
                        <option value="25-50">25 - 50 tiffins/day</option>
                        <option value="50-100">50 - 100 tiffins/day</option>
                        <option value="100+">100+ tiffins/day</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700 mb-1">
                        Cuisine Type
                      </label>
                      <select
                        id="cuisineType"
                        name="cuisineType"
                        value={formData.cuisineType || ''}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Select cuisine</option>
                        <option value="north-indian">North Indian</option>
                        <option value="south-indian">South Indian</option>
                        <option value="gujarati">Gujarati</option>
                        <option value="maharashtrian">Maharashtrian</option>
                        <option value="bengali">Bengali</option>
                        <option value="punjabi">Punjabi</option>
                        <option value="multi-cuisine">Multi-cuisine</option>
                        <option value="other">Other Regional</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="fssaiStatus" className="block text-sm font-medium text-gray-700 mb-1">
                        FSSAI License Status
                      </label>
                      <select
                        id="fssaiStatus"
                        name="fssaiStatus"
                        value={formData.fssaiStatus || ''}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Select status</option>
                        <option value="have-it">I have FSSAI license</option>
                        <option value="applied">Applied, waiting for approval</option>
                        <option value="will-apply">Will apply soon</option>
                        <option value="need-help">Need help with this</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        Tiffin Service Experience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience || ''}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Select experience</option>
                        <option value="new">New / Want to start</option>
                        <option value="less-1">Less than 1 year</option>
                        <option value="1-3">1 - 3 years</option>
                        <option value="3+">3+ years</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="currentCustomers" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Customer Base
                      </label>
                      <select
                        id="currentCustomers"
                        name="currentCustomers"
                        value={formData.currentCustomers || ''}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Select range</option>
                        <option value="none">No customers yet</option>
                        <option value="1-20">1 - 20 customers</option>
                        <option value="20-50">20 - 50 customers</option>
                        <option value="50+">50+ customers</option>
                      </select>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('success')}
                  className="w-full text-gray-500 hover:text-gray-700 text-sm underline mt-2"
                >
                  Skip for now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
