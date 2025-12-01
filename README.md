# 🛍️ MERN E-Commerce Platform

> A modern, full-stack e-commerce solution built for scalability and performance.

![Project Banner](https://github.com/user-attachments/assets/3107f095-3e37-4f64-a9d9-cae5747261de) _<!-- Replace with actual screenshot -->_

## 🚀 Overview

Welcome to the **MERN E-Commerce Platform**! This project is a comprehensive online shopping solution designed to provide a seamless experience for customers and a powerful management interface for administrators. Built with the robust **MERN stack** (MongoDB, Express.js, React, Node.js), it leverages modern tools like **Vite**, **Tailwind CSS v4**, and **Framer Motion** for a sleek, responsive UI.

Whether you're looking to browse products, manage inventory, or process payments securely, this platform has you covered.

## ✨ Key Features

### 🛒 For Customers (Frontend)

- **Responsive Design**: Beautifully crafted UI that works on all devices.
- **Product Browsing**: Advanced filtering, sorting, and search capabilities.
- **Secure Authentication**: User registration and login with JWT.
- **Shopping Cart**: Real-time cart management.
- **Checkout & Payments**: Integrated with **Stripe**, **Razorpay**, and **Xendit** for secure transactions.
- **Order History**: View past orders and status updates.

### 🛡️ For Administrators (Admin Panel)

- **Dashboard**: Overview of sales, orders, and user statistics.
- **Product Management**: Add, edit, and delete products with image uploads (Cloudinary).
- **Order Management**: Process orders and update delivery statuses.
- **User Management**: View and manage customer accounts.

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt
- **Image Storage**: Cloudinary
- **Payments**: Xendit

### Frontend & Admin

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4, CLSX, Tailwind Merge
- **Animations**: Framer Motion
- **State Management**: React Context / Hooks
- **HTTP Client**: Axios
- **Notifications**: React Toastify

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/mern-ecommerce.git
    cd mern-ecommerce
    ```

2.  **Install Dependencies**
    You need to install dependencies for Backend, Frontend, and Admin separately.

    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install

    # Admin
    cd ../admin
    npm install
    ```

### 3. Environment Variables

Create a `.env` file in the `backend` directory with the following credentials:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_key
# Add other payment gateway keys as needed
```

### 4. Running the Application

Open three separate terminals:

**Terminal 1: Backend**

```bash
cd backend
npm run server
```

**Terminal 2: Frontend**

```bash
cd frontend
npm run dev
```

**Terminal 3: Admin Panel**

```bash
cd admin
npm run dev
```

## 📸 Screenshots

|                          Home Page                          |                          Product Details                          |
| :---------------------------------------------------------: | :---------------------------------------------------------------: |
| ![Home](https://github.com/user-attachments/assets/3107f095-3e37-4f64-a9d9-cae5747261de) | ![Product](https://github.com/user-attachments/assets/7ddde1c7-1ff0-477d-9611-71a137480f72) |

|                          Admin Dashboard                           |                              Cart                               |
| :----------------------------------------------------------------: | :-------------------------------------------------------------: |
| ![Admin](https://github.com/user-attachments/assets/dcf4abf4-5094-4573-b222-acc28c718a23) | ![Cart](https://github.com/user-attachments/assets/a6980066-684b-4d0c-ad3a-0dca3e49ba8d))

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
