// redcross-website/app/login/page.jsx

import Link from 'next/link';
// Assuming you have a file that exports your content JSON, e.g., in a data folder
import content from '@/data/content.json'; 

// Destructure the required content for the login page
const { login_page } = content;

// Define design tokens based on the requirements for easy use
const primaryBlue = '#002888';
const darkText = '#333333';
const subtleBackground = 'rgba(0, 40, 136, 0.05)'; // rgba(0, 40, 136, 0.05)

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4">
      
      {/* HEADER: Placeholder for Logo */}
      <header className="w-full max-w-lg mb-8 text-center">
        {/* Replace with your actual Red Cross Logo component */}
        <div className="text-xl font-bold" style={{ color: primaryBlue }}>
          [Red Cross Philippines Logo Placeholder]
        </div>
      </header>
      
      {/* MAIN CONTAINER / CARD LAYOUT */}
      <div 
        className="w-full max-w-md p-8 rounded-xl shadow-2xl" 
        style={{ backgroundColor: subtleBackground, border: `1px solid ${primaryBlue}10` }}
      >
        
        {/* HERO SECTION */}
        <h1 
          className="text-3xl font-extrabold mb-3 text-center" 
          style={{ color: primaryBlue }}
        >
          {login_page.hero_section.headline}
        </h1>
        <p className="text-center mb-8" style={{ color: darkText }}>
          {login_page.hero_section.sub_headline}
        </p>

        {/* AUTHENTICATION FORM (Placeholder) */}
        <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
          <form className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: darkText }}>
              Enter Your Credentials
            </h2>
            
            {/* Form Fields - Placeholder for actual input components */}
            {login_page.authentication_support.form_fields.map((field, index) => (
              <input 
                key={index}
                type={field.includes('Password') ? 'password' : 'email'}
                placeholder={field}
                required
                className="w-full p-3 border rounded-lg focus:ring-2"
                style={{ borderColor: '#ccc', focusRingColor: primaryBlue }}
              />
            ))}
            
            <button 
              type="submit" 
              className="w-full py-3 rounded-lg text-white font-bold transition duration-200 hover:opacity-90"
              style={{ backgroundColor: primaryBlue }}
            >
              {login_page.hero_section.core_cta}
            </button>
          </form>

          {/* SUPPORT LINKS */}
          <div className="mt-4 text-center space-x-4">
            {login_page.authentication_support.support_links.map((link, index) => (
              <Link 
                key={index} 
                href={link.includes('Password') ? '/reset-password' : '/support'} 
                className="text-sm font-medium hover:underline"
                style={{ color: primaryBlue }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* REGISTRATION TEASER */}
        <div className="text-center pt-4 border-t" style={{ borderColor: '#eee' }}>
          <p className="mb-2" style={{ color: darkText }}>{login_page.registration_teaser.headline}</p>
          <Link 
            href="/register" 
            className="font-bold hover:underline" 
            style={{ color: primaryBlue }}
          >
            {login_page.registration_teaser.cta_text}
          </Link>
        </div>
        
      </div>
      
      {/* SECURITY FEATURES (Optional Footer Section) */}
      <div className="w-full max-w-md mt-8 text-center">
        <h3 className="text-lg font-semibold mb-2" style={{ color: darkText }}>Security & Access</h3>
        <ul className="text-sm space-y-1" style={{ color: darkText }}>
          {login_page.security_access.map((item, index) => (
            <li key={index}>— {item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default LoginPage;
