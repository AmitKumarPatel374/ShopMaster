# 🛍️ ShopMaster — Full Stack E-Commerce Platform

ShopMaster is a scalable full-stack e-commerce application built using the MERN stack ecosystem.  
It delivers a modern online shopping experience with secure authentication, optimized backend architecture, and a modular frontend structure.

---

## 🚀 Live Demo

🌐 Frontend: https://sasta-flipcart.vercel.app/  
🔗 Backend API: (Add deployed backend link if available)

---

# 🏗️ System Architecture

ShopMaster follows a modular full-stack architecture:

- React + Vite frontend
- Node.js + Express backend
- MongoDB database
- JWT-based authentication
- Queue & worker-based background processing
- Redis caching (if enabled)

---

# ✨ Core Features

## 🔐 Authentication & Security
- User registration & login
- JWT-based authentication
- Protected routes
- Secure password reset (email-based, time-bound tokens)
- Request validation & rate limiting

---

## 🛒 E-Commerce Functionalities
- Product listing & filtering
- Cart management
- Order workflow
- Checkout system
- Admin dashboard
- Job/Application-style module (if included)

---

## ⚡ Performance Optimization
- N+1 query issue resolved using MongoDB aggregation pipelines
- Redis caching for faster API response
- Background task processing using queues & workers
- Reduced API latency (~3s → ~100ms)

---

## 🧠 Scalable Architecture
- Controller-Service backend pattern
- Modular folder structure (frontend & backend)
- API abstraction layer
- Reusable UI components
- Context-based state management
- Clean route handling

---

# 🖥️ Frontend Overview

### Tech Stack
- React.js
- Vite
- Context API
- Axios
- React Router
- Tailwind CSS

### Key Structure

```
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── Service/
│   └── config/
```

---

# 🛠️ Backend Overview

### Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Redis
- Worker Threads

### Key Structure

```
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── model/
│   ├── routes/
│   ├── services/
│   ├── queues/
│   ├── workers/
│   └── utils/
```

---

# ⚙️ Local Setup Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/AmitKumarPatel374/ShopMaster.git
cd ShopMaster
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_url
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env` file:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# 📡 API Base URL

```
http://localhost:5000/api
```

---

# 📈 Highlights

- Clean separation of concerns
- Production-oriented backend architecture
- Performance optimization using caching & async processing
- Modular and scalable frontend structure
- Secure authentication flow

---

# 👨‍💻 Author

**Amit Kumar Patel**  
📧 amitpatel9302352967@gmail.com  
🔗 LinkedIn: https://www.linkedin.com/in/amit-kumar-patel-053130316/  
💻 GitHub: https://github.com/AmitKumarPatel374  

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
