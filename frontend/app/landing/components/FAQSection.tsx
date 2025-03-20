'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What is A.U.R.A.?",
    answer: "A.U.R.A. (AI-Utilized Responsive Assistant) is a web application that combines voice recognition with AI to help you manage and find your files using natural language commands.",
  },
  {
    question: "How secure is my data with A.U.R.A.?",
    answer: "A.U.R.A. uses enterprise-grade security measures to protect your data. All files are encrypted and stored securely in the cloud, and our authentication system ensures only you have access.",
  },
  {
    question: "What file types does A.U.R.A. support?",
    answer: "A.U.R.A. supports all common file types including documents, images, music, videos, and more. Our AI can help you find any type of file in your storage.",
  },
  {
    question: "Can I use A.U.R.A. on my mobile device?",
    answer: "Yes! A.U.R.A. is fully responsive and works on both desktop and mobile devices.",
  },
  {
    question: "Is A.U.R.A. free to use?",
    answer: "A.U.R.A. offers both free and premium plans. The free version includes basic features, while the premium plan unlocks advanced AI-powered file management capabilities.",
  }
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 md:py-16">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">FAQ</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-base-100 shadow rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-lg font-medium bg-base-100 text-left rounded-lg focus:outline-none hover:bg-base-300"
            >
              {faq.question}
              <span className="text-primary text-xl">
                {openFAQ === index ? '−' : '+'}
              </span>
            </button>
            {openFAQ === index && (
              <div className="p-4 text-gray-300">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
