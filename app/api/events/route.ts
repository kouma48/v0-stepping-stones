import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const wordpressUrl = process.env.WORDPRESS_SITE_URL
    const wpRestUrl = `${wordpressUrl}/wp-json/tribe/events/v1/events`
    
    if (!wordpressUrl) {
      return NextResponse.json(
        { error: 'WordPress URL not configured' },
        { status: 400 }
      )
    }

    const response = await fetch(wpRestUrl, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`)
    }

    const data = await response.json()

    // Transform the Events Calendar data to our format
    const events = data.events?.map((event: any) => {
      const eventDate = new Date(event.start_date)
      
      return {
        id: event.id,
        date: eventDate.getDate().toString().padStart(2, '0'),
        month: eventDate.toLocaleDateString('en-US', { month: 'long' }),
        title: event.title,
        time: formatEventTime(event.start_date, event.end_date),
        link: event.url || '#',
        description: event.description || '',
      }
    }) || []

    // Return upcoming 3 events
    return NextResponse.json(events.slice(0, 3))
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

function formatEventTime(startDate: string, endDate?: string): string {
  try {
    const start = new Date(startDate)
    
    // Format time
    const timeStr = start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

    if (endDate) {
      const end = new Date(endDate)
      const endTimeStr = end.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      return `${timeStr} - ${endTimeStr}`
    }

    return timeStr
  } catch {
    return 'all day'
  }
}
