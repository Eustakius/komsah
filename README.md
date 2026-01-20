# 🌾 KOMSAH - Modern Agricultural E-Commerce Platform

<div align="center">

![KOMSAH Banner](https://via.placeholder.com/1200x300/16a34a/ffffff?text=KOMSAH+Agricultural+Platform)

**A cutting-edge full-stack e-commerce platform for organic fertilizers with stunning 3D visualizations**

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 📖 About

**KOMSAH** is a modern, full-stack e-commerce platform designed specifically for the agricultural sector, focusing on organic fertilizers and soil health products. The platform combines powerful backend capabilities with an immersive 3D frontend experience, making agricultural product shopping both informative and engaging.

### 🎯 Project Goals

- Provide farmers with easy access to quality organic fertilizers
- Educate users about proper fertilizer usage through interactive tools
- Create an engaging shopping experience with 3D product visualization
- Support sustainable agriculture through organic product promotion

---

## ✨ Features

### 🎨 Frontend Features

#### **3D Visualization & Animation**
- **Interactive 3D Product Viewer**: Rotate and zoom products using WebGL-powered 3D models
- **Animated Agricultural Scene**: Full-screen 3D hero with swaying plants, floating particles, and natural lighting
- **3D Tilt Cards**: Mouse-tracking product cards with realistic depth effects
- **Smooth Animations**: Framer Motion-powered transitions and scroll animations

#### **User Experience**
- **Fertilizer Calculator**: Interactive tool to calculate optimal fertilizer dosage based on land area, crop type, and soil condition
- **Product Catalog**: Advanced filtering and search with beautiful card layouts
- **Shopping Cart**: Persistent cart with real-time updates
- **Testimonials & Blog**: Customer success stories and agricultural tips
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop

#### **Visual Design**
- **Comfortable Agricultural Theme**: Clean white/green/earth tones for easy reading
- **Glassmorphism Effects**: Modern frosted glass UI elements
- **Custom Animations**: Staggered reveals, parallax scrolling, and micro-interactions
- **Professional Typography**: Inter font family for clarity and elegance

### 🔧 Backend Features

#### **API & Database**
- **RESTful API**: Laravel 12 with comprehensive endpoints
- **Authentication**: Laravel Sanctum for secure token-based auth
- **Database**: MySQL with optimized schema and relationships
- **API Resources**: Structured JSON responses with BlogResource, ProductResource, etc.

#### **E-Commerce Functionality**
- **Product Management**: CRUD operations for products with categories
- **Order Processing**: Complete order lifecycle management
- **User Management**: Registration, login, profile updates
- **Admin Dashboard**: Product and order management interface

#### **Data Management**
- **Database Seeding**: Pre-populated data for products, blogs, and testimonials
- **Migrations**: Version-controlled database schema
- **Soft Deletes**: Safe data removal with recovery options

---

## 🚀 Demo

### Live Application
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000`
- **API Documentation**: `http://localhost:8000/api/documentation` *(if configured)*

### Screenshots

<details>
<summary>Click to view screenshots</summary>

#### Home Page - 3D Hero
![Home Page](https://via.placeholder.com/800x500/16a34a/ffffff?text=3D+Hero+Section)

#### Product Catalog - 3D Tilt Cards
![Product List](https://via.placeholder.com/800x500/16a34a/ffffff?text=Product+Catalog)

#### Product Detail - Interactive 3D Viewer
![Product Detail](https://via.placeholder.com/800x500/16a34a/ffffff?text=3D+Product+Viewer)

#### Fertilizer Calculator
![Calculator](https://via.placeholder.com/800x500/16a34a/ffffff?text=Fertilizer+Calculator)

</details>

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | Core UI framework |
| **React Router** | Client-side routing |
| **React Three Fiber** | 3D rendering (WebGL) |
| **@react-three/drei** | 3D helpers and controls |
| **Framer Motion** | Advanced animations |
| **Tailwind CSS** | Utility-first styling |
| **Vite** | Build tool and dev server |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Laravel 12** | PHP framework |
| **MySQL** | Relational database |
| **Laravel Sanctum** | API authentication |
| **Eloquent ORM** | Database abstraction |
| **Laravel Resources** | API transformation |

### DevOps & Tools
- **Git** - Version control
- **Composer** - PHP dependency management
- **npm** - Node package management
- **LocalTunnel** - Public URL tunneling

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:
- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 20.0
- **MySQL** >= 8.0
- **Git**

### Step 1: Clone Repository

```bash
git clone https://github.com/Eustakius/komsah.git
cd komsah
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd komsah-api

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
# DB_DATABASE=komsah
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run migrations and seed database
php artisan migrate:fresh --seed

# Start Laravel development server
php artisan serve --host=0.0.0.0 --port=8000
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd komsah-frontend

# Install Node dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api/v1" > .env

# Start Vite development server
npm run dev
```

### Step 4: Run Both Servers (Alternative)

From the project root, use the convenience script:

```bash
chmod +x dev.sh
./dev.sh
```

This will start both backend and frontend servers concurrently.

---

## 🎮 Usage

### Accessing the Application

1. **Frontend**: Open `http://localhost:5173` in your browser
2. **Backend API**: Available at `http://localhost:8000/api/v1`

### Default Credentials

After seeding, you can use these test accounts:

```
Admin Account:
Email: admin@komsah.com
Password: password

User Account:
Email: user@komsah.com
Password: password
```

### Key Features to Explore

1. **3D Product Viewer**: Navigate to any product detail page and interact with the 3D model
2. **Fertilizer Calculator**: Visit `/calculator` to calculate fertilizer dosage
3. **Shopping Cart**: Add products and proceed to checkout
4. **Blog & Testimonials**: Read agricultural tips and customer stories

---

## 📁 Project Structure

```
komsah/
├── komsah-api/              # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── API/     # API Controllers
│   │   │   └── Resources/   # API Resources
│   │   └── Models/          # Eloquent Models
│   ├── database/
│   │   ├── migrations/      # Database Migrations
│   │   └── seeders/         # Database Seeders
│   ├── routes/
│   │   └── api.php          # API Routes
│   └── config/              # Configuration Files
│
├── komsah-frontend/         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/          # 3D Components
│   │   │   ├── calculator/  # Calculator Component
│   │   │   ├── layout/      # Layout Components
│   │   │   └── ui/          # UI Components
│   │   ├── pages/           # Page Components
│   │   ├── context/         # React Context
│   │   ├── api/             # API Client
│   │   └── App.jsx          # Main App Component
│   ├── public/              # Static Assets
│   └── package.json         # Node Dependencies
│
├── dev.sh                   # Development Script
└── README.md                # This File
```

---

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products` | List all products |
| GET | `/api/v1/products/{slug}` | Get product details |
| GET | `/api/v1/blogs` | List blog posts |
| GET | `/api/v1/testimonials` | List testimonials |
| POST | `/api/v1/register` | User registration |
| POST | `/api/v1/login` | User login |

### Protected Endpoints (Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/user` | Get authenticated user |
| POST | `/api/v1/orders` | Create new order |
| GET | `/api/v1/orders` | List user orders |
| POST | `/api/v1/logout` | Logout user |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/admin/products` | Create product |
| PUT | `/api/v1/admin/products/{id}` | Update product |
| DELETE | `/api/v1/admin/products/{id}` | Delete product |

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-green: #16a34a;      /* Fresh Leaf Green */
--earth-brown: #92400e;        /* Rich Soil */
--sky-blue: #0ea5e9;           /* Clear Sky */
--sunshine-yellow: #fbbf24;    /* Warm Sun */

/* Neutral Colors */
--white: #ffffff;              /* Clean Background */
--soft-gray: #f3f4f6;          /* Subtle Surfaces */
--dark-gray: #1f2937;          /* Text */
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, 2xl-7xl
- **Body Text**: Regular, base-xl
- **Accents**: Semibold, uppercase tracking

---

## 🧪 Testing

### Run Backend Tests

```bash
cd komsah-api
php artisan test
```

### Run Frontend Tests

```bash
cd komsah-frontend
npm run test
```

---

## 🚢 Deployment

### Backend Deployment (Laravel)

1. Set up production environment variables
2. Run migrations: `php artisan migrate --force`
3. Optimize configuration: `php artisan config:cache`
4. Optimize routes: `php artisan route:cache`

### Frontend Deployment (React)

1. Build production bundle: `npm run build`
2. Deploy `dist/` folder to static hosting (Vercel, Netlify, etc.)
3. Update `VITE_API_URL` to production API URL

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Eustakius**
- GitHub: [@Eustakius](https://github.com/Eustakius)
- Project Link: [https://github.com/Eustakius/komsah](https://github.com/Eustakius/komsah)

---

## 🙏 Acknowledgments

- **Laravel Team** - For the amazing PHP framework
- **React Team** - For the powerful UI library
- **Three.js Community** - For 3D rendering capabilities
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations

---

## 📞 Support

For support, email eustakius@example.com or open an issue on GitHub.

---

<div align="center">

**Made with ❤️ for Indonesian Farmers**

⭐ Star this repo if you find it helpful!

</div>
