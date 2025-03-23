export const getAuthHeader = (): HeadersInit => {
    const token = localStorage.getItem("access_token"); // Retrieve token from localStorage
    return token ? { Authorization: `Bearer ${token}` } : {};
};
