export type SlideMedia =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster?: string }

export interface Slide {
  id: string
  media: SlideMedia
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}
