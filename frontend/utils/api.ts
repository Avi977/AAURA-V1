import { getAuthHeader } from "@/utils/auth";

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;  // Ensure this is defined
    if (!backendUrl) {
        console.error("NEXT_PUBLIC_BACKEND_URL is not set!");
        throw new Error("Missing NEXT_PUBLIC_BACKEND_URL in .env.local");
    }

    const headers = {
        ...getAuthHeader(),
        "Content-Type": "application/json",
        ...options.headers,
    };

    const url = `${backendUrl}${endpoint}`;
  

    const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
    });

    if (!response.ok) {
        console.error(`Error ${response.status}: ${response.statusText}`);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
};
