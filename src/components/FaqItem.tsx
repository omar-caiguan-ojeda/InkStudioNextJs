"use client";

import { useState } from 'react';
import styles from './FaqItem.module.css';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.faqItem}>
      <button className={styles.question} onClick={toggleOpen}>
        <span>{question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.open : ''}`}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className={styles.answer}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;
