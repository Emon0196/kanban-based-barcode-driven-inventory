# 📦 Barcode-Driven Inventory Kanban System

A modern, full-stack inventory management system that supports **barcode scanning**, **drag-and-drop Kanban categorization**, **analytics dashboard**, and **MongoDB integration**. Built with **Next.js 15**, **Tailwind CSS**, and **Zustand**.

---

## ✨ Features

### 🔍 Barcode Scanning
- Scan a product barcode using an image input
- Fetch product details from external API:  
  `https://products-test-aci.onrender.com/product/[barcode]`
- Auto-fill product name on success

### 🗂️ Kanban Board
- View products by category in a responsive drag-and-drop board
- Dynamically create new categories
- Move products between categories
- Product data is persisted in MongoDB

### 📊 Dashboard & Analytics
- Charts show product distribution by category
- Built with `Recharts` for responsiveness

### 🔐 Authentication (Optional)
- GitHub/Google login via NextAuth (optional setup)

---

## 🧠 Tech Stack

| Tech                 | Purpose                                  |
|----------------------|-------------------------------------------|
| **Next.js 15**       | React framework with SSR/API routes       |
| **Tailwind CSS v4**  | Utility-first modern CSS styling          |
| **Zustand**          | Global state management (products, UI)    |
| **@zxing/browser**   | Decode barcode images easily              |
| **dnd-kit**          | Lightweight drag-and-drop system          |
| **MongoDB + Mongoose**| Flexible database for products            |
| **Recharts**         | Responsive charts for analytics           |
| **Vercel**           | Deployment platform                       |

---

## ⚙️ Getting Started

### ✅ Prerequisites
- Node.js 18+
- MongoDB URI (e.g., from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 🛠 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Emon0196/kanban-based-barcode-driven-inventory.git
2. **Install dependencies**
   ```bash
   npm install
   
### 🛠 Login Credential
   - username = "admin" 
   - password = "admin123"

## Must use your own environment variables to run the project. For this, check out the .env.local file for reference.

### Vercel live server link
   ```bash
   https://kanban-based-barcode-driven-invento.vercel.app/
