interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * StructuredData - JSON-LD injection component
 *
 * Server-safe component for injecting structured data into pages.
 * Can accept single schema or array of schemas.
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
