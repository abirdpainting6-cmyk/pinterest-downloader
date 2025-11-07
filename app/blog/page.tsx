import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Pinterest Video Downloader Guides & Tutorials',
  description: 'Comprehensive guides and tutorials on downloading Pinterest videos, images, and GIFs. Learn how to download on iPhone, Android, PC, Mac, and more.',
  keywords: 'pinterest video download guide, pinterest downloader tutorial, how to download pinterest videos, pinterest download help',
};

const blogPosts = [
  {
    slug: 'how-to-download-pinterest-videos-on-iphone',
    title: 'How to Download Pinterest Videos on iPhone (2025 Complete Guide)',
    excerpt: 'Want to save Pinterest videos directly to your iPhone? This complete guide shows you multiple methods that actually work in 2025.',
    date: 'November 7, 2025',
    readTime: '8 min read',
    category: 'iOS Guide',
  },
  {
    slug: 'how-to-download-pinterest-videos-on-android',
    title: 'How to Download Pinterest Videos on Android (2025 Step-by-Step Guide)',
    excerpt: 'Android users have it easier than most when it comes to downloading Pinterest videos. Learn the fastest methods for your Android device.',
    date: 'November 7, 2025',
    readTime: '7 min read',
    category: 'Android Guide',
  },
  {
    slug: 'how-to-download-pinterest-videos-without-watermark',
    title: 'How to Download Pinterest Videos Without Watermark (2025 Guide)',
    excerpt: 'Learn how to download Pinterest videos completely watermark-free. Get clean, pristine videos without any logos, text, or branding.',
    date: 'November 7, 2025',
    readTime: '6 min read',
    category: 'Tutorial',
  },
  {
    slug: 'how-to-download-pinterest-videos-on-pc',
    title: 'How to Download Pinterest Videos on PC/Windows (2025 Complete Guide)',
    excerpt: 'Downloading Pinterest videos on your Windows PC is one of the easiest methods available. Learn the fastest techniques for desktop.',
    date: 'November 7, 2025',
    readTime: '7 min read',
    category: 'Windows Guide',
  },
  {
    slug: 'how-to-download-pinterest-videos-on-mac',
    title: 'How to Download Pinterest Videos on Mac (2025 Complete Guide)',
    excerpt: 'Mac users have excellent options for downloading Pinterest videos. Learn the best methods optimized for macOS.',
    date: 'November 7, 2025',
    readTime: '7 min read',
    category: 'Mac Guide',
  },
  {
    slug: 'is-it-legal-to-download-pinterest-videos',
    title: 'Is It Legal to Download Pinterest Videos? Copyright Guide 2025',
    excerpt: 'Understand the legal aspects of downloading Pinterest videos, copyright law basics, fair use doctrine, and how to download responsibly.',
    date: 'November 7, 2025',
    readTime: '9 min read',
    category: 'Legal Guide',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pinterest Downloader Blog
          </h1>
          <p className="text-xl text-red-100">
            Comprehensive guides, tutorials, and tips for downloading Pinterest content
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-red-600 font-semibold hover:text-red-700">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Download Pinterest Videos?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Try our free Pinterest downloader now!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Downloading
          </Link>
        </div>
      </section>
    </div>
  );
}
