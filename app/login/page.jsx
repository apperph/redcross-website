import content from '../../data/content.json'
import Link from 'next/link'

export default function LoginPage() {
  const page = content.login_page.hero_section

  return (
    <section className="bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold text-[var(--brand-blue)]">{page.headline}</h1>
      <p className="mt-2 text-gray-600">{page.sub_headline}</p>

      <form className="mt-4 space-y-3">
        <input type="email" placeholder="Email Address" className="w-full border p-2 rounded" />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button type="submit" className="btn-primary w-full">{page.core_cta}</button>
      </form>

      <Link href="/register" className="text-sm text-[var(--brand-blue)] mt-4 block">
        New here? Register →
      </Link>
    </section>
  )
}
