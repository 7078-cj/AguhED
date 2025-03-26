import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar, FaGlobe } from 'react-icons/fa';
import styles from '../css/Modals.module.css';

export const FeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = React.useState(0);
  const [feedbackType, setFeedbackType] = React.useState('general');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission
    console.log({ rating, feedbackType, message });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>
            <h2>Give Feedback</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Feedback Type</label>
                <select
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                >
                  <option value="general">General</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="improvement">Improvement</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Rating</label>
                <div className={styles.starRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`${styles.star} ${star <= rating ? styles.active : ''}`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you think..."
                  rows="4"
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Submit Feedback
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const HelpSupportModal = ({ isOpen, onClose }) => {
  const faqs = [
    {
      question: 'How do I start a presentation?',
      answer: 'Click on the "Presentation" button in the navigation bar and follow the prompts to begin.'
    },
    {
      question: 'Can I customize the interface?',
      answer: 'Yes, you can customize various aspects of the interface through the Settings menu.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach our support team at support@example.com or through the contact form below.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>
            <h2>Help & Support</h2>
            <div className={styles.helpContent}>
              <section className={styles.faqSection}>
                <h3>Frequently Asked Questions</h3>
                {faqs.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </section>
              <section className={styles.contactSection}>
                <h3>Contact Support</h3>
                <p>Need more help? Our support team is here for you.</p>
                <a href="mailto:support@example.com" className={styles.supportLink}>
                  support@example.com
                </a>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const LanguageModal = ({ isOpen, onClose }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' }
  ];

  const handleLanguageSelect = (code) => {
    // Handle language selection
    console.log(`Selected language: ${code}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`${styles.modalContent} ${styles.languageModal}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>
            <h2>
              <FaGlobe className={styles.globeIcon} /> Select Language
            </h2>
            <div className={styles.languageGrid}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={styles.languageButton}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};