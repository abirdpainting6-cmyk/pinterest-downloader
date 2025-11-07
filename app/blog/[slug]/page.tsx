import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog-posts';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-red-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-900">{post.category}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <time dateTime={post.date}>{post.date}</time>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="bg-red-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Ready to Download Pinterest Videos?
            </h3>
            <p className="text-gray-600 mb-4">
              Try our free, fast, and easy Pinterest video downloader now!
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Start Downloading
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              ← Back to Blog
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Share:</span>
              <button className="text-gray-600 hover:text-red-600">
                Twitter
              </button>
              <button className="text-gray-600 hover:text-red-600">
                Facebook
              </button>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Articles */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getAllBlogPosts()
              .filter((p) => p.slug !== post.slug)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2 hover:text-red-600">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function formatContent(content: string): string {
  let html = content;
  
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  html = html.split('\n\n').map(para => {
    if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<ol')) {
      return para;
    }
    return `<p>${para}</p>`;
  }).join('\n');
  
  return html;
}
