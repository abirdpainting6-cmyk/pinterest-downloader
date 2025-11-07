'use client';

import { useState } from 'react';
import { Video, Image as ImageIcon, Film } from 'lucide-react';
import galleryContent from '@/content/gallery.json';

const typeIcons: { [key: string]: any } = {
  video: Video,
  image: ImageIcon,
  gif: Film,
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDownloads = selectedCategory === 'All'
    ? galleryContent.sampleDownloads
    : galleryContent.sampleDownloads.filter(
        (item) => item.category === selectedCategory
      );

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {galleryContent.title}
          </h1>
          <p className="text-xl md:text-2xl text-red-100">
            {galleryContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {galleryContent.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDownloads.map((item) => {
              const Icon = typeIcons[item.type];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="relative aspect-video bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-black bg-opacity-70 text-white text-sm rounded-full">
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {item.category}
                      </span>
                      <span>{item.downloads.toLocaleString()} downloads</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDownloads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No downloads found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Download Your Own Content?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Start downloading Pinterest videos, images, and GIFs now!
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
