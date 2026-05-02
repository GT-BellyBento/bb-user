import Link from 'next/link';

export const metadata = {
    title: 'Terms & Conditions - BellyBento',
    description: 'Terms and Conditions for using BellyBento platform',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-primary py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="text-white text-2xl font-bold">
                        ← BellyBento
                    </Link>
                </div>
            </header>

            {/* Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-dark mb-2">Terms & Conditions</h1>
                <p className="text-gray-500 mb-8">Last updated: April 27, 2026</p>

                <div className="prose prose-lg max-w-none text-gray-700">

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">1. Introduction</h2>
                        <p>
                            Welcome to BellyBento (&quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms and Conditions
                            (&quot;Terms&quot;) govern your use of our website, mobile application, and services.
                        </p>
                        <p className="mt-4">
                            By accessing or using BellyBento, you agree to be bound by these Terms. If you do not agree
                            to these Terms, please do not use our Platform.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">2. About BellyBento</h2>
                        <p>
                            BellyBento is a <strong>technology platform</strong> that connects tiffin service providers
                            (&quot;Providers&quot;) with customers (&quot;Users&quot;) who seek daily home-cooked meals.
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                            <p className="font-semibold">Important Clarification:</p>
                            <ul className="list-disc ml-6 mt-2">
                                <li>BellyBento does <strong>NOT</strong> cook, prepare, or handle food</li>
                                <li>BellyBento does <strong>NOT</strong> employ tiffin providers</li>
                                <li>BellyBento acts solely as a <strong>mediator/aggregator</strong></li>
                                <li>Tiffin Providers are <strong>independent business operators</strong></li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">3. User Eligibility</h2>
                        <p>To use BellyBento, you must:</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Be at least 18 years of age</li>
                            <li>Have the legal capacity to enter into binding contracts</li>
                            <li>Provide accurate and complete registration information</li>
                            <li>Have a valid phone number and email address</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">4. User Accounts</h2>
                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">4.1 Account Registration</h3>
                        <p>
                            You may need to create an account to access certain features. You are responsible for
                            maintaining the confidentiality of your account credentials.
                        </p>

                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">4.2 Account Security</h3>
                        <p>
                            You agree to notify us immediately of any unauthorized use of your account. We are not
                            liable for any loss arising from unauthorized use of your account.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">5. Services</h2>
                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">5.1 For Customers</h3>
                        <ul className="list-disc ml-6">
                            <li>Browse and discover tiffin providers in your area</li>
                            <li>View menus, prices, and reviews</li>
                            <li>Place orders and manage subscriptions</li>
                            <li>Make payments through the platform</li>
                            <li>Rate and review providers</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">5.2 For Providers</h3>
                        <ul className="list-disc ml-6">
                            <li>List your tiffin service on the platform</li>
                            <li>Manage orders and subscriptions</li>
                            <li>Receive payments through the platform</li>
                            <li>Access customer insights and analytics</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">6. Provider Obligations</h2>
                        <p>Tiffin Providers on BellyBento must:</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Hold a valid <strong>FSSAI Registration/License</strong></li>
                            <li>Maintain hygiene standards in food preparation</li>
                            <li>Use quality ingredients</li>
                            <li>Deliver food on time as per subscription</li>
                            <li>Handle customer complaints professionally</li>
                            <li>Comply with all applicable food safety laws</li>
                            <li>Keep their FSSAI registration current and valid</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">7. Payments</h2>
                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">7.1 Payment Processing</h3>
                        <p>
                            All payments are processed through secure third-party payment gateways. BellyBento does
                            not store your payment card details.
                        </p>

                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">7.2 Refunds</h3>
                        <p>
                            Refund requests are handled on a case-by-case basis. Refunds for food quality issues
                            are the responsibility of the Provider. Platform fees may be non-refundable.
                        </p>

                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">7.3 Provider Payments</h3>
                        <p>
                            Provider earnings are settled weekly/monthly after deducting applicable platform
                            commission and any refunds processed.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">8. Cancellations</h2>
                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">8.1 By Customers</h3>
                        <ul className="list-disc ml-6">
                            <li>Daily orders: Cancel before 8 PM previous day</li>
                            <li>Subscriptions: Cancel with 3 days notice</li>
                            <li>Late cancellations may not be eligible for refund</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">8.2 By Providers</h3>
                        <p>
                            Providers must notify customers at least 12 hours in advance if unable to deliver.
                            Repeated cancellations may result in account suspension.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">9. Limitation of Liability</h2>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                            <p className="font-semibold mb-2">BellyBento is NOT liable for:</p>
                            <ul className="list-disc ml-6">
                                <li>Quality, taste, or freshness of food prepared by Providers</li>
                                <li>Food allergies or dietary issues (customers must inform Providers directly)</li>
                                <li>Late or missed deliveries by Providers</li>
                                <li>Food poisoning or health issues arising from consumed food</li>
                                <li>Any disputes between Customers and Providers</li>
                                <li>Loss of business or profits</li>
                            </ul>
                        </div>
                        <p className="mt-4">
                            Our total liability shall not exceed the amount paid by you in the last 3 months.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">10. Food Safety Disclaimer</h2>
                        <p>
                            While we verify that all Providers have valid FSSAI registration, we do not:
                        </p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Inspect kitchens or food preparation areas</li>
                            <li>Test food quality or ingredients</li>
                            <li>Guarantee compliance with dietary restrictions</li>
                            <li>Certify food safety beyond FSSAI verification</li>
                        </ul>
                        <p className="mt-4">
                            Customers with food allergies or specific dietary requirements should communicate
                            directly with Providers before ordering.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">11. Intellectual Property</h2>
                        <p>
                            All content on BellyBento, including logos, text, graphics, and software, is owned
                            by us or our licensors. You may not copy, modify, or distribute our content without
                            written permission.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">12. Prohibited Activities</h2>
                        <p>You agree NOT to:</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Use the platform for any illegal purpose</li>
                            <li>Impersonate another person or entity</li>
                            <li>Submit false information or fake reviews</li>
                            <li>Attempt to hack or disrupt the platform</li>
                            <li>Scrape data from the platform</li>
                            <li>Contact Providers outside the platform to avoid fees</li>
                            <li>Harass or abuse other users or Providers</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">13. Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your account at any time for violation
                            of these Terms, without prior notice. Upon termination, your right to use the Platform
                            ceases immediately.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">14. Dispute Resolution</h2>
                        <p>
                            Any disputes arising from these Terms shall be resolved through:
                        </p>
                        <ol className="list-decimal ml-6 mt-2">
                            <li>Good faith negotiation between parties</li>
                            <li>Mediation, if negotiation fails</li>
                            <li>Arbitration under the Arbitration and Conciliation Act, 1996</li>
                        </ol>
                        <p className="mt-4">
                            The courts of [Your City], India shall have exclusive jurisdiction.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">15. Governing Law</h2>
                        <p>
                            These Terms are governed by the laws of India. Any disputes shall be subject to the
                            exclusive jurisdiction of courts in [Your City], India.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">16. Changes to Terms</h2>
                        <p>
                            We may update these Terms from time to time. We will notify you of significant changes
                            via email or platform notification. Continued use after changes constitutes acceptance.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">17. Contact Us</h2>
                        <p>For questions about these Terms, contact us at:</p>
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                            <p><strong>BellyBento</strong></p>
                            <p>Email: legal@bellybento.com</p>
                            <p>Phone: [Your Phone Number]</p>
                            <p>Address: [Your Business Address]</p>
                        </div>
                    </section>

                </div>

                {/* Back to Home */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <Link href="/" className="text-primary hover:text-primary-600 font-semibold">
                        ← Back to Home
                    </Link>
                </div>
            </article>
        </main>
    );
}
