import { Users, Shield, Zap, Heart } from 'lucide-react';
import aboutContent from '@/content/about.json';

const iconMap: { [key: string]: any } = {
  Users,
  Shield,
  Zap,
  Heart,
};

export const metadata = {
  title: 'About Us - PinDownloader',
  description: 'Learn about PinDownloader, our mission, and our commitment to providing the best Pinterest downloading service.',
};

export default function About() {
  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {aboutContent.title}
          </h1>
          <p className="text-xl md:text-2xl text-red-100">
            {aboutContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {aboutContent.story.title}
          </h2>
          <div className="prose prose-lg max-w-none">
            {aboutContent.story.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            {aboutContent.mission.title}
          </h2>
          <p className="text-xl text-gray-700 text-center leading-relaxed">
            {aboutContent.mission.content}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.values.map((value, index) => {
              const Icon = iconMap[value.icon];
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-lg mb-4 mx-auto">
                    <Icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-red-50 to-red-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            By The Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {aboutContent.legal.title}
          </h2>
          <div className="prose prose-lg max-w-none">
            {aboutContent.legal.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Millions of Happy Users
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Start downloading Pinterest content today!
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
