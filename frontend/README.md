# 🛍️ ShopMaster — Frontend (React + Vite)

ShopMaster is a scalable e-commerce frontend application built using React and Vite.  
It provides a modern shopping experience with authentication flows, product browsing, cart management, and structured state handling.

> ⚡ This repository contains only the frontend application.

---

## 🚀 Live Demo

🔗 https://sasta-flipcart.vercel.app/

---

# ✨ Features

## 🔐 Authentication System
- User Registration & Login
- JWT-based session handling
- Protected routes
- Persistent login state management

---

## 🛒 Cart Management
- Add to Cart / Remove from Cart
- Quantity update
- Cart state synchronization
- Dynamic total price calculation

---

## 🔎 Product Browsing & Filtering
- Product listing page
- Category-based filtering
- Search functionality
- Responsive product grid layout

---

## 💳 Checkout & Order Flow
- Order summary preview
- Secure payment flow integration (UI level)
- Order confirmation handling

---

## 🧠 State Management & Architecture
- Centralized state management using Context API
- Modular folder structure
- Separated API layer
- Reusable UI components
- Clean routing structure

---

# 🏗️ Tech Stack

- React.js
- Vite
- Context API
- Axios
- Tailwind CSS
- React Router DOM

---

# 📂 Folder Structure

```
frontend/
│
├── public/                # Static assets
│
├── src/
│   ├── api/               # API configuration & request setup
│   ├── assets/            # Images, icons, static resources
│   ├── components/        # Reusable UI components
│   ├── config/            # Application-level configurations
│   ├── context/           # Global state management (Context API)
│   ├── hooks/             # Custom reusable hooks
│   ├── layouts/           # Layout wrappers (Navbar, Footer, etc.)
│   ├── pages/             # Page-level components
│   ├── routes/            # Route definitions & protected routing
│   ├── Service/           # API service abstraction layer
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
│
├── .env                   # Environment variables
├── vite.config.js         # Vite configuration
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AmitKumarPatel374/ShopMaster.git
```

### 2️⃣ Navigate to frontend folder

```bash
cd frontend
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run development server

```bash
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the frontend directory:

```
VITE_API_BASE_URL=your_backend_api_url
```

---

# 🧩 Architectural Highlights

- Feature-separated folder structure
- Clear separation of concerns (UI, services, routes, state)
- Scalable component-based design
- API abstraction layer for maintainability
- Route-level access control
- Optimized rendering with reusable components

---

# 👨‍💻 Author

**Amit Kumar Patel**  
📧 amitpatel9302352967@gmail.com  
🔗 LinkedIn: https://www.linkedin.com/in/amit-kumar-patel-053130316/  
💻 GitHub: https://github.com/AmitKumarPatel374  

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
