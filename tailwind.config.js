/** @type {import('tailwindcss').Config} */
module.exports = {
  // We include the app and data directories to ensure Tailwind processes the content
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx,json}",
  ],
  theme: {
    extend: {
      // Custom Colors based on your CSS Variables
      colors: {
        'rc-blue': '#002888',        // --primary-blue
        'rc-red': '#E3000E',         // --primary-red
        'rc-secondary-blue': '#1a4ba8', // --secondary-blue
        'rc-light-blue': '#e6f0ff',  // --light-blue
        'rc-dark': '#333333',        // --dark-gray
        'rc-medium': '#666666',      // --medium-gray
        'rc-bg-subtle': '#f5f5f5',   // --light-gray (used for subtle backgrounds)
        'rc-success': '#28a745',     // --success-green
        'rc-error': '#dc3545',       // --error-red
        'rc-border': '#e0e0e0',      // --border-color
      },
      // Custom Fonts (Inter is already a common default, but defined here for explicit control)
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Custom Shadows (You can map your variable names here)
      boxShadow: {
        'rc-default': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'rc-hover': '0 4px 20px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [
    // Plugins like 'forms' or 'typography' can be added here if needed
  ],
}
