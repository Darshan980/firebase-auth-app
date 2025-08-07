# 🔐 Firebase Authentication App

A complete, secure authentication system built with **Firebase Authentication** featuring user registration, login, logout, email verification, and password reset functionality.

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## 🚀 Live Demo

[View Live Demo](https://your-username.github.io/firebase-auth-app) 

## ✨ Features

### 🔐 Core Authentication
- **User Registration** - Secure signup with email/password
- **User Login** - Firebase-powered authentication
- **User Logout** - Secure session termination
- **Protected Routes** - Dashboard accessible only to authenticated users
- **Form Validation** - Client-side validation with user-friendly error messages

### 📧 Email Features
- **Email Verification** - Send verification emails to new users
- **Password Reset** - Reset forgotten passwords via email
- **Real Email Delivery** - Actual emails sent to user's inbox (not just alerts)

### 👤 User Management
- **Profile Updates** - Users can update their display names
- **Account Information** - View account creation date, email status
- **Account Deletion** - Allow users to permanently delete their accounts

### 🎨 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Clean, professional interface with smooth animations
- **Loading States** - Visual feedback during authentication processes
- **Error Handling** - Comprehensive error messages for all scenarios

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Authentication**: Firebase Authentication
- **Hosting**: GitHub Pages (or any static hosting)
- **Design**: Custom CSS with Flexbox/Grid

## 📁 Project Structure

```
firebase-auth-app/
├── index.html              # Login page
├── signup.html             # User registration
├── dashboard.html          # Protected user dashboard
├── profile.html            # User profile management
├── style.css              # Global styles and responsive design
├── app.js                 # Utility functions and helpers
├── firebase-config.js     # Firebase configuration
└── README.md              # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- A Firebase project with Authentication enabled
- Modern web browser
- Text editor or IDE

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/firebase-auth-app.git
   cd firebase-auth-app
   ```

2. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable **Authentication** → **Email/Password** provider

3. **Configure Firebase**
   - Copy `firebase-config.example.js` to `firebase-config.js`
   - Go to Firebase Console → Project Settings → General → Your apps
   - Copy your Firebase config and replace the placeholders in `firebase-config.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```
   
   ⚠️ **Important**: Never commit `firebase-config.js` to version control as it contains sensitive API keys!

4. **Launch the app**
   - Open `index.html` in your browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

5. **Access the application**
   - Navigate to `http://localhost:8000`
   - Create an account and start using the app!

## ⚙️ Firebase Setup Guide

### 1. Enable Authentication
1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Save changes

### 2. Configure Email Templates (Optional)
1. Go to **Authentication** → **Templates**
2. Customize email verification and password reset templates
3. Set your app name and customize messages

### 3. Set Authorized Domains
1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add your domain (for production)
3. `localhost` is automatically authorized for development

## 🎯 Usage

### For Users
1. **Sign Up**: Create a new account with email and password
2. **Verify Email**: Check your inbox for verification email
3. **Login**: Access your secure dashboard
4. **Profile**: Update your display name and account settings
5. **Security**: Reset password or delete account if needed

### For Developers
- All authentication logic is handled by Firebase
- Client-side validation provides immediate feedback
- Responsive design works on all devices
- Easy to customize and extend

## 🔒 Security Features

- **Firebase Security**: Leverages Google's enterprise-grade security
- **Protected Routes**: Unauthorized users are redirected to login
- **Email Verification**: Optional email verification for new accounts
- **Password Validation**: Minimum 6 characters required
- **Error Handling**: Secure error messages that don't leak information
- **Session Management**: Automatic logout on session expiry

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers



## 🐛 Known Issues

- Email delivery may be delayed (check spam folder)
- Some email providers may block Firebase emails initially
- Account deletion requires recent login for security

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

