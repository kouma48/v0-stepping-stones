import { NextResponse } from 'next/server'

interface CalendarEvent {
  date: string
  month: string
  title: string
  time: string
  link?: string
}

const EVENTS_FEED_URL = 'https://steppingstones.co.ke/events/feed/'

function parseEventDate(dateString: string): { date: string; month: string } | null {
  try {
    const eventDate = new Date(dateString)
    if (isNaN(eventDate.getTime())) return null

    const date = eventDate.getDate().toString()
    const month = eventDate.toLocaleString('en-US', { month: 'long' })
    return { date, month }
  } catch {
    return null
  }
}

function parseEventTime(
  startTime: string | null,
  endTime: string | null,
  isAllDay: boolean
): string {
  if (isAllDay) return 'all day'

  const formatTime = (time: string | null) => {
    if (!time) return ''
    try {
      const date = new Date(time)
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    } catch {
      return time
    }
  }

  const start = formatTime(startTime)
  const end = formatTime(endTime)

  if (start && end) return `${start} - ${end}`
  return start || 'TBD'
}

export async function GET() {
  try {
    const response = await fetch(EVENTS_FEED_URL, {
      next: { revalidate: 0 }, // No caching - fetch fresh on every request
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch events feed: ${response.status}`)
    }

    const xmlText = await response.text()

    // Parse iCalendar format (ICS)
    const events: CalendarEvent[] = []

    // Extract VEVENT blocks
    const eventMatches = xmlText.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || []

    for (let i = 0; i < Math.min(eventMatches.length, 6); i++) {
      const eventBlock = eventMatches[i]

      // Extract key fields
      const summaryMatch = eventBlock.match(/SUMMARY:(.+?)(?:\r?\n|$)/i)
      const dtStartMatch = eventBlock.match(/DTSTART(?:;[^:]*)?:(.+?)(?:\r?\n|$)/i)
      const dtEndMatch = eventBlock.match(/DTEND(?:;[^:]*)?:(.+?)(?:\r?\n|$)/i)
      const descriptionMatch = eventBlock.match(/DESCRIPTION:(.+?)(?:\r?\n|$)/i)

      const title = summaryMatch ? summaryMatch[1].trim() : `Event ${i + 1}`
      const startDate = dtStartMatch ? dtStartMatch[1].trim() : null
      const endDate = dtEndMatch ? dtEndMatch[1].trim() : null

      // Check if event has time component (not just date)
      const hasTime = startDate ? !startDate.match(/^\d{8}$/) : false
      const isAllDay = !hasTime

      const dateInfo = startDate ? parseEventDate(startDate) : null
      if (!dateInfo) continue

      const time = parseEventTime(startDate, endDate, isAllDay)

      events.push({
        date: dateInfo.date,
        month: dateInfo.month,
        title,
        time,
        link: '#', // Calendar feeds don't typically include links
      })
    }

    // If no events found, return empty array (component will use fallback)
    return NextResponse.json(events)
  } catch (error) {
    console.error('[v0] Error fetching events:', error)
    // Return empty array to trigger fallback in component
    return NextResponse.json([])
  }
}
