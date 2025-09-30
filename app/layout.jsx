import './globals.css'

export const metadata = {
  title: 'Red Cross Philippines',
  description: 'Red Cross Registration System Frontend',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 min-h-screen flex items-center justify-center">
        <main className="max-w-xl w-full p-6">{children}</main>
      </body>
    </html>
  )
}
