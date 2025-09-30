import './globals.css';
import { Inter } from 'next/font/google';

// Load the Inter font (using Next.js Font Optimization)
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Red Cross Philippines',
  description: 'Secure user registration and profile management for Red Cross volunteers, members, and donors.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Apply the Inter font class globally */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
