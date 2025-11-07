'use client';

import { useState } from 'react';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface DownloadOption {
  quality: string;
  format: string;
  size: string;
  url: string;
}

interface DownloadResult {
  type: string;
  title: string;
  description: string;
  thumbnail: string;
  downloadOptions: DownloadOption[];
}

export default function DownloadForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<DownloadResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!url.trim()) {
      setError('Please enter a Pinterest URL');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/download', { url });
      
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setError('Failed to fetch content. Please try again.');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Failed to download content');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (downloadUrl: string) => {
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Pinterest URL here..."
            className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition-colors"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Download
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {result.thumbnail && (
              <div className="md:w-1/3">
                <img
                  src={result.thumbnail}
                  alt={result.title}
                  className="w-full rounded-lg"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{result.title}</h3>
              {result.description && (
                <p className="text-gray-600 mb-4">{result.description}</p>
              )}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Download Options:</h4>
                {result.downloadOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleDownload(option.url)}
                    className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 hover:bg-red-50 transition-colors"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">
                        {option.quality} - {option.format.toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600">{option.size}</p>
                    </div>
                    <Download className="h-5 w-5 text-red-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
