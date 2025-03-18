'use client'; // Only needed in app router to enable client-side interactivity

import React, { useState } from 'react';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('Your voice input will appear here...');

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

  return (
    <div data-theme="dark" className="min-h-screen bg-base-200">
      {/* Header / Navbar */}
      <header className="navbar bg-neutral text-neutral-content fixed top-0 left-0 w-full shadow-md z-50">
        <div className="navbar-start pl-4">
          <span className="text-xl font-bold">A.U.R.A.</span>
        </div>
        <div className="navbar-end pr-4 space-x-2">
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
