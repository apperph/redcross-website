// redcross-website/app/payment/page.jsx

import Link from 'next/link';
// Assuming you have a file that exports your content JSON, e.g., in a data folder
import content from '@/data/content.json'; 

// Destructure the required content for the payment page
const { payment_page } = content;

// Define design tokens based on the requirements for easy use
const primaryBlue = '#002888';
const primaryRed = '#E3000E';
const darkText = '#333333';
const subtleBackground = 'rgba(0, 40, 136, 0.05)'; // rgba(0, 40, 136, 0.05)

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4">
      
      {/* HEADER: Placeholder for Logo and Step Indicator */}
      <header className="w-full max-w-lg mb-8 text-center">
        {/* Placeholder for your actual Red Cross Logo component */}
        <div className="text-xl font-bold mb-2" style={{ color: primaryBlue }}>
          [Red Cross Philippines Logo Placeholder]
        </div>
        
        {/* Step Indicator (Manual Teaser for context) */}
        <p className="text-sm font-semibold" style={{ color: darkText }}>
          Step 3 of 3: Transaction Phase
        </p>
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
          {payment_page.hero_section.headline}
        </h1>
        <p className="text-center mb-8" style={{ color: darkText }}>
          {payment_page.hero_section.sub_headline}
        </p>

        {/* TRANSACTION DETAILS AND FORM (Card) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: darkText }}>
            Secure Payment Gateway
          </h2>
          <p className="text-sm mb-4" style={{ color: darkText }}>
            {payment_page.transaction_details.description}
          </p>
          
          <form className="space-y-4">
            {/* Form Fields - Placeholder for actual input components */}
            {payment_page.transaction_details.form_fields.map((field, index) => (
              <input 
                key={index}
                type={field.includes('Number') ? 'text' : 'text'}
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
              {payment_page.hero_section.core_cta}
            </button>
          </form>
        </div>

        {/* SECURITY & COMPLIANCE SECTION */}
        <div className="text-center pt-4 mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: primaryBlue }}>
            Security & Financial Trust
          </h3>
          <ul className="text-sm space-y-1 list-disc list-inside mx-auto w-fit text-left" style={{ color: darkText }}>
            {payment_page.security_compliance.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        {/* RECEIPT CONFIRMATION TEASER */}
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f4ff', border: `1px solid ${primaryBlue}30` }}>
            <p className="font-semibold text-base mb-1" style={{ color: primaryBlue }}>
                Confirmation Details
            </p>
            <p className="text-sm" style={{ color: darkText }}>
                {payment_page.receipt_placeholder.info}
            </p>
        </div>
        
      </div>
      
      {/* FOOTER LEVEL CTA */}
      <footer className="w-full max-w-md mt-8 text-center">
        <Link 
          href="/support/payment-issues" 
          className="text-sm font-medium hover:underline"
          style={{ color: primaryRed }}
        >
          {payment_page.footer_level_cta}
        </Link>
      </footer>
    </div>
  );
};

export default PaymentPage;
