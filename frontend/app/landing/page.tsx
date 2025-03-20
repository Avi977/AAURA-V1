import Link from 'next/link';
import Image from 'next/image';
import FAQSection from './components/FAQSection';

export default function Landing() {
  return (
    <div data-theme="dark" className="flex flex-col min-h-screen bg-base-200 text-base-content">
      {/* Header / Navbar */}
      <header className="navbar bg-neutral text-neutral-content px-4 md:px-8 fixed top-0 left-0 w-full z-50 shadow">
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold">A.U.R.A.</Link>
        </div>
        <nav className="flex-none space-x-4 hidden md:inline-block">
          {/* Smooth scrolling requires a bit of JS or a Next.js Link with an anchor. 
              We'll just use plain anchors for demonstration. */}
          <a href="#home" className="btn btn-ghost btn-sm">Home</a>
          <a href="#features" className="btn btn-ghost btn-sm">Features</a>
          <a href="#how-it-works" className="btn btn-ghost btn-sm">How It Works</a>
          <a href="#faq" className="btn btn-ghost btn-sm">FAQ</a>
          <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
        </nav>
      </header>

      <main className="pt-16 px-4 md:px-8 flex-grow">
        {/* Hero Section */}
        <section id="home" className="hero py-12 md:py-20">
          <div className="hero-content flex flex-col lg:flex-row gap-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">AI-Utilized Responsive Assistant</h1>
              <p className="mb-6">
                Experience the future of file management with voice-powered search
                and intelligent organization.
              </p>
              <Link href="/login" className="btn btn-primary">
                Get Started
              </Link>

              {/* Demo Image */}
              <div className="mt-8 flex justify-center">
                <Image  
                  src="/images/homepage.png"
                  alt="AURA Homepage Demo"
                  width={960} // Adjusted width for better scaling
                  height={432} // Maintain proportional height
                  className="rounded shadow-2*1 max-w-full h-auto"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-10 md:py-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="card bg-base-100 shadow p-4">
              <div className="text-3xl mb-2">🎙️</div>
              <h3 className="text-xl font-semibold mb-2">Voice Search</h3>
              <p className="text-sm">
                Search for files using natural language commands and voice recognition.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="card bg-base-100 shadow p-4">
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Smart AI</h3>
              <p className="text-sm">
                AI-powered search understands context and retrieves relevant files.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="card bg-base-100 shadow p-4">
              <div className="text-3xl mb-2">☁️</div>
              <h3 className="text-xl font-semibold mb-2">Cloud Storage</h3>
              <p className="text-sm">
                Secure cloud integration to store and access your files from anywhere.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="card bg-base-100 shadow p-4">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p className="text-sm">
                Robust authentication system to keep your data safe and private.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-10 md:py-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">How It Works?</h2>
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="btn btn-circle bg-primary text-white">1</div>
              <div>
                <h3 className="text-xl font-semibold">Create Your Account</h3>
                <p className="text-sm">
                  Sign up for A.U.R.A. with just a few clicks to get started with your
                  personal voice assistant.
                </p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="btn btn-circle bg-primary text-white">2</div>
              <div>
                <h3 className="text-xl font-semibold">Upload Your Files</h3>
                <p className="text-sm">
                  Easily upload your files to secure cloud storage integrated with A.U.R.A.
                </p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="btn btn-circle bg-primary text-white">3</div>
              <div>
                <h3 className="text-xl font-semibold">Use Voice Commands</h3>
                <p className="text-sm">
                  Simply speak to search for your files using natural language and let A.U.R.A.
                  find what you need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />
        {/* Final CTA Section */}
        <section className="hero py-10 md:py-16">
          <div className="hero-content flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to experience A.U.R.A.?</h2>
            <p className="mb-6">Join us today and transform the way you manage your files.</p>
            <Link href="/login" className="btn btn-primary">
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold text-lg">A.U.R.A.</h3>
            <p>AI-Utilized Responsive Assistant</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Links</h3>
            <ul className="space-y-1">
              <li><a href="#home" className="link link-hover">Home</a></li>
              <li><a href="#features" className="link link-hover">Features</a></li>
              <li><a href="#how-it-works" className="link link-hover">How It Works</a></li>
              <li><a href="#faq" className="link link-hover">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Legal</h3>
            <ul className="space-y-1">
              <li><a href="#" className="link link-hover">Terms of Service</a></li>
              <li><a href="#" className="link link-hover">Privacy Policy</a></li>
              <li><a href="#" className="link link-hover">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <ul className="space-y-1">
              <li><a href="#" className="link link-hover">Support</a></li>
              <li><a href="mailto:contact@aura-app.com" className="link link-hover">contact@aura-app.com</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">&copy; 2025 A.U.R.A. All rights reserved.</div>
      </footer>
    </div>
  );
}
