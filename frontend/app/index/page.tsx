'use client'; // Only needed in app router to enable client-side interactivity

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {fetchWithAuth} from "@/utils/api";
import FileUpload from '../components/FileUpload';
// Define the User type based on your expected response structure
interface User {
  username: string;
  email: string;
  // Add other fields as needed
}
export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('Your voice input will appear here...');
  const [user, setUser] = useState<User | null>(null);  // Use the User type here
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);  // Add loading state
  const router=useRouter();
  const handleStartRecording = () => {
    // TODO: Implement actual recording logic
    setIsRecording(true);
    setTranscript('Recording...');
  };

  const handleStopRecording = () => {
    // TODO: Implement logic to stop recording and process transcript
    setIsRecording(false);
    setTranscript('This is where your recorded text would appear.');
  };

  //Ace: adding fetchwithauth
  useEffect(() => {

    async function fetchUser() {
      try {
        const response = await fetchWithAuth("/api/user/"); // Call Django API
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || `Error ${response.status}: Failed to fetch user`);
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        router.push("/login"); // Redirect if not authenticated
      }
    }

    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-theme="dark" className="min-h-screen bg-base-200">
      {/* Header / Navbar */}
      <header className="navbar bg-neutral text-neutral-content fixed top-0 left-0 w-full shadow-md z-50">
        <div className="navbar-start pl-4">
          <span className="text-xl font-bold">A.U.R.A.</span>
        </div>
        <div className="navbar-end pr-4 space-x-2">
          <span className="text-sm">Welcome, {user?.username}</span>
          <button className="btn btn-sm btn-outline">Profile</button>
          <button className="btn btn-sm btn-primary">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 px-4 md:px-8 pb-8">
        {/* VUI Search Assistant Section */}
        <section className="card bg-base-100 shadow-xl p-6 mb-8 m-5">
          <h2 className="text-xl font-semibold mb-4">Voice Search</h2>
          <div className="flex gap-2 mb-4">
            <button
              className="btn btn-accent"
              disabled={isRecording}
              onClick={handleStartRecording}
            >
              Start Recording
            </button>
            <button
              className="btn btn-secondary"
              disabled={!isRecording}
              onClick={handleStopRecording}
            >
              Stop Recording
            </button>
          </div>
          <div className="p-4 bg-base-200 rounded">
            <p>{transcript}</p>
          </div>
        </section>
        {/* File Upload Section */}
        <section className="card bg-base-100 shadow-xl p-6 mb-8 m-5">
          <h2 className="text-xl font-semibold mb-4">Upload Your Files</h2>
          <FileUpload /> {/* Insert the FileUpload component here */}
        </section>

        {/* Folders Grid Section */}
        <section className='m-5'>
          <h2 className="text-xl font-semibold mb-4">Your Files</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow hover:shadow-lg cursor-pointer p-4 flex flex-col items-center">
              <div className="text-4xl mb-2">📁</div>
              <p className="text-center">Documents</p>
            </div>
            <div className="card bg-base-100 shadow hover:shadow-lg cursor-pointer p-4 flex flex-col items-center">
              <div className="text-4xl mb-2">📁</div>
              <p className="text-center">Images</p>
            </div>
            <div className="card bg-base-100 shadow hover:shadow-lg cursor-pointer p-4 flex flex-col items-center">
              <div className="text-4xl mb-2">📁</div>
              <p className="text-center">Music</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
