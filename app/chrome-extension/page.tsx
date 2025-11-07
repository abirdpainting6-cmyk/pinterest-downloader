import { Zap, Shield, Download, Settings, Globe, Smartphone } from 'lucide-react';
import chromeExtensionContent from '@/content/chrome-extension.json';

const iconMap: { [key: string]: any } = {
  Zap,
  Shield,
  Download,
  Settings,
  Globe,
  Smartphone,
};

export const metadata = {
  title: 'Chrome Extension - PinDownloader',
  description: 'Download Pinterest content with one click using our Chrome extension.',
};

export default function ChromeExtension() {
  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {chromeExtensionContent.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-red-100 mb-8">
                {chromeExtensionContent.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={chromeExtensionContent.hero.downloadUrl}
                  className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  Download Extension
                </a>
                <a
                  href={chromeExtensionContent.hero.webStoreUrl}
                  className="px-8 py-4 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors border-2 border-white text-center"
                >
                  Chrome Web Store
                </a>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur-sm">
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <Download className="h-24 w-24 text-white opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Extension Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chromeExtensionContent.features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {chromeExtensionContent.installation.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {chromeExtensionContent.installation.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            {chromeExtensionContent.videoTutorial.title}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {chromeExtensionContent.videoTutorial.description}
          </p>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <svg
                className="h-24 w-24 text-gray-400 mx-auto mb-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-gray-500">Video tutorial coming soon</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {chromeExtensionContent.faq.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Install?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Get the Chrome extension and start downloading with one click!
          </p>
          <a
            href={chromeExtensionContent.hero.downloadUrl}
            className="inline-block px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Download Now
          </a>
        </div>
      </section>
    </div>
  );
}
