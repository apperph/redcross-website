// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'rc-blue': '#002888', // Primary Blue
        'rc-red': '#E3000E',  // Primary Red (Errors/Branding)
        'rc-dark': '#333333', // Dark Text
        // Simulated Subtle Background: rc-blue at 5% opacity
        'rc-bg-subtle': 'rgba(0, 40, 136, 0.05)', 
      },
    },
  },
  plugins: [],
}
