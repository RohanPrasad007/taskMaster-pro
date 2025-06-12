# TaskMaster Pro - Modern Task Management Application

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🌟 Features

- **Modern UI/UX**: Beautiful and responsive design with smooth animations and transitions
- **Real-time Task Management**: Create, read, update, and delete tasks seamlessly
- **Advanced Filtering & Sorting**:
  - Filter tasks by priority (High/Medium/Low) and status (In Progress/Completed)
  - Sort tasks by due date (ascending/descending)
  - Search tasks by title
- **Rich Task Properties**:
  - Title and description
  - Due date tracking
  - Priority levels
  - Status tracking
- **Mobile-First Design**: Fully responsive with optimized views for all devices
- **Smooth User Experience**:
  - Interactive modals for task operations
  - Toast notifications for action feedback
  - Loading states and animations
  - Error handling with user-friendly messages

## 🛠️ Technical Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for modern, utility-first styling
- **Context API** for state management
- **SweetAlert2** for beautiful notifications
- **Lucide Icons** for consistent iconography
- **ESLint** for code quality
- **Custom Hooks** for reusable logic

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **RESTful API** architecture
- **CORS** enabled for cross-origin requests
- **Environment Variables** for configuration
- **Error Handling Middleware**

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB installed locally or MongoDB Atlas account
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd task-manager
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   NODE_ENV=development
   ```

4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at `http://localhost:5173/`

## 📱 Mobile Responsiveness

- Adaptive layout for different screen sizes
- Collapsible components for better mobile experience
- Mobile-optimized forms and buttons

## 🔒 Error Handling & Validation

- Input validation on both frontend and backend
- Proper error messages for API failures
- Form validation for required fields
- Type checking with TypeScript

## 🎯 Code Quality Highlights

- **Type Safety**: Comprehensive TypeScript interfaces and types
- **Clean Architecture**: Separation of concerns between frontend and backend
- **Best Practices**:
  - RESTful API design
  - Custom hooks for reusable logic
  - Consistent error handling
  - Environment variable usage
  - Code splitting and lazy loading
- **Modern Development Tools**:
  - ESLint for code linting
  - Prettier for code formatting
  - Hot Module Replacement (HMR)
  - Development mode with debug features

## 🛣️ API Endpoints

```
GET /api/v1/tasks - Get all tasks
POST /api/v1/tasks - Create a new task
GET /api/v1/tasks/:id - Get a single task
PATCH /api/v1/tasks/:id - Update a task
DELETE /api/v1/tasks/:id - Delete a task
```

## 📦 Future Enhancements

1. User Authentication and Authorization
2. Task Categories and Tags
3. Task Comments and Attachments
4. Task Dependencies
5. Email Notifications
6. Dark Mode Theme
7. Task Analytics and Reports
8. Collaborative Features
9. Task Templates
10. Import/Export Functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
