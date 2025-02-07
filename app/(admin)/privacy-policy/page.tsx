'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600">Effective Date: Feb 02, 2025</p>
      
      <h2 className="text-2xl font-semibold mt-6">Introduction</h2>
      <p>Welcome to Ecomfill.com. We value your privacy and are committed to protecting your personal information. This privacy policy outlines how we collect, use, and protect your information, and your rights regarding that information.</p>
      
      <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
      <p>We collect the following personal information when you use our services:</p>
      <ul className="list-disc ml-6">
        <li>Full Name</li>
        <li>Email Address</li>
        <li>Payment Information</li>
      </ul>
      <p>We collect this information through the signup form.</p>
      
      
      <h2 className="text-2xl font-semibold mt-6">Use of Information</h2>
      <p>We use your personal information for the following purposes:</p>
      <ul className="list-disc ml-6">
        <li>To send order fulfillment reminders</li>
        <li>To provide order fulfillment updates</li>
        <li>To communicate the cost of order fulfillment, with your explicit consent</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-6">Communication Consent</h2>
      <p>By providing your information during the sign-up process, you agree to receive automated emails at the email address you provided. These emails may include updates or reminders regarding your eBay orders.</p>
      
      <h2 className="text-2xl font-semibold mt-6">Opt-Out Instructions</h2>
      <p>You may opt out of receiving emails at any time by replying “Stop” to any email you receive. Instructions for opting out are included in each message sent.</p>
      
      <h2 className="text-2xl font-semibold mt-6">Data Retention</h2>
      <p>We retain your personal information until you opt out of receiving communications. We will not delete your information unless you specifically request it or opt out.</p>
      
      <h2 className="text-2xl font-semibold mt-6">User Rights</h2>
      <p>You have the right to:</p>
      <ul className="list-disc ml-6">
        <li>Access your personal information</li>
        <li>Request corrections or deletions of your personal information</li>
      </ul>
      <p>To exercise these rights, please contact us at <a href="mailto:Support@ecomfill.com" className="text-blue-600 underline">Support@ecomfill.com</a>.</p>
      
      <h2 className="text-2xl font-semibold mt-6">Security Measures</h2>
      <p>We implement security measures to protect your personal information, including restricted admin access and two-factor authentication.</p>
      
      <h2 className="text-2xl font-semibold mt-6">Data Breach Notification</h2>
      <p>In the event of a data breach, we will promptly inform law enforcement agencies and notify affected users via their registered email addresses.</p>
      
      <h2 className="text-2xl font-semibold mt-6">Changes to This Privacy Policy</h2>
      <p>We reserve the right to update this privacy policy. If changes are made, we will notify users through an official announcement on our website or via email.</p>
      
      <h2 className="text-2xl font-semibold mt-6">Important Notification</h2>
      <p>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
      
      <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
      <p>If you have any questions, concerns, or requests regarding this privacy policy or A2P messaging compliance, please contact us at <a href="mailto:Support@ecomfill.com" className="text-blue-600 underline">Support@ecomfill.com</a>.</p>
    </div>
  );
}
