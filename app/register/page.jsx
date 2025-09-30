import content from '../../data/content.json'
import Link from 'next/link'

export default function RegisterPage() {
  const page = content.register_page.hero_section

  return (
    <section className="bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold text-[var(--brand-blue)]">{page.headline}</h1>
      <p className="mt-2 text-gray-600">{page.sub_headline}</p>

      {/* QR Scanner Placeholder */}
      <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-500">[ QR Code Scanner — Coming Soon ]</p>
      </div>

      <Link href="/login" className="btn-primary mt-6 inline-block">
        {page.core_cta}
      </Link>
    </section>
  )
}
