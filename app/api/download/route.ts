import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface DownloadOption {
  quality: string;
  format: string;
  size: string;
  url: string;
}

interface PinterestData {
  type: 'video' | 'image' | 'gif';
  title: string;
  description: string;
  thumbnail: string;
  downloadOptions: DownloadOption[];
}

function normalizePinterestUrl(url: string): string {
  const pinIdMatch = url.match(/\/pin\/(?:[^\/]*--)?(\d+)/);
  if (pinIdMatch && pinIdMatch[1]) {
    return `https://www.pinterest.com/pin/${pinIdMatch[1]}/`;
  }
  return url;
}

async function fetchWithThordata(url: string, apiKey: string, apiUrl: string, jsRender: boolean = false, shortWait: boolean = false): Promise<string | null> {
  try {
    const waitTime = jsRender ? (shortWait ? '2500' : '12000') : '3000';
    const formData = new URLSearchParams({
      url: url,
      type: 'html',
      js_render: jsRender ? 'True' : 'False',
      follow_redirect: 'True',
      wait: waitTime,
      country: 'US',
    });

    formData.append('headers[User-Agent]', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    formData.append('headers[Accept-Language]', 'en-US,en;q=0.9');
    formData.append('headers[Accept]', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    formData.append('headers[Referer]', 'https://www.pinterest.com/');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), jsRender ? 60000 : 30000);

    const response = await fetch(`${apiUrl}/request`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Thordata API error:', response.status, response.statusText);
      return null;
    }

    const responseText = await response.text();
    
    try {
      const jsonResponse = JSON.parse(responseText);
      if (jsonResponse.html) {
        const html = jsonResponse.html;
        console.log(`Thordata fetch (jsRender=${jsRender}): ${html.length} bytes (from JSON)`);
        return html;
      }
    } catch (e) {
      console.log(`Thordata fetch (jsRender=${jsRender}): ${responseText.length} bytes (raw HTML)`);
      return responseText;
    }
    
    return responseText;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error(`Thordata API timeout (jsRender=${jsRender})`);
    } else {
      console.error('Thordata API fetch error:', error);
    }
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'Pinterest URL is required' },
        { status: 400 }
      );
    }

    const pinterestRegex = /^https?:\/\/(www\.)?pinterest\.(com|[a-z]{2})\/.+/i;
    if (!pinterestRegex.test(url)) {
      return NextResponse.json(
        { error: 'Invalid Pinterest URL' },
        { status: 400 }
      );
    }

    const thordataApiKey = process.env.THORDATA_API_KEY;
    const thordataApiUrl = process.env.THORDATA_API_URL;

    if (!thordataApiKey || !thordataApiUrl) {
      return NextResponse.json(
        { error: 'API configuration missing' },
        { status: 500 }
      );
    }

    const normalizedUrl = normalizePinterestUrl(url);
    console.log('Normalized URL:', normalizedUrl);

    let html = await fetchWithThordata(normalizedUrl, thordataApiKey, thordataApiUrl, false);
    
    if (!html) {
      console.log('Non-render fetch failed, trying with JS render...');
      html = await fetchWithThordata(normalizedUrl, thordataApiKey, thordataApiUrl, true);
      
      if (!html) {
        return NextResponse.json(
          { error: 'Failed to fetch Pinterest content. The service may be temporarily unavailable or the content is blocked. Please try again later.' },
          { status: 503 }
        );
      }
    }

    let pinterestData = await parsePinterestContent(html, normalizedUrl);

    if (!pinterestData && html) {
      console.log('Non-render parsing failed, trying with short JS render (2.5s)...');
      
      const shortRenderHtml = await fetchWithThordata(normalizedUrl, thordataApiKey, thordataApiUrl, true, true);
      
      if (shortRenderHtml) {
        pinterestData = await parsePinterestContent(shortRenderHtml, normalizedUrl);
      }
      
      if (!pinterestData && shortRenderHtml) {
        console.log('Short JS render parsing failed, trying with long JS render (12s)...');
        const longRenderHtml = await fetchWithThordata(normalizedUrl, thordataApiKey, thordataApiUrl, true, false);
        
        if (longRenderHtml) {
          pinterestData = await parsePinterestContent(longRenderHtml, normalizedUrl);
        }
      }
    }

    if (!pinterestData) {
      return NextResponse.json(
        { error: 'Could not extract content from Pinterest page. The pin may be private, deleted, or region-restricted.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: pinterestData,
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    );
  }
}

function deepSearchJson(obj: any, keys: string[]): any[] {
  const results: any[] = [];
  
  function search(current: any, depth: number = 0) {
    if (depth > 20) return;
    
    if (current && typeof current === 'object') {
      for (const key of Object.keys(current)) {
        if (keys.includes(key)) {
          results.push(current[key]);
        }
        search(current[key], depth + 1);
      }
    }
  }
  
  search(obj);
  return results;
}

async function parsePinterestContent(html: string, url: string): Promise<PinterestData | null> {
  try {
    const $ = cheerio.load(html);
    
    const pwsDataScript = $('script#__PWS_DATA__').html();
    if (pwsDataScript) {
      try {
        const pwsData = JSON.parse(pwsDataScript);
        
        const videoLists = deepSearchJson(pwsData, ['video_list']);
        const imageObjects = deepSearchJson(pwsData, ['images']);
        const titles = deepSearchJson(pwsData, ['title', 'grid_title']);
        const descriptions = deepSearchJson(pwsData, ['description']);
        
        const title = titles.find(t => typeof t === 'string' && t.length > 0) || 'Pinterest Content';
        const description = descriptions.find(d => typeof d === 'string' && d.length > 0) || '';
        
        if (videoLists.length > 0) {
          const videoList = videoLists[0];
          const downloadOptions: DownloadOption[] = [];
          
          for (const [quality, videoData] of Object.entries(videoList)) {
            if (typeof videoData === 'object' && videoData !== null && 'url' in videoData) {
              const videoUrl = (videoData as any).url;
              const width = (videoData as any).width || 0;
              const height = (videoData as any).height || 0;
              const isM3u8 = videoUrl.includes('.m3u8');
              
              downloadOptions.push({
                quality: quality === 'V_720P' ? 'HD (720p)' : 
                         quality === 'V_HLSV4' ? 'HLS' :
                         quality === 'V_EXP7' ? 'High Quality' :
                         `${width}x${height}`,
                format: isM3u8 ? 'm3u8' : 'mp4',
                size: 'Unknown',
                url: videoUrl,
              });
            }
          }
          
          let thumbnail = '';
          if (imageObjects.length > 0) {
            const images = imageObjects[0];
            thumbnail = images?.['736x']?.url || images?.orig?.url || '';
          }
          
          if (downloadOptions.length > 0) {
            return {
              type: 'video',
              title,
              description,
              thumbnail,
              downloadOptions,
            };
          }
        }
        
        if (imageObjects.length > 0) {
          const images = imageObjects[0];
          const downloadOptions: DownloadOption[] = [];
          
          if (images.orig?.url) {
            downloadOptions.push({
              quality: 'Original',
              format: 'jpg',
              size: `${images.orig.width}x${images.orig.height}`,
              url: images.orig.url,
            });
          }
          
          if (images['736x']?.url) {
            downloadOptions.push({
              quality: 'Large',
              format: 'jpg',
              size: '736px',
              url: images['736x'].url,
            });
          }
          
          const thumbnail = images?.['236x']?.url || images?.['736x']?.url || images?.orig?.url || '';
          
          if (downloadOptions.length > 0) {
            return {
              type: 'image',
              title,
              description,
              thumbnail,
              downloadOptions,
            };
          }
        }
      } catch (e) {
        console.error('Error parsing __PWS_DATA__:', e);
      }
    }
    
    let ldJsonVideo: PinterestData | null = null;
    $('script[type="application/ld+json"]').each((_, elem) => {
      try {
        const ldJson = JSON.parse($(elem).html() || '{}');
        
        if (ldJson['@type'] === 'VideoObject' || ldJson.type === 'VideoObject') {
          const videoUrl = ldJson.contentUrl || ldJson.embedUrl || ldJson.url;
          const thumbnailUrl = ldJson.thumbnailUrl || ldJson.thumbnail;
          const title = ldJson.name || ldJson.headline || 'Pinterest Video';
          const description = ldJson.description || '';
          
          if (videoUrl) {
            const isM3u8 = videoUrl.includes('.m3u8');
            ldJsonVideo = {
              type: 'video',
              title,
              description,
              thumbnail: thumbnailUrl || '',
              downloadOptions: [
                {
                  quality: 'Default',
                  format: isM3u8 ? 'm3u8' : 'mp4',
                  size: 'Unknown',
                  url: videoUrl,
                },
              ],
            };
            console.log('Found VideoObject in ld+json:', videoUrl);
          }
        }
      } catch (e) {
        console.error('Error parsing ld+json:', e);
      }
    });
    
    if (ldJsonVideo) {
      return ldJsonVideo;
    }
    
    const ogVideo = $('meta[property="og:video"]').attr('content') || 
                    $('meta[property="og:video:url"]').attr('content');
    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogTitle = $('meta[property="og:title"]').attr('content') || 'Pinterest Content';
    const ogDescription = $('meta[property="og:description"]').attr('content') || '';
    
    if (ogVideo) {
      const isM3u8 = ogVideo.includes('.m3u8');
      return {
        type: 'video',
        title: ogTitle,
        description: ogDescription,
        thumbnail: ogImage || '',
        downloadOptions: [
          {
            quality: 'Default',
            format: isM3u8 ? 'm3u8' : 'mp4',
            size: 'Unknown',
            url: ogVideo,
          },
        ],
      };
    }
    
    if (ogImage) {
      return {
        type: 'image',
        title: ogTitle,
        description: ogDescription,
        thumbnail: ogImage,
        downloadOptions: [
          {
            quality: 'Original',
            format: 'jpg',
            size: 'Unknown',
            url: ogImage,
          },
        ],
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing Pinterest content:', error);
    return null;
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Pinterest Downloader API',
    version: '1.0.0',
    endpoints: {
      download: 'POST /api/download',
      contact: 'POST /api/contact',
    },
  });
}
