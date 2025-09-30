// redcross-website/app/register/page.jsx

import Link from 'next/link';
// Assuming you have a file that exports your content JSON, e.g., in a data folder
import content from '@/data/content.json'; 

// Destructure the required content for the register page
const { register_page } = content;

// Define design tokens based on the requirements for easy use
const primaryBlue = '#002888';
const primaryRed = '#E3000E';
const darkText = '#333333';
const subtleBackground = 'rgba(0, 40, 136, 0.05)'; // rgba(0, 40, 136, 0.05)

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4">
      
      {/* HEADER: Placeholder for Logo and Step Indicator */}
      <header className="w-full max-w-xl mb-8 text-center">
        {/* Placeholder for your actual Red Cross Logo component */}
        <div className="text-xl font-bold mb-2" style={{ color: primaryBlue }}>
          [Red Cross Philippines Logo Placeholder]
        </div>
        
        {/* Step Indicator (Teaser for context) */}
        <p className="text-sm font-semibold" style={{ color: darkText }}>
          Step 1 of 3: Registration
        </p>
      </header>
      
      {/* MAIN CONTAINER / CARD LAYOUT */}
      <div 
        className="w-full max-w-xl p-8 rounded-xl shadow-2xl" 
        style={{ backgroundColor: subtleBackground, border: `1px solid ${primaryBlue}10` }}
      >
        
        {/* HERO SECTION */}
        <h1 
          className="text-4xl font-extrabold mb-3 text-center" 
          style={{ color: primaryBlue }}
        >
          {register_page.hero_section.headline}
        </h1>
        <p className="text-center mb-8 text-lg" style={{ color: darkText }}>
          {register_page.hero_section.sub_headline}
        </p>

        {/* PHILSYS INTEGRATION SECTION (KYC Streamlining) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4" style={{ borderColor: primaryRed }}>
          <h2 className="text-xl font-semibold mb-2" style={{ color: primaryBlue }}>
            {register_page.philsys_integration.feature_headline}
          </h2>
          <p className="text-sm mb-4" style={{ color: darkText }}>
            {register_page.philsys_integration.feature_description}
          </p>

          <div className="flex flex-col space-y-3">
            {/* OPTION 1: PhilSys Button (Primary Action for KYC) */}
            <button
              onClick={() => alert("Redirecting to PhilSys Verification Portal...")}
              className="w-full py-3 rounded-lg text-white font-bold transition duration-200 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: primaryBlue }}
            >
              {register_page.philsys_integration.kyc_option_1.cta_text}
            </button>
            <p className="text-xs text-center italic" style={{ color: darkText }}>
              {register_page.philsys_integration.kyc_option_1.note}
            </p>
            
            <div className="text-center text-sm font-semibold" style={{ color: darkText }}>
                — OR —
            </div>

            {/* OPTION 2: Manual Fill Button/Teaser */}
            <button
              // In a real app, this might just hide the button or display the form
              onClick={() => console.log("Manual fill selected")}
              className="w-full py-2 rounded-lg text-sm font-medium transition duration-200 border hover:bg-gray-50"
              style={{ color: primaryBlue, borderColor: primaryBlue }}
            >
              {register_page.philsys_integration.kyc_option_2.cta_text}
            </button>
          </div>
        </div>
        
        {/* REGISTRATION FORM (PROFILE DATA COLLECTION) */}
        <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: darkText }}>
            Personal Details
          </h2>
          <p className="text-sm mb-4" style={{ color: darkText }}>
            {register_page.profile_data_collection.purpose}
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* MANDATORY FIELDS - Placeholder inputs */}
            {register_page.profile_data_collection.fields_mandatory.map((field, index) => (
              <div key={index} className="col-span-1">
                <label className="text-xs font-medium block mb-1" style={{ color: darkText }}>
                  {field} <span style={{ color: primaryRed }}>*</span>
                </label>
                <input 
                  type={field.includes('Date') ? 'date' : field.includes('Number') ? 'number' : 'text'}
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2"
                  style={{ borderColor: '#ccc', focusRingColor: primaryBlue }}
                />
              </div>
            ))}

            {/* OPTIONAL FIELD - Placeholder input */}
            {register_page.profile_data_collection.fields_optional.map((field, index) => (
              <div key={index} className="col-span-1">
                <label className="text-xs font-medium block mb-1" style={{ color: darkText }}>
                  {field} (Optional)
                </label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2"
                  style={{ borderColor: '#ccc', focusRingColor: primaryBlue }}
                />
              </div>
            ))}
            
            {/* CORE CTA */}
            <div className="md:col-span-2 pt-4">
                <button 
                  type="submit" 
                  className="w-full py-3 rounded-lg text-white font-bold transition duration-200 hover:opacity-90 shadow-md"
                  style={{ backgroundColor: primaryBlue }}
                >
                  {register_page.hero_section.core_cta}
                </button>
            </div>
          </form>
        </div>
        
        {/* COMPLIANCE & TRUST */}
        <div className="text-center pt-4 mb-4">
          <h3 className="text-lg font-semibold mb-2" style={{ color: primaryBlue }}>
            Security & Service Commitment
          </h3>
          <ul className="text-sm space-y-1 list-disc list-inside mx-auto w-fit text-left" style={{ color: darkText }}>
            {register_page.compliance_trust.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        {/* STEP PROGRESS TEASER */}
        <p className="text-sm text-center font-bold" style={{ color: primaryBlue }}>
            {register_page.step_progress_teaser}
        </p>

      </div>
      
      {/* FOOTER LEVEL CTA */}
      <footer className="w-full max-w-xl mt-8 text-center">
        <Link 
          href="/support/data-privacy" 
          className="text-sm font-medium hover:underline"
          style={{ color: primaryBlue }}
        >
          {register_page.footer_level_cta}
        </Link>
      </footer>
    </div>
  );
};

export default RegisterPage;
