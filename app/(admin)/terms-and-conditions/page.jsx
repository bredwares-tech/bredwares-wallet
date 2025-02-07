'use client';

import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">Terms and Conditions</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
        <p>
          By accessing and using Ecomfill.com (“the Website”), you agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use the Website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Services Provided</h2>
        <p>
          Ecomfill.com offers services to help individuals and businesses fulfill their eBay store orders efficiently.
          Our services include, but are not limited to, eBay order reminders, hooking eBay stores with quality suppliers,
          and technical support regarding eBay order fulfillment.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Accounts</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Provide accurate, current, and complete information during registration.</li>
          <li>Maintain the security of your password and account.</li>
          <li>Notify us immediately of any unauthorized use of your account.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
        <p>
          You are responsible for using the Website in a manner that complies with all applicable laws and regulations
          and not engaging in any conduct that restricts or inhibits others from using the Website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Communication Consent</h2>
        <p>
          By providing your email address and opting in through the sign-up process, you agree to receive automated emails
          from us. These emails may include order fulfillment reminders and updates.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Use of Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To send order fulfillment reminders</li>
          <li>To provide order fulfillment updates</li>
          <li>To communicate cost of order fulfillment, with your explicit consent</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Opt-Out Policy</h2>
        <p>
          You can cancel the emails at any time. Simply email “STOP.” Upon sending “STOP,” we will confirm your unsubscribe
          status via email. Following this confirmation, you will no longer receive emails from us.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Terms</h2>
        <p>
          Payments for our services are processed through Stripe. You agree to provide accurate payment information and authorize
          us to charge your account for services rendered. Failure to pay may result in the termination of your account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Account Termination</h2>
        <p>
          You may request the termination of your account at any time. We reserve the right to terminate your account if you fail
          to pay your monthly bill or if you express a desire to discontinue our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
        <p>
          All content on the Website, including text, graphics, logos, and software, is the property of Ecomfill.com or its licensors
          and is protected by copyright, trademark, and other intellectual property laws.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Ecomfill.com will not be liable for any indirect, incidental, special, consequential,
          or punitive damages arising out of or relating to your use of the Website or services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Data Privacy</h2>
        <p>
          Your use of the Website is also governed by our Privacy Policy. For privacy-related inquiries, please refer to our privacy policy:
          <Link href="https://www.ecomfill.com/privacy-policy/" className="text-blue-600 hover:underline ml-1">
            https://www.ecomfill.com/privacy-policy/
          </Link>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Changes to Terms</h2>
        <p>
          We reserve the right to update these Terms of Service at any time. We will notify users of significant changes through
          an announcement on the Website or via email.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of the State of Wyoming,
          without regard to its conflict of law principles.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at
          <Link href="mailto:Support@ecomfill.com" className="text-blue-600 hover:underline ml-1">
            Support@ecomfill.com
          </Link>.
        </p>
      </section>
    </div>
  );
}
