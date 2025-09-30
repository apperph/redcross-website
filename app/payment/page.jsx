import content from '../../data/content.json'

export default function PaymentPage() {
  const page = content.payment_page.hero_section

  return (
    <section className="bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold text-[var(--brand-blue)]">{page.headline}</h1>
      <p className="mt-2 text-gray-600">{page.sub_headline}</p>

      {/* Payment Form Placeholder */}
      <form className="mt-4 space-y-3">
        <input type="text" placeholder="Card Number" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Expiry Date" className="w-full border p-2 rounded" />
        <input type="text" placeholder="CVV" className="w-full border p-2 rounded" />
        <button type="submit" className="btn-danger w-full">{page.core_cta}</button>
      </form>
    </section>
  )
}
