// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-red-600">Welcome to Red Cross</h1>
      <p className="mt-4 text-gray-600">
        This is the homepage. Use the navigation below to get started.
      </p>
      <div className="mt-6 flex gap-4">
        <a
          href="/register"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Register
        </a>
        <a
          href="/login"
          className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
        >
          Login
        </a>
        <a
          href="/payment"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Payment
        </a>
      </div>
    </main>
  )
}
