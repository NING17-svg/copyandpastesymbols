import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Terms of Service | Copy and Paste Symbols | copyandpastesymbols.pro',
  description: 'Read our terms of service to understand the rules and guidelines for using our symbol collection website. Learn about your responsibilities and our policies.',
  alternates: {
    canonical: 'https://copyandpastesymbols.pro/terms-of-service'
  }
};

export default function TermsOfService() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
          <p>
            Welcome to CopyAndPasteSymbols.pro. These Terms of Service ("Terms") govern your use of our website located at copyandpastesymbols.pro (the "Service") operated by CopyAndPasteSymbols.pro ("we," "us," or "our").
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Use of the Service</h2>
          <p>
            CopyAndPasteSymbols.pro provides a platform for users to find, copy, and use various symbols and special characters for personal and commercial use. The symbols available on our website are part of the Unicode standard and are not subject to copyright by us.
          </p>
          <p>
            You are permitted to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Access and browse our website</li>
            <li>Copy and use the symbols for personal or commercial purposes</li>
            <li>Share links to our website with others</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Prohibited Uses</h2>
          <p>
            You agree not to use the Service:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
            <li>To engage in any activity that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Service</li>
            <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service</li>
            <li>To attack the Service via a denial-of-service attack or a distributed denial-of-service attack</li>
            <li>To scrape or collect data from our website using automated means without our prior written consent</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
          <p>
            The Service and its original content (excluding the symbols themselves, which are part of the Unicode standard), features, and functionality are and will remain the exclusive property of CopyAndPasteSymbols.pro and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of CopyAndPasteSymbols.pro.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
          <p>
            In no event shall CopyAndPasteSymbols.pro, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">External Links</h2>
          <p>
            Our Service may contain links to external sites that are not operated by us. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mb-6">
            Email: terms@copyandpastesymbols.pro
          </p>
        </div>
      </div>
    </MainLayout>
  );
} 