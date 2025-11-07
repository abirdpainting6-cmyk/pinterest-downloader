export const metadata = {
  title: 'Privacy Policy - PinDownloader',
  description: 'Read our privacy policy to understand how we handle your data.',
};

export default function Privacy() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-red-100">
            Last updated: November 2025
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              Welcome to PinDownloader. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we handle your data when you visit our website and use our services.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect minimal information to provide our services:
            </p>
            <ul>
              <li><strong>URLs:</strong> When you use our service, we temporarily process the Pinterest URLs you provide to fetch the content you want to download.</li>
              <li><strong>Usage Data:</strong> We may collect anonymous usage statistics to improve our service, such as the number of downloads and popular content types.</li>
              <li><strong>Contact Information:</strong> If you contact us through our contact form, we collect your name, email address, and message content.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              We use the collected information for the following purposes:
            </p>
            <ul>
              <li>To provide and maintain our download service</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To improve and optimize our website and services</li>
              <li>To monitor usage patterns and detect technical issues</li>
            </ul>

            <h2>Data Storage and Security</h2>
            <p>
              We take data security seriously:
            </p>
            <ul>
              <li>We do not store the content you download</li>
              <li>Pinterest URLs are processed in real-time and not permanently stored</li>
              <li>We use industry-standard security measures to protect any data we collect</li>
              <li>We do not sell, trade, or transfer your personal information to third parties</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              Our website may use cookies to enhance user experience. These cookies are used for:
            </p>
            <ul>
              <li>Remembering your preferences</li>
              <li>Analyzing website traffic and usage patterns</li>
              <li>Improving website functionality</li>
            </ul>
            <p>
              You can choose to disable cookies through your browser settings, though this may affect some features of our website.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We may use third-party services to help us operate our website and provide our services. 
              These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing your personal information</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
              Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. 
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last updated" date at the top of this policy.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: support@pindownloader.com</li>
              <li>Contact Form: <a href="/contact" className="text-red-600 hover:text-red-700">Contact Page</a></li>
            </ul>

            <h2>GDPR Compliance</h2>
            <p>
              If you are a resident of the European Economic Area (EEA), you have certain data protection rights. 
              We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data.
            </p>

            <h2>California Privacy Rights</h2>
            <p>
              If you are a California resident, you have specific rights regarding access to your personal information under the California Consumer Privacy Act (CCPA).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
