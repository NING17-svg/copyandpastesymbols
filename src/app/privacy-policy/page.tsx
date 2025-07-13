import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Copy and Paste Symbols | copyandpastesymbols.pro',
  description: 'Our privacy policy outlines how we collect, use, and protect your information when using our symbol collection website. Learn about our commitment to your privacy.',
  alternates: {
    canonical: 'https://copyandpastesymbols.pro/privacy-policy'
  }
};

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
          <p>
            Welcome to CopyAndPasteSymbols.pro ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p>
            Our website primarily functions as a resource for copying and pasting symbols, and we collect minimal personal information. The information we may collect includes:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Usage Data: Information on how you use our website, including which symbols you view or copy.</li>
            <li>Technical Data: Internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li>Cookies: We use cookies to enhance your experience on our site. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you to provide updates and other information</li>
            <li>Monitor and analyze usage and trends to improve your experience with our website</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
          <p>
            We may use third-party services, such as Google Analytics, to help us understand website usage and to improve our service. These third-party service providers have their own privacy policies addressing how they use such information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Advertising</h2>
          <p>
            We may use third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to this and other websites to provide advertisements about goods and services of interest to you.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, such as:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>The right to access information we hold about you</li>
            <li>The right to request that we correct any inaccurate personal information</li>
            <li>The right to request that we delete your personal information</li>
            <li>The right to opt out of marketing communications</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mb-6">
            Email: privacy@copyandpastesymbols.pro
          </p>
        </div>
      </div>
    </MainLayout>
  );
} 