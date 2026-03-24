import { NextResponse } from 'next/server'

// RSS Feed URL for Stepping Stones news
const RSS_FEED_URL = 'https://steppingstones.co.ke/feed/'

interface RssItem {
  id: string
  title: string
  author: string
  date: string
  excerpt: string
  image: string
  link: string
}

function extractImageFromContent(content: string): string | null {
  // Try to extract the first image URL from the content
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (imgMatch) {
    return imgMatch[1]
  }
  
  // Try media:content or enclosure
  const mediaMatch = content.match(/url=["']([^"']+\.(jpg|jpeg|png|gif|webp))["']/i)
  if (mediaMatch) {
    return mediaMatch[1]
  }
  
  return null
}

function stripHtml(html: string): string {
  // Remove HTML tags and decode entities
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()
}

function extractExcerpt(content: string, maxLength: number = 200): string {
  const text = stripHtml(content)
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

export async function GET() {
  try {
    const response = await fetch(RSS_FEED_URL, {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`)
    }

    const xmlText = await response.text()
    
    // Parse RSS XML
    const items: RssItem[] = []
    const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/gi) || []
    
    for (let i = 0; i < Math.min(itemMatches.length, 6); i++) {
      const itemXml = itemMatches[i]
      
      // Extract title
      const titleMatch = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/i)
      const title = titleMatch ? stripHtml(titleMatch[1] || titleMatch[2] || '') : 'Untitled'
      
      // Extract link
      const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/i)
      const link = linkMatch ? linkMatch[1].trim() : '#'
      
      // Extract author/creator
      const authorMatch = itemXml.match(/<dc:creator><!\[CDATA\[([\s\S]*?)\]\]><\/dc:creator>|<dc:creator>([\s\S]*?)<\/dc:creator>|<author>([\s\S]*?)<\/author>/i)
      const author = authorMatch ? stripHtml(authorMatch[1] || authorMatch[2] || authorMatch[3] || '') : 'Stepping Stones School'
      
      // Extract date
      const dateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)
      const date = dateMatch ? formatDate(dateMatch[1]) : ''
      
      // Extract content for excerpt and image
      const contentMatch = itemXml.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>|<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/i)
      const content = contentMatch ? (contentMatch[1] || contentMatch[2] || contentMatch[3] || '') : ''
      
      const excerpt = extractExcerpt(content, 250)
      
      // Extract image from content or media tags
      let image = extractImageFromContent(itemXml)
      if (!image) {
        image = extractImageFromContent(content)
      }
      // Fallback image
      if (!image) {
        image = '/images/news-feature-1.jpg'
      }
      
      items.push({
        id: `news-${i + 1}`,
        title,
        author,
        date,
        excerpt,
        image,
        link,
      })
    }

    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    
    // Return fallback data if RSS fetch fails
    return NextResponse.json([
      {
        id: 1,
        title: 'Welcome to Stepping Stones',
        author: 'Stepping Stones School',
        date: 'Mar 2026',
        excerpt: 'Stay tuned for the latest news and updates from Stepping Stones School.',
        image: '/images/news-feature-1.jpg',
        link: 'https://steppingstones.co.ke',
      },
    ])
  }
}
