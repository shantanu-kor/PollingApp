export const authHeader = () => { return { Authorization: localStorage.getItem('token') } };

export const toastOptions = { duration: 1500 };