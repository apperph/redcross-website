import Link from 'next/link';

// Custom colors defined in globals.css or tailwind config
const primaryBlue = 'var(--rc-blue)';
const primaryRed = 'var(--rc-red)';
const darkText = 'var(--rc-dark)';

export default function Home() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 text-center"
      style={{ backgroundColor: '#ffffff', color: darkText }}
    >
      <div 
        className="max-w-xl w-full p-8 rounded-xl shadow-2xl" 
        style={{ backgroundColor: 'var(--rc-bg-subtle, rgba(0, 40, 136, 0.05))' }}
      >
        {/* Logo Placeholder */}
        <div className="text-4xl font-black mb-6" style={{ color: primaryRed }}>
          [Red Cross Philippines]
        </div>

        <h1 className="text-5xl font-extrabold mb-4" style={{ color: primaryBlue }}>
          Welcome to the Volunteer Portal
        </h1>
        
        <p className="text-lg mb-8">
          Your secure gateway to becoming a member, volunteer, or blood donor. 
          Join the mission of humanity and compassion.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
          <Link href="/register">
            <div 
              className="py-3 px-8 rounded-lg text-white font-bold text-lg transition duration-300 hover:opacity-90 shadow-lg cursor-pointer"
              style={{ backgroundColor: primaryRed }}
            >
              Start Registration
            </div>
          </Link>

          <Link href="/login">
            <div 
              className="py-3 px-8 rounded-lg border-2 font-bold text-lg transition duration-300 hover:bg-rc-blue/5 cursor-pointer"
              style={{ borderColor: primaryBlue, color: primaryBlue }}
            >
              Login to My Profile
            </div>
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-sm text-gray-600">
        Committed to data security and humanitarian service since 1947.
      </footer>
    </div>
  );
}
