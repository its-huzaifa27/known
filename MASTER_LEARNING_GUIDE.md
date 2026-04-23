# 🚀 The Ultimate MERN Build Guide: "Known" App

This guide is designed for anyone who wants to build a professional Full-Stack application from scratch. It explains every file, every logic block, and every step in plain English.

---

## ⚡ Phase 0: Step-by-Step Terminal Commands
If you are starting from a blank folder, run these commands in order:

### **1. Setup the Folders**
```bash
mkdir my-app
cd my-app
mkdir server
mkdir client
```

### **2. Setup the Backend (Server)**
```bash
cd server
npm init -y
npm install express mongoose jsonwebtoken bcrypt cors dotenv express-async-handler
npm install --save-dev nodemon
```

### **3. Setup the Frontend (Client)**
```bash
# Go back to root first
cd .. 
cd client
npm create vite@latest . -- --template react
npm install axios tailwindcss lucide-react
```

---

## 📁 1. Project Architecture
To build this app, you need two main folders: `server` (Backend) and `client` (Frontend).

### **Core Dependencies**
**Server:** `express`, `mongoose` (Database), `jsonwebtoken` (Auth), `bcrypt` (Security), `cors`, `dotenv`.
**Client:** `react`, `axios` (API calls), `tailwindcss` (Design), `vite`.

---

## 🛠️ 2. The Backend (The Brain)

### **Step 1: Database Connection**
In `server/config/db.js`, we connect to MongoDB.
- **Logic:** Use `mongoose.connect(process.env.MONGO_URI)`.
- **Why?** This is the bridge between your code and your data.

### **Step 2: Models (The Blueprint)**
In `server/models/`, we define how our data looks.
- **User Model:** Stores `email` and `password`.
- **Contact Model:** Stores `name`, `phone`, `email`, and a `userId` (to know who owns the contact).
- **Why?** Mongoose needs to know what fields are allowed in the database.

### **Step 3: Authentication (The Gatekeeper)**
In `server/middlewares/auth.js`, we create a function to check if a user is logged in.
- **Method:** `jwt.verify(token, secret)`.
- **Step:** It looks at the "Authorization" header. If the token is valid, it lets the user pass. If not, it blocks them.

---

## ⚛️ 3. The Frontend (The Face)

### **Step 1: AuthContext (Login Memory)**
In `client/src/context/AuthContext.jsx`, we manage the login state globally.
- **Feature:** `localStorage.setItem('token', data.token)`.
- **Detailed Step:** 
  1. User logs in. 
  2. Server sends a JWT token. 
  3. We save it in the browser's memory (`localStorage`).
  4. Now the user stays logged in even if they refresh!

### **Step 2: DashboardContext (State Management)**
This is where all the "Contacts" and "Groups" are stored.
- **Method:** `useReducer`.
- **How to Build it:**
  - Define an **Initial State** (empty arrays).
  - Create a **Reducer Function** that handles "Actions" like `SET_CONTACTS` or `DELETE_CONTACT`.
  - Use `DashboardProvider` to wrap your app so every page can access this data.

---

## 📱 4. Key Features (Detailed Steps)

### **A. Login Feature (JWT)**
1. **Frontend:** User clicks "Login" -> `axios.post('/api/users/login', credentials)`.
2. **Backend:** Server finds user -> checks password with `bcrypt.compare()` -> sends back a JWT token.
3. **Frontend:** Store token -> redirect to Dashboard.

### **B. CRUD Feature (Create, Read, Update, Delete)**
Example: **Deleting a Contact**
1. **Button Click:** `handleDelete(id)`.
2. **Confirmation:** `if(window.confirm("Are you sure?"))`.
3. **API Call:** `axios.delete('/api/contacts/' + id, { headers: { Authorization: token } })`.
4. **UI Update:** `dispatch({ type: 'UPDATE_COLLECTION', payload: filteredContacts })`.

### **C. Bulk Import (Magic Parsing)**
How do we import 100 contacts from a file?
1. **File Reader:** Use `new FileReader().readAsText(file)`.
2. **Regex (Parsing):** 
   - We look for lines starting with `FN:` (Full Name) in VCF files.
   - We use `.split(',')` for CSV files.
3. **Preview:** Show the user a table of what we found.
4. **Save:** `axios.post('/api/contacts/bulk', data)`.

---

## 🎨 5. Design & Theming (Tailwind)

### **Dark Mode Implementation**
1. **State:** Use `ThemeContext` to track `light` vs `dark`.
2. **Persistence:** Save the preference to `localStorage`.
3. **Tailwind Classes:** Use the `dark:` prefix. 
   - Example: `<div className="bg-white dark:bg-slate-950">`.

---

## 🚀 6. How to Build it (Your TODO List)
1. **Initialize:** `npm init` in server and `npm create vite` in client.
2. **Connect DB:** Setup MongoDB Atlas and add the URI to `.env`.
3. **Create Auth:** Build the Login/Register API and the `AuthContext` on the frontend.
4. **Build Dashboard:** Create the `DashboardContext` and the `MainArea` routing.
5. **Add Features:** Start with "Create Contact," then "List Contacts," then the others.
6. **Style:** Add Tailwind CSS to make it look premium.

---
*This file is your companion. Every time you are stuck, look at the "Detailed Step" sections above to understand the flow.*
