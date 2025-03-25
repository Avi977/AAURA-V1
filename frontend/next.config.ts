import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_BACKEND_URL: "http://localhost:8000", // Set your Django backend URL here
  },
};

export default nextConfig;
