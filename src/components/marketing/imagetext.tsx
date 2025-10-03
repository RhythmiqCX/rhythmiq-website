// components/marketing/image-text-section.tsx
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface ImageTextSectionProps {
  /** Local image path or remote URL */
  imgSrc: string;
  /** Alt text for the image (for accessibility + SEO) */
  imgAlt: string;
  /** Small eyebrow label above the headline */
  eyebrow?: string;
  /** H2 / H3 headline */
  headline: string;
  /** Supporting copy (markdown allowed) */
  body: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA link href */
  ctaHref?: string;
  /** Flip layout so image is on the right in desktop */
  reverse?: boolean;
  /** Optional custom className */
  className?: string;
  /** Optional override for the image wrapper sizing/classes */
  imageWrapperClassName?: string;
}

/*
  Renders a two-column block using flex:
  - Mobile: stacked vertically
  - Desktop: side by side, reversable via `reverse` prop
*/
export default function ImageTextSection({
  imgSrc,
  imgAlt,
  eyebrow,
  headline,
  body,
  ctaText,
  ctaHref,
  reverse,
  className,
  imageWrapperClassName,
}: ImageTextSectionProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div
        className={cn(
          'container mx-auto flex flex-col md:flex-row items-center gap-10',
          reverse && 'md:flex-row-reverse'
        )}
      >
        {/* Image */}
        <div className={cn(
          "relative w-[400px] aspect-[16/10] md:aspect-square overflow-hidden",
          imageWrapperClassName
        )}>
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Copy */}
        <div className="space-y-6">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-wider text-primary/70">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl md:text-3xl font-bold leading-tight">{headline}</h2>
          <p className="text-muted-foreground text-base md:text-lg whitespace-pre-line">
            {body}
          </p>
          {ctaText && ctaHref && (
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
            >
              {ctaText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75L6.75 17.25m10.5 0H6.75V6.75"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/*
Usage example:
<ImageTextSection
  imgSrc="/images/ecommerce-chatbot.png"
  imgAlt="E-commerce chatbot helping a customer"
  eyebrow="Use Case"
  headline="Boost Sales with Instant Product Q&A"
  body={`Let shoppers ask size, delivery and return questions directly in chat.
Boost trust and increase completed checkouts by up to 25 %.`}
  ctaText="See Templates"
  ctaHref="#templates"
  reverse={true}
/>
*/
