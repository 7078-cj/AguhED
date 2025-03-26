import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaComments, FaEnvelope } from 'react-icons/fa';

const Help = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    console.log('Feedback submitted:', { category: selectedCategory, text: feedbackText });
    setFeedbackText('');
    setSelectedCategory('general');
  };

  return (
    <div className="min-h-screen bg-[#031716] pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-[#e8eaed] mb-12 text-center"
        >
          Help & Support
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* FAQs Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#2c2c2c] p-6 rounded-lg border border-[#0c959b33]">
            <div className="flex items-center gap-3 mb-6">
              <FaQuestionCircle className="text-[#0c959b] text-2xl" />
              <h2 className="text-2xl font-semibold text-[#e8eaed]">FAQs</h2>
            </div>
            <div className="space-y-6">
              <div className="border-b border-[#0c959b33] pb-4">
                <h3 className="text-[#e8eaed] font-medium mb-2">How do I start a presentation?</h3>
                <p className="text-gray-400">Navigate to the Presentation tab and click on "New Presentation" to begin.</p>
              </div>
              <div className="border-b border-[#0c959b33] pb-4">
                <h3 className="text-[#e8eaed] font-medium mb-2">Can I customize the interface?</h3>
                <p className="text-gray-400">Yes, you can adjust various settings including theme and layout in your profile settings.</p>
              </div>
              <div className="pb-4">
                <h3 className="text-[#e8eaed] font-medium mb-2">How do I share my presentations?</h3>
                <p className="text-gray-400">Use the share button in the presentation view to generate a shareable link.</p>
              </div>
            </div>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#2c2c2c] p-6 rounded-lg border border-[#0c959b33]">
            <div className="flex items-center gap-3 mb-6">
              <FaComments className="text-[#0c959b] text-2xl" />
              <h2 className="text-2xl font-semibold text-[#e8eaed]">Give Feedback</h2>
            </div>
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div>
                <label className="block text-[#e8eaed] mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-[#e8eaed] border border-[#0c959b33] rounded-md p-2 focus:outline-none focus:border-[#0c959b]"
                >
                  <option value="general">General</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[#e8eaed] mb-2" htmlFor="feedback">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-[#e8eaed] border border-[#0c959b33] rounded-md p-2 h-32 focus:outline-none focus:border-[#0c959b]"
                  placeholder="Tell us what you think..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0c959b] text-white py-2 rounded-md hover:bg-[#0a7f84] transition-colors"
              >
                Submit Feedback
              </button>
            </form>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 bg-[#2c2c2c] p-6 rounded-lg border border-[#0c959b33]">
            <div className="flex items-center gap-3 mb-6">
              <FaEnvelope className="text-[#0c959b] text-2xl" />
              <h2 className="text-2xl font-semibold text-[#e8eaed]">Contact Support</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Need more help? Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <a
              href="mailto:support@example.com"
              className="inline-flex items-center gap-2 bg-[#0c959b] text-white px-6 py-2 rounded-md hover:bg-[#0a7f84] transition-colors"
            >
              <FaEnvelope />
              Contact Support
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Help;