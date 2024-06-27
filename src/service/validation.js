export const validateEmailAndPassword = (email, password) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
}

export const validateRegistrationData = (userData) => {
    const { uid, name, email, password } = userData;
    if (!uid || !name || !email || !password) {
        throw new Error('uid, name, email, and password are required');
    }
}