export function JsonLd({ data }: { data: unknown[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data.length === 1 ? data[0] : data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
