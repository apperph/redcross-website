# Red Cross Philippines - React Application

A modern React.js application for the Red Cross Philippines user registration system, built with Vite, Tailwind CSS, and featuring QR code scanning capabilities for National ID processing.

## 🚀 Features

- **Home Page** (`/`) - Welcome section with hero banner and feature highlights
- **Login Page** (`/login`) - Secure login form with email/password authentication
- **Registration Page** (`/register`) - Two registration options:
  - **National ID QR Code Scanning** - Automatically extract and fill personal information
  - **Manual Input** - Traditional form entry for all personal details
- **Payment Page** (`/payment`) - Secure payment processing with multiple payment methods
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI** - Clean, accessible interface with Red Cross branding

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **QR Scanner** - QR code scanning functionality
- **Font Awesome** - Icons and visual elements

## 📁 Project Structure

```
/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   └── QRCodeScanner.jsx
│   ├── layouts/             # Shared layouts
│   │   └── MainLayout.jsx
│   ├── pages/               # Route-based pages
│   │   ├── index.jsx        # Home page (/)
│   │   ├── login.jsx        # Login page (/login)
│   │   ├── register.jsx     # Registration page (/register)
│   │   └── payment.jsx      # Payment page (/payment)
│   ├── hooks/               # Custom React hooks
│   │   ├── useQRCodeScanner.js
│   │   └── useFormValidation.js
│   ├── utils/               # Helper functions
│   │   ├── parseQRCode.js
│   │   └── formValidators.js
│   ├── styles/              # Additional CSS if needed
│   ├── App.js               # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles and Tailwind imports
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json              # Vercel deployment config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd red-cross-ph
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the app for production
- `npm run preview` - Preview production build locally
- `npm start` - Start production server (alias for preview)

## 🎯 Key Features

### QR Code Scanning
- Integrated QR scanner for National ID processing
- Automatic form field population from scanned data
- Camera switching between front and back cameras
- Fallback to manual input if scanning fails

### Form Validation
- Real-time validation for all form fields
- Email format validation
- Philippine mobile number format validation
- Age restrictions (18+ for membership)
- Required field validation

### Payment Processing
- Multiple payment methods (Credit/Debit, GCash, PayMaya, Bank Transfer)
- Card number formatting and validation
- Secure payment information handling
- PCI-DSS compliance messaging

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Adaptive form layouts
- Touch-friendly interface

## 🔧 Development

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route to `src/App.js`
3. Update the navigation in `src/components/Navbar.jsx`

### Styling
- Uses Tailwind CSS utility classes
- Custom components defined in `src/index.css`
- Red Cross brand colors configured in `tailwind.config.js`

### QR Code Integration
- Uses `qr-scanner` library
- Handles both JSON and string QR code formats
- Graceful fallback to manual input

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel:**
   - Push your code to GitHub
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the Vite configuration

2. **Environment Variables (if needed):**
   - Add any required environment variables in Vercel dashboard
   - The app works without additional environment variables

3. **Deploy:**
   - Vercel will automatically build and deploy your app
   - Your app will be available at `https://your-app.vercel.app`

### Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder:**
   - Upload the contents of the `dist` folder to your hosting provider
   - Configure your server to serve `index.html` for all routes (SPA routing)

## 🔒 Security Features

- SSL encryption messaging
- Data Privacy Act compliance
- Secure payment processing
- No data storage warnings
- Real-time form validation

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interface
- Camera access for QR scanning
- Mobile-optimized forms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational and demonstration purposes.

## 🆘 Support

For support, email support@redcross.org.ph or create an issue in the GitHub repository.

---

**Red Cross Philippines** - Saving Lives, Building Communities