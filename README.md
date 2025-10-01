# Red Cross Philippines - Static Website

A clean, production-ready static website for the Red Cross Philippines user registration system.

## 🚀 Quick Start

This is a static website that requires no build process. Simply open `index.html` in your browser or deploy to any static hosting service.

## 📁 File Structure

```
├── index.html              # Home page
├── login.html              # Unified login page (users & admins)
├── register.html           # Registration page
├── payment.html            # Payment page
├── admin.html              # Admin dashboard
├── admin.js                # Admin dashboard functionality
├── style.css               # Custom styles
├── script.js               # JavaScript functionality (includes auth)
├── favicon.ico             # Site icon
└── README.md               # This file
```

## 🎯 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Real-time validation with error handling
- **Interactive Elements**: QR scanner simulation, payment methods
- **Admin Dashboard**: Complete management system with authentication
- **Role-Based Access**: Multiple admin levels with different permissions
- **Security Features**: SSL indicators, privacy compliance notices
- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Fast Loading**: CDN-delivered resources, optimized performance

## 🛠 Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No frameworks required
- **Font Awesome**: Icons (via CDN)
- **Google Fonts**: Inter font family

## 📱 Pages

### Home Page (`index.html`)
- Hero section with call-to-action
- Features showcase
- Security information
- Community benefits

### Login Page (`login.html`)
- Secure login form
- Form validation
- Security features display
- Registration teaser

### Registration Page (`register.html`)
- Multi-step process indicator
- QR code scanning simulation
- Comprehensive form with validation
- Test data population
- Security compliance notices

### Payment Page (`payment.html`)
- Multiple payment methods
- Card number formatting
- Payment summary
- Security processing information

### Admin Dashboard (`admin.html`)
- Complete management system
- User management with filtering
- Event creation and management
- Volunteer and staff management
- Donation tracking
- Role-based access control
- Real-time notifications

### Login Page (`login.html`)
- **Unified login** for both regular users and administrators
- **Smart routing** - automatically detects admin users
- **Role-based authentication** with different permission levels
- **Session management** for all user types

## 🚀 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

### Netlify
1. Drag and drop all files to Netlify
2. Your site is live!

### GitHub Pages
1. Upload files to a GitHub repository
2. Enable Pages in repository settings
3. Select source: Deploy from a branch

### Any Static Host
- Upload all files to your hosting service
- No build process required
- Works with any static file server

## 🎨 Customization

### Colors
Red Cross brand colors are defined in the Tailwind config:
- Primary Blue: `#002888`
- Red: `#E3000E` 
- Light Blue: `#e6f0ff`
- Secondary Blue: `#1a4ba8`

### Content
- Edit HTML files to modify content
- Update `style.css` for custom styles
- Modify `script.js` for functionality changes

## 📊 Performance

- **No Build Process**: Instant deployment
- **CDN Resources**: Fast loading from global CDNs
- **Optimized Images**: Compressed and responsive
- **Minimal JavaScript**: Lightweight and fast
- **Mobile Optimized**: Touch-friendly interface

## 🔐 Admin System

### Sample Admin Credentials

For testing and demonstration purposes, use these credentials to access the admin dashboard:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Super Admin** | `admin@redcross.org.ph` | `Admin123!` | Full access to all features |
| **Manager** | `manager@redcross.org.ph` | `Admin123!` | Users, Events, Volunteers, Donations |
| **Staff** | `staff@redcross.org.ph` | `Admin123!` | Users, Events, Volunteers |
| **Volunteer** | `volunteer@redcross.org.ph` | `Admin123!` | Volunteers, Events |

> **Note:** All passwords are `Admin123!` for demonstration purposes. In production, each admin would have unique, secure passwords.

### Admin Login Credentials

The admin system includes multiple user accounts with different permission levels:

#### **Super Administrator**
- **Email:** `admin@redcross.org.ph`
- **Password:** `Admin123!`
- **Role:** Super Admin
- **Permissions:** Full access to all features (users, events, volunteers, donations, settings)

#### **System Manager**
- **Email:** `manager@redcross.org.ph`
- **Password:** `Admin123!`
- **Role:** Admin
- **Permissions:** Users, Events, Volunteers, Donations, Reports

#### **Staff Member**
- **Email:** `staff@redcross.org.ph`
- **Password:** `Admin123!`
- **Role:** Staff
- **Permissions:** Users, Events, Volunteers

#### **Volunteer Coordinator**
- **Email:** `volunteer@redcross.org.ph`
- **Password:** `Admin123!`
- **Role:** Volunteer
- **Permissions:** Volunteers, Events

### Admin Features

- **Dashboard Overview**: Key statistics and recent activity
- **User Management**: Create, edit, delete users with role assignment
- **Event Management**: Full CRUD operations for events
- **Volunteer Management**: Staff and volunteer coordination
- **Donation Tracking**: Financial monitoring and reporting
- **Role-Based Access**: Different permissions for different admin levels
- **Session Management**: 24-hour automatic logout
- **Real-time Notifications**: Success/error messages

### Accessing Admin Dashboard

1. Navigate to `login.html` (unified login page)
2. Use any of the provided admin credentials above
3. System automatically detects admin users and redirects to admin dashboard
4. Regular users are redirected to the main site
5. Session automatically expires after 24 hours

### Login System Features

- **Single Login Page**: One login form for all users
- **Automatic Detection**: System recognizes admin vs regular users
- **Smart Routing**: Admins go to dashboard, users go to main site
- **Session Management**: 24-hour sessions for all user types
- **Role-Based Access**: Different permissions for different admin levels

## 🔒 Security

- **SSL Indicators**: Visual security assurance
- **Privacy Compliance**: Data protection notices
- **Form Validation**: Client-side validation
- **Admin Authentication**: Role-based access control
- **Session Management**: Automatic timeout protection
- **Secure Headers**: Security headers for production

## 🌐 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📞 Support

For technical issues or questions:
- Check browser console for errors
- Verify CDN resources are loading
- Test on different devices
- Contact: support@redcross.org.ph

## 📄 License

This project is for the Philippine Red Cross and follows their branding guidelines.

---

**Ready to deploy!** 🚀