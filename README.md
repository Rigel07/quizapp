# Quiz App - Interactive Quiz Platform

A modern, responsive quiz application built with React that allows users to create, manage, and take interactive quizzes with real-time scoring and user authentication.

## ✨ Features

### Core Functionality
- **User Authentication**: Secure login/logout with Firebase Authentication
- **Quiz Creation**: Intuitive interface to create custom quizzes with multiple-choice questions
- **Quiz Management**: Edit, delete, and organize your created quizzes
- **Interactive Quiz Taking**: Smooth quiz experience with progress tracking
- **Real-time Scoring**: Instant feedback and score calculation
- **User Dashboard**: Personal dashboard to manage all your quizzes

### User Experience
- **Responsive Design**: Fully responsive with mobile-first approach
- **Dark/Light Theme**: Toggle between light and dark themes
- **Mobile Navigation**: Professional burger menu for mobile devices
- **Progress Tracking**: Visual progress indicators during quiz taking
- **Question Navigation**: Easy navigation between quiz questions

### Technical Features
- **CSS Modules**: Component-scoped styling with CSS custom properties
- **Theme System**: Automatic theme switching with CSS variables
- **Route Protection**: Private routes for authenticated users
- **Error Handling**: Comprehensive error handling and user feedback
- **Hot Module Replacement**: Fast development with Vite HMR

## 📱 Screenshots

*Screenshots and demo links will be added here*

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **React Router DOM 7.4** - Client-side routing and navigation
- **CSS Modules** - Component-scoped styling
- **CSS Custom Properties** - Theme system and design tokens
- **Bootstrap 5.3** - Grid system and utilities
- **Vite 6.2** - Fast build tool and development server

### Backend & Database
- **Firebase 11.5** - Authentication and Firestore database
- **Firebase Admin 13.2** - Server-side Firebase operations

### Development Tools
- **ESLint 9.21** - Code linting and formatting
- **Concurrently 9.1** - Run multiple commands simultaneously
- **Nodemon 3.1** - Development server auto-restart

### Styling Architecture
- **CSS Modules** - Scoped component styling
- **CSS Custom Properties** - Theme variables and design system
- **Mobile-First Design** - Responsive breakpoints and layouts

## 🚀 Installation

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **Firebase Account** (for authentication and database)

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rigel07/quizapp.git
   cd quizapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password provider)
   - Enable Firestore Database
   - Copy your Firebase configuration

4. **Environment Configuration**
   - Copy the environment example file:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your Firebase configuration:
     ```bash
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
     ```

5. **Configure Firestore Database Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read/write access to authenticated users for their own data
       match /quizzes/{quizId} {
         allow read, write, delete: if request.auth != null;
       }
       match /questions/{questionId} {
         allow read, write, delete: if request.auth != null;
       }
     }
   }
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Navigate to `http://localhost:5174`
   - Start creating and taking quizzes!

## 📁 Project Structure

```
quizapp/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── PrivateRoute.jsx
│   ├── context/           # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── controllers/       # Business logic controllers
│   │   └── quizController.js
│   ├── firebase/         # Firebase configuration
│   │   └── config.js
│   ├── models/           # Data models and Firebase operations
│   │   └── quizModel.js
│   ├── pages/            # Page components (routes)
│   │   ├── AuthPage.jsx
│   │   ├── CreateQuiz.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditQuiz.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── QuizPage.jsx
│   ├── routes/           # API routes configuration
│   │   └── apiRoutes.js
│   ├── styles/           # CSS Modules and styling
│   │   ├── AuthPage.module.css
│   │   ├── CreateQuiz.module.css
│   │   ├── Dashboard.module.css
│   │   ├── EditQuiz.module.css
│   │   ├── Footer.module.css
│   │   ├── Home.module.css
│   │   ├── Navbar.module.css
│   │   ├── NotFound.module.css
│   │   ├── QuizPage.module.css
│   │   └── ThemeStyles.js
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles and CSS variables
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── README.md           # Project documentation
└── vite.config.js      # Vite configuration
```

## 🎯 Usage

### Creating a Quiz
1. **Sign up or log in** to your account
2. **Navigate to "Create Quiz"** from the navigation menu
3. **Fill in quiz details** (title and optional description)
4. **Add questions** with multiple-choice options
5. **Specify correct answers** for each question
6. **Save your quiz** to make it available for taking

### Taking a Quiz
1. **Browse available quizzes** on the home page or dashboard
2. **Click on a quiz** to start taking it
3. **Answer questions** by selecting your choice
4. **Navigate between questions** using Previous/Next buttons
5. **Submit the quiz** to see your score and results

### Managing Quizzes
1. **Access your dashboard** to see all your created quizzes
2. **Edit existing quizzes** by clicking the edit button
3. **Delete quizzes** you no longer need
4. **View quiz statistics** and performance metrics

## 🎨 Theming

The application features a comprehensive theming system built with CSS custom properties:

- **Light Theme**: Clean, bright interface for daytime use
- **Dark Theme**: Easy-on-the-eyes dark mode for low-light environments
- **Automatic Switching**: Toggle between themes with the theme button
- **Consistent Colors**: All components automatically adapt to theme changes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Live Demo**: [Add your deployed app URL here]
- **Repository**: [https://github.com/Rigel07/quizapp](https://github.com/Rigel07/quizapp)
- **Issues**: [Report bugs or request features](https://github.com/Rigel07/quizapp/issues)

## 👨‍💻 Author

**Rigel07** - [GitHub Profile](https://github.com/Rigel07)

---

Made with ❤️ using React and Firebase
