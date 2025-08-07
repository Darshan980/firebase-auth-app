// app.js - Shared utility functions and Firebase helpers

// Utility function to format dates
function formatDate(date) {
    if (!date) return 'N/A';
    
    if (date.toDate) {
        // Firestore timestamp
        return date.toDate().toLocaleString();
    } else if (typeof date === 'string') {
        // String date
        return new Date(date).toLocaleString();
    } else if (date instanceof Date) {
        // JavaScript Date object
        return date.toLocaleString();
    }
    
    return 'N/A';
}

// Utility function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function to validate password strength
function validatePassword(password) {
    const errors = [];
    
    if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Password should contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Password should contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
        errors.push('Password should contain at least one number');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Firebase Auth state observer helper
function onAuthStateChange(callback) {
    return auth.onAuthStateChanged(callback);
}

// Create user profile in Firestore
async function createUserProfile(user, additionalData = {}) {
    if (!user) return;
    
    const userRef = db.collection('users').doc(user.uid);
    const snapshot = await userRef.get();
    
    if (!snapshot.exists) {
        const { displayName, email } = user;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user profile:', error);
        }
    }
    
    return userRef;
}

// Get user profile from Firestore
async function getUserProfile(userId) {
    try {
        const userRef = db.collection('users').doc(userId);
        const snapshot = await userRef.get();
        
        if (snapshot.exists) {
            return snapshot.data();
        } else {
            return null;
        }
    } catch (error) {
        console.log('Error getting user profile:', error);
        return null;
    }
}

// Update user profile in Firestore
async function updateUserProfile(userId, data) {
    try {
        const userRef = db.collection('users').doc(userId);
        await userRef.update({
            ...data,
            updatedAt: new Date()
        });
        return true;
    } catch (error) {
        console.log('Error updating user profile:', error);
        return false;
    }
}

// Sign up with email and password
async function signUpWithEmail(email, password, displayName) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Update the user's display name
        if (displayName) {
            await user.updateProfile({
                displayName: displayName
            });
        }
        
        // Create user profile in Firestore
        await createUserProfile(user, {
            name: displayName,
            createdAt: new Date(),
            lastLogin: new Date()
        });
        
        return user;
    } catch (error) {
        throw error;
    }
}

// Sign in with email and password
async function signInWithEmail(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Update last login time
        await updateUserProfile(user.uid, {
            lastLogin: new Date()
        });
        
        return user;
    } catch (error) {
        throw error;
    }
}

// Sign out
async function signOut() {
    try {
        await auth.signOut();
        return true;
    } catch (error) {
        console.log('Error signing out:', error);
        return false;
    }
}

// Send password reset email
async function sendPasswordReset(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        return true;
    } catch (error) {
        throw error;
    }
}

// Send email verification
async function sendEmailVerification(user) {
    try {
        await user.sendEmailVerification();
        return true;
    } catch (error) {
        throw error;
    }
}

// Get current user
function getCurrentUser() {
    return auth.currentUser;
}

// Check if user is authenticated
function isAuthenticated() {
    return !!auth.currentUser;
}

// Redirect to login if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Common error messages for Firebase Auth
function getFirebaseErrorMessage(errorCode) {
    const errorMessages = {
        'auth/user-not-found': 'No account found with this email address.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/weak-password': 'Password is too weak. Please choose a stronger password.',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/requires-recent-login': 'For security reasons, please log out and log back in to perform this action.',
        'auth/network-request-failed': 'Network error. Please check your internet connection.',
        'auth/invalid-credential': 'Invalid credentials provided.',
        'auth/credential-already-in-use': 'This credential is already associated with a different user account.'
    };
    
    return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
}

// Show loading state
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

// Hide loading state
function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
    }
}

// Show success message
function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
    }
}

// Hide message
function hideMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Firebase Auth App initialized');
    
    // Global error handler for unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
    });
});

// Export functions for use in other files
window.AppUtils = {
    formatDate,
    isValidEmail,
    validatePassword,
    onAuthStateChange,
    createUserProfile,
    getUserProfile,
    updateUserProfile,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    sendPasswordReset,
    sendEmailVerification,
    getCurrentUser,
    isAuthenticated,
    requireAuth,
    getFirebaseErrorMessage,
    showLoading,
    hideLoading,
    showError,
    showSuccess,
    hideMessage
};