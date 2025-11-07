import { Copy, Link as LinkIcon, Download, Video, Image, Film, AlertCircle } from 'lucide-react';
import howItWorksContent from '@/content/how-it-works.json';

const iconMap: { [key: string]: any } = {
  Copy,
  Link: LinkIcon,
  Download,
  Video,
  Image,
  Film,
};

export const metadata = {
  title: 'How It Works - PinDownloader',
  description: 'Learn how to download Pinterest videos, images, and GIFs in 3 simple steps.',
};

export default function HowItWorks() {
  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {howItWorksContent.title}
          </h1>
          <p className="text-xl md:text-2xl text-red-100">
            {howItWorksContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksContent.steps.map((step, index) => {
              const Icon = iconMap[step.icon];
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute top-0 right-0 w-10 h-10 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Supported Content Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksContent.contentTypes.map((contentType, index) => {
              const Icon = iconMap[contentType.icon];
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-red-600 transition-colors"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-lg mb-6 mx-auto">
                    <Icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {contentType.type}
                  </h3>
                  <p className="text-gray-600 mb-6 text-center">
                    {contentType.description}
                  </p>
                  <ul className="space-y-2">
                    {contentType.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {howItWorksContent.troubleshooting.title}
          </h2>
          <div className="space-y-6">
            {howItWorksContent.troubleshooting.tips.map((tip, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600"
              >
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tip.problem}
                    </h3>
                    <p className="text-gray-600">{tip.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Try downloading your first Pinterest content now!
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Downloading
          </a>
        </div>
      </section>
    </div>
  );
}
