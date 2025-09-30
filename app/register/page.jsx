// redcross-website/app/register/page.jsx

import Link from 'next/link';
import content from '@/data/content.json'; 

// Destructure the required content
const { register_page } = content;

// Define CSS Variables/Tokens for components that rely on style props (or use custom Tailwind colors)
const primaryBlue = 'rc-blue'; // Class name or #002888
const primaryRed = 'rc-red';   // Class name or #E3000E

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 md:py-16 px-4 font-sans">
      
      {/* HEADER & LOGO AREA */}
      <header className="w-full max-w-xl mb-6 text-center">
        {/* Placeholder for your actual Red Cross Logo component */}
        <div className="text-2xl font-black mb-3 text-rc-red">
          [Red Cross PH Logo]
        </div>
        
        {/* Step Indicator */}
        <p className="text-sm font-semibold tracking-wider uppercase text-rc-blue">
          Step 1 of 3: Registration
        </p>
      </header>
      
      {/* MAIN CONTAINER / CARD LAYOUT */}
      <div 
        className={`w-full max-w-xl p-6 md:p-8 rounded-xl shadow-2xl bg-rc-bg-subtle border border-rc-blue/10`}
      >
        
        {/* HERO SECTION */}
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-rc-blue">
            {register_page.hero_section.headline}
            </h1>
            <p className="text-base md:text-lg text-rc-dark">
            {register_page.hero_section.sub_headline}
            </p>
        </div>

        {/* PHILSYS INTEGRATION CARD (Modular Box 1) */}
        <div className="bg-white p-5 rounded-lg shadow-lg mb-6 border-l-4 border-rc-red">
          <h2 className="text-xl font-bold mb-2 text-rc-blue">
            {register_page.philsys_integration.feature_headline}
          </h2>
          <p className="text-sm text-rc-dark mb-4">
            {register_page.philsys_integration.feature_description}
          </p>

          <div className="flex flex-col space-y-3">
            {/* OPTION 1: PhilSys Button (Primary Action for KYC) */}
            <button
              type="button"
              className={`w-full py-3 rounded-lg text-white font-bold transition duration-200 hover:opacity-90 shadow-md bg-rc-blue`}
            >
              {register_page.philsys_integration.kyc_option_1.cta_text}
            </button>
            <p className="text-xs text-center italic text-rc-dark/70">
              {register_page.philsys_integration.kyc_option_1.note}
            </p>
            
            <div className="text-center text-sm font-semibold text-rc-dark">
                — OR —
            </div>

            {/* OPTION 2: Manual Fill Button/Teaser */}
            <button
              type="button"
              className={`w-full py-2 rounded-lg text-sm font-medium transition duration-200 border border-rc-blue text-rc-blue hover:bg-rc-blue/5`}
            >
              {register_page.philsys_integration.kyc_option_2.cta_text}
            </button>
          </div>
        </div>
        
        {/* REGISTRATION FORM (Modular Box 2) */}
        <div className="bg-white p-5 rounded-lg shadow-inner mb-6">
          <h2 className="text-xl font-bold mb-3 text-rc-dark">
            Personal Details
          </h2>
          <p className="text-sm text-rc-dark mb-4">
            {register_page.profile_data_collection.purpose}
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form Fields - Replicating inputs for Mandtory/Optional fields */}
            {[...register_page.profile_data_collection.fields_mandatory, ...register_page.profile_data_collection.fields_optional].map((field, index) => {
                const isMandatory = register_page.profile_data_collection.fields_mandatory.includes(field);
                
                let inputType = 'text';
                if (field.includes('Date')) inputType = 'date';
                else if (field.includes('Number')) inputType = 'tel'; // Use tel for mobile number with validation
                else if (field.includes('Email')) inputType = 'email';

                // Simplified field rendering: in a real app, Sex and Marital Status would be <select>
                if (field === 'Sex' || field === 'Marital Status') {
                    inputType = 'select'; // Placeholder for dropdown
                }

                return (
                    <div key={index} className="col-span-1">
                        <label className="text-xs font-medium block mb-1 text-rc-dark">
                            {field} {isMandatory ? <span className="text-rc-red">*</span> : <span className="text-gray-500">(Optional)</span>}
                        </label>
                        {inputType === 'select' ? (
                            <select
                                required={isMandatory}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-rc-blue/50"
                                placeholder={field}
                            >
                                <option value="">Select {field}</option>
                                {/* Add actual options here */}
                            </select>
                        ) : (
                            <input 
                                type={inputType}
                                required={isMandatory}
                                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-rc-blue/50 text-rc-dark ${field.includes('Mobile Number') ? 'border-rc-red' : ''}`}
                                // Example of IMMEADIATE validation: border-rc-red for failed mobile number
                            />
                        )}
                    </div>
                );
            })}
            
            {/* CORE CTA - Always spans two columns */}
            <div className="md:col-span-2 pt-4">
                <button 
                  type="submit" 
                  className={`w-full py-3 rounded-lg text-white font-bold transition duration-200 hover:opacity-90 shadow-md bg-rc-blue`}
                >
                  {register_page.hero_section.core_cta}
                </button>
            </div>
          </form>
        </div>
        
        {/* COMPLIANCE & TRUST (Modular Box 3) */}
        <div className="p-5 rounded-lg bg-white shadow-md mb-6">
          <h3 className="text-lg font-bold mb-2 text-rc-blue text-center">
            Security & Service Commitment
          </h3>
          <ul className="text-sm space-y-1 list-disc list-inside mx-auto w-fit text-left text-rc-dark">
            {register_page.compliance_trust.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        {/* STEP PROGRESS TEASER */}
        <p className="text-base text-center font-bold text-rc-blue">
            {register_page.step_progress_teaser}
        </p>

      </div>
      
      {/* FOOTER LEVEL CTA */}
      <footer className="w-full max-w-xl mt-8 text-center">
        <Link 
          href="/support/data-privacy" 
          className="text-sm font-medium hover:underline text-rc-blue"
        >
          {register_page.footer_level_cta}
        </Link>
      </footer>
    </div>
  );
};

export default RegisterPage;
