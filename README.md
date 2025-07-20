# THE RARITONE - Luxury AI-Powered Fashion Platform

## Project Overview

THE RARITONE is India's premier luxury AI-powered fashion platform that revolutionizes the way people shop for designer clothing. Our innovative body scanning technology ensures perfect-fit luxury fashion for every customer.

## Features

- **Advanced AI Body Scanning**: Cutting-edge computer vision technology for precise body measurements
- **Perfect Fit Recommendations**: AI-powered luxury sizing recommendations based on your unique measurements
- **Curated Luxury Collection**: Handpicked selection of premium designer fashion items
- **3D Virtual Try-On**: Experience how luxury pieces look on you before purchasing
- **Personalized Luxury Shopping**: AI-driven style recommendations based on your preferences
- **Premium Shopping Experience**: Elegant, responsive web interface with smooth 3D animations and luxury aesthetics

## Technology Stack

This project is built with modern web technologies:

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with luxury design system (Playfair Display + Inter fonts)
- **UI Components**: Radix UI primitives with shadcn/ui
- **Animations**: Framer Motion for smooth 3D interactions and luxury transitions
- **Backend**: Firebase for authentication and data storage
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React Context API
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd theraritone-fashion-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── Navbar.tsx      # Navigation component
│   ├── ProductCard.tsx # Product display component
│   └── ...
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
└── styles/             # Global styles and Tailwind config
```

## Key Features

### AI Body Scanning
- Uses device camera for real-time body measurement
- Processes data locally for privacy
- Provides accurate size recommendations

### Product Catalog
- Responsive grid layout
- Advanced filtering and search
- Real-time inventory management
- Wishlist functionality

### User Experience
- Smooth animations and transitions
- Mobile-first responsive design
- Dark theme with custom color palette
- Accessibility-focused design

### Shopping Features
- Shopping cart with persistent storage
- User authentication with Firebase
- Order history and tracking
- Customer support chat

## Design System

THE RARITONE uses a luxury design system with:
- **Primary Colors**: Warm beige and olive green palette (#F5EEDD, #FFF9E5, #DCD0A8, #004030)
- **Typography**: Playfair Display for headings, Inter for body text
- **Spacing**: 8px grid system
- **Components**: Consistent luxury design patterns with 3D hover effects and premium shadows
- **Animations**: Smooth 3D transforms and elegant transitions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software owned by THE RARITONE Fashion Technologies Pvt. Ltd.

## Contact

- **Website**: [theraritone.in](https://theraritone.in)
- **Email**: hello@theraritone.in
- **Support**: support@theraritone.in
- **Phone**: +91 98765 43210

---

© 2025 THE RARITONE Fashion Technologies Pvt. Ltd. All rights reserved.