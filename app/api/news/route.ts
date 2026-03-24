import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const rssUrl = process.env.WORDPRESS_RSS_FEED_URL
    
    if (!rssUrl) {
      return NextResponse.json(
        { error: 'RSS feed URL not configured' },
        { status: 400 }
      )
    }

    const response = await fetch(rssUrl, {
      headers: { 'Accept': 'application/rss+xml' },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`)
    }

    const xml = await response.text()

    // Parse RSS XML to JSON
    const articles = parseRSSFeed(xml)

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

function parseRSSFeed(xml: string) {
  // Simple RSS parser - extracts title, description, link, pubDate, and image
  const articles = []
  
  // Match all <item> tags
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1]

    // Extract fields with optional fallback to empty string
    const titleMatch = itemContent.match(/<title[^>]*>([\s\S]*?)<\/title>/)
    const descriptionMatch = itemContent.match(/<description[^>]*>([\s\S]*?)<\/description>/)
    const linkMatch = itemContent.match(/<link[^>]*>([\s\S]*?)<\/link>/)
    const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/)
    
    // Try to extract image from media:content or content:encoded
    const imageMatch = itemContent.match(/<media:content[^>]*url="([^"]*)"/) ||
                      itemContent.match(/<img[^>]*src="([^"]*)"/)

    // Remove HTML tags from description
    const description = descriptionMatch 
      ? descriptionMatch[1].replace(/<[^>]*>/g, '').substring(0, 200)
      : ''

    articles.push({
      id: linkMatch?.[1] || '',
      title: titleMatch?.[1]?.replace(/<[^>]*>/g, '') || 'Untitled',
      excerpt: description,
      image: imageMatch?.[1] || '/images/news-placeholder.jpg',
      link: linkMatch?.[1] || '#',
      date: formatDate(pubDateMatch?.[1] || new Date().toISOString()),
      author: 'Stepping Stones School', // RSS typically doesn't have author, can customize
    })
  }

  return articles.slice(0, 3) // Return latest 3 articles
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  } catch {
    return new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }
}
