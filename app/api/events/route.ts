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
    console.log('[v0] Events feed fetched, length:', xmlText.length)
    
    const events: CalendarEvent[] = []

    // Try parsing as RSS/XML format first (looking for <item> tags)
    let eventItems = xmlText.match(/<item>[\s\S]*?<\/item>/gi)

    if (eventItems && eventItems.length > 0) {
      console.log('[v0] Found', eventItems.length, 'RSS items')
      
      for (let i = 0; i < Math.min(eventItems.length, 6); i++) {
        const item = eventItems[i]
        
        // Extract title from <title> tag
        const titleMatch = item.match(/<title[^>]*>(.+?)<\/title>/i)
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : `Event ${i + 1}`
        
        // Extract date from <description> or custom date field
        const descMatch = item.match(/<description[^>]*>(.+?)<\/description>/is)
        const description = descMatch ? descMatch[1] : ''
        
        // Try to extract date from description or use other fields
        const dateMatch = description.match(/(\d{1,2})\s+([A-Za-z]+)/i) || 
                         item.match(/<dt:startDate[^>]*>(.+?)<\/dt:startDate>/i) ||
                         item.match(/<start[^>]*>(.+?)<\/start>/i)
        
        if (!dateMatch) continue

        // Parse event date
        let dateStr = ''
        let monthStr = ''
        
        if (dateMatch[1] && dateMatch[2]) {
          // Format: "23 March"
          dateStr = dateMatch[1]
          const monthMap: Record<string, string> = {
            'january': 'January', 'february': 'February', 'march': 'March',
            'april': 'April', 'may': 'May', 'june': 'June',
            'july': 'July', 'august': 'August', 'september': 'September',
            'october': 'October', 'november': 'November', 'december': 'December'
          }
          monthStr = monthMap[dateMatch[2].toLowerCase()] || dateMatch[2]
        } else if (dateMatch[1]) {
          // Try parsing as ISO date
          const parsedDate = parseEventDate(dateMatch[1])
          if (parsedDate) {
            dateStr = parsedDate.date
            monthStr = parsedDate.month
          } else {
            continue
          }
        } else {
          continue
        }

        // Extract time information
        const timeMatch = description.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)/i) ||
                         description.match(/(\d{1,2}):(\d{2})/i)
        const timeStr = timeMatch ? description.substring(description.indexOf(timeMatch[0]), description.indexOf(timeMatch[0]) + 50).split('<')[0] : 'TBD'

        events.push({
          date: dateStr,
          month: monthStr,
          title,
          time: timeStr || 'TBD',
          link: '#',
        })
      }
    } else {
      console.log('[v0] No RSS items found, trying iCalendar format')
      
      // Fall back to iCalendar format (ICS)
      const eventMatches = xmlText.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || []
      console.log('[v0] Found', eventMatches.length, 'iCalendar events')

      for (let i = 0; i < Math.min(eventMatches.length, 6); i++) {
        const eventBlock = eventMatches[i]

        const summaryMatch = eventBlock.match(/SUMMARY:(.+?)(?:\r?\n|$)/i)
        const dtStartMatch = eventBlock.match(/DTSTART(?:;[^:]*)?:(.+?)(?:\r?\n|$)/i)
        const dtEndMatch = eventBlock.match(/DTEND(?:;[^:]*)?:(.+?)(?:\r?\n|$)/i)

        const title = summaryMatch ? summaryMatch[1].trim() : `Event ${i + 1}`
        const startDate = dtStartMatch ? dtStartMatch[1].trim() : null
        const endDate = dtEndMatch ? dtEndMatch[1].trim() : null

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
          link: '#',
        })
      }
    }

    console.log('[v0] Returning', events.length, 'events')
    return NextResponse.json(events)
  } catch (error) {
    console.error('[v0] Error fetching events:', error)
    return NextResponse.json([])
  }
}
