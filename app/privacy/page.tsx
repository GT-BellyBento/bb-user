import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy - BellyBento',
    description: 'Privacy Policy for BellyBento platform - How we collect, use, and protect your data',
};

export default function PrivacyPage() {
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
                <h1 className="text-4xl font-bold text-dark mb-2">Privacy Policy</h1>
                <p className="text-gray-500 mb-8">Last updated: April 27, 2026</p>

                <div className="prose prose-lg max-w-none text-gray-700">

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">1. Introduction</h2>
                        <p>
                            BellyBento (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This
                            Privacy Policy explains how we collect, use, disclose, and safeguard your information
                            when you use our website, mobile application, and services (collectively, the &quot;Platform&quot;).
                        </p>
                        <p className="mt-4">
                            By using BellyBento, you consent to the data practices described in this policy. If you
                            do not agree with our policies, please do not use our Platform.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">2. Information We Collect</h2>

                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">2.1 Information You Provide</h3>
                        <table className="w-full border-collapse border border-gray-300 mt-2">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Data Type</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Full Name</td>
                                    <td className="border border-gray-300 px-4 py-2">Account creation, communication</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Email Address</td>
                                    <td className="border border-gray-300 px-4 py-2">Account verification, notifications, support</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Phone Number</td>
                                    <td className="border border-gray-300 px-4 py-2">OTP verification, delivery coordination</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Delivery Address</td>
                                    <td className="border border-gray-300 px-4 py-2">Order delivery, provider matching</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">City/Location</td>
                                    <td className="border border-gray-300 px-4 py-2">Finding nearby providers</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="text-xl font-semibold text-dark mt-6 mb-2">2.2 For Tiffin Providers (Additional)</h3>
                        <table className="w-full border-collapse border border-gray-300 mt-2">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Data Type</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">FSSAI Registration Number</td>
                                    <td className="border border-gray-300 px-4 py-2">Compliance verification</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Aadhaar Number</td>
                                    <td className="border border-gray-300 px-4 py-2">KYC verification</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">PAN Number</td>
                                    <td className="border border-gray-300 px-4 py-2">Tax compliance, payments</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Bank Account Details</td>
                                    <td className="border border-gray-300 px-4 py-2">Payment settlement</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Kitchen Photos</td>
                                    <td className="border border-gray-300 px-4 py-2">Hygiene verification</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="text-xl font-semibold text-dark mt-6 mb-2">2.3 Automatically Collected Information</h3>
                        <ul className="list-disc ml-6">
                            <li><strong>Device Information:</strong> Device type, operating system, browser type</li>
                            <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns</li>
                            <li><strong>Location Data:</strong> With your permission, for provider matching</li>
                            <li><strong>Cookies:</strong> Session management, preferences, analytics</li>
                            <li><strong>IP Address:</strong> Security, fraud prevention, analytics</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">3. How We Use Your Information</h2>
                        <p>We use collected information to:</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Create and manage your account</li>
                            <li>Process orders and payments</li>
                            <li>Connect you with tiffin providers in your area</li>
                            <li>Send order updates, notifications, and promotional communications</li>
                            <li>Improve our Platform and services</li>
                            <li>Provide customer support</li>
                            <li>Prevent fraud and ensure security</li>
                            <li>Comply with legal obligations</li>
                            <li>Analyze usage patterns and trends</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">4. Information Sharing</h2>

                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">4.1 With Tiffin Providers</h3>
                        <p>When you place an order, we share with the Provider:</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Your name</li>
                            <li>Delivery address</li>
                            <li>Phone number (for delivery coordination)</li>
                            <li>Order details and preferences</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">4.2 With Service Providers</h3>
                        <p>We may share data with third parties who assist us:</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Payment processors (Razorpay, PayU, etc.)</li>
                            <li>Cloud hosting providers (AWS, Vercel)</li>
                            <li>Analytics services (Google Analytics)</li>
                            <li>Communication services (SMS, Email providers)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-dark mt-4 mb-2">4.3 Legal Requirements</h3>
                        <p>We may disclose information if required by:</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Law, regulation, or legal process</li>
                            <li>Government or regulatory authorities</li>
                            <li>To protect our rights, safety, or property</li>
                            <li>To investigate potential violations</li>
                        </ul>

                        <div className="bg-green-50 border-l-4 border-green-400 p-4 my-4">
                            <p className="font-semibold">We DO NOT:</p>
                            <ul className="list-disc ml-6 mt-2">
                                <li>Sell your personal data to third parties</li>
                                <li>Share your data for unrelated marketing purposes</li>
                                <li>Share sensitive data (Aadhaar, PAN) with Customers</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">5. Data Security</h2>
                        <p>We implement security measures including:</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li><strong>Encryption:</strong> SSL/TLS for data in transit</li>
                            <li><strong>Secure Storage:</strong> Encrypted databases</li>
                            <li><strong>Access Controls:</strong> Role-based access to data</li>
                            <li><strong>Regular Audits:</strong> Security assessments</li>
                            <li><strong>Payment Security:</strong> PCI-DSS compliant payment processing</li>
                        </ul>
                        <p className="mt-4">
                            While we strive to protect your data, no method of transmission over the Internet is
                            100% secure. We cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">6. Data Retention</h2>
                        <table className="w-full border-collapse border border-gray-300 mt-2">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Data Type</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Retention Period</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Account Information</td>
                                    <td className="border border-gray-300 px-4 py-2">Until account deletion + 90 days</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Order History</td>
                                    <td className="border border-gray-300 px-4 py-2">7 years (legal/tax compliance)</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Payment Records</td>
                                    <td className="border border-gray-300 px-4 py-2">7 years (legal/tax compliance)</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">KYC Documents (Providers)</td>
                                    <td className="border border-gray-300 px-4 py-2">5 years after relationship ends</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Analytics Data</td>
                                    <td className="border border-gray-300 px-4 py-2">26 months</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">7. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Correction:</strong> Update or correct inaccurate data</li>
                            <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                            <li><strong>Portability:</strong> Receive your data in a portable format</li>
                            <li><strong>Withdraw Consent:</strong> Opt-out of marketing communications</li>
                            <li><strong>Restrict Processing:</strong> Limit how we use your data</li>
                        </ul>
                        <p className="mt-4">
                            To exercise these rights, contact us at <strong>privacy@bellybento.com</strong>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">8. Cookies Policy</h2>
                        <p>We use cookies and similar technologies for:</p>
                        <table className="w-full border-collapse border border-gray-300 mt-4">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Cookie Type</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Essential</td>
                                    <td className="border border-gray-300 px-4 py-2">Login, session management (required)</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Functional</td>
                                    <td className="border border-gray-300 px-4 py-2">Remember preferences, settings</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Analytics</td>
                                    <td className="border border-gray-300 px-4 py-2">Usage patterns, improvement</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Marketing</td>
                                    <td className="border border-gray-300 px-4 py-2">Personalized ads (with consent)</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="mt-4">
                            You can manage cookie preferences through your browser settings.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">9. Third-Party Links</h2>
                        <p>
                            Our Platform may contain links to third-party websites. We are not responsible for
                            the privacy practices of these external sites. We encourage you to read their privacy
                            policies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">10. Children&apos;s Privacy</h2>
                        <p>
                            BellyBento is not intended for users under 18 years of age. We do not knowingly
                            collect personal information from children. If we discover that a child has provided
                            us with personal information, we will delete it immediately.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">11. Data Transfer</h2>
                        <p>
                            Your data may be processed on servers located outside your country of residence.
                            By using our Platform, you consent to the transfer of your data to India and other
                            countries where our service providers operate.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">12. Compliance with Indian Laws</h2>
                        <p>This Privacy Policy complies with:</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Information Technology Act, 2000</li>
                            <li>IT (Reasonable Security Practices and Procedures and Sensitive Personal Data) Rules, 2011</li>
                            <li>Digital Personal Data Protection Act, 2023 (when applicable)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">13. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of significant
                            changes via email or a prominent notice on our Platform. The &quot;Last updated&quot; date at
                            the top indicates when the policy was last revised.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">14. Grievance Officer</h2>
                        <p>
                            In accordance with the Information Technology Act, 2000, the name and contact details
                            of the Grievance Officer are:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg mt-4">
                            <p><strong>Grievance Officer:</strong> [Name]</p>
                            <p><strong>Email:</strong> grievance@bellybento.com</p>
                            <p><strong>Phone:</strong> [Phone Number]</p>
                            <p><strong>Address:</strong> [Business Address]</p>
                            <p className="mt-2 text-sm text-gray-600">
                                Response time: Within 30 days of receiving the complaint
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-dark mb-4">15. Contact Us</h2>
                        <p>For privacy-related questions or concerns, contact us at:</p>
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                            <p><strong>BellyBento</strong></p>
                            <p>Email: privacy@bellybento.com</p>
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
