'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Content for the four paragraphs
const content = [
  {
    image: '/sign-signature-image.png',
    header: 'Signatures with a Purpose ',
    // eslint-disable-next-line max-len
    paragraph: 'Sign protocol is designed to enable the creation and verification of attestations across multiple blockchain networks,making it an omni-chain attestation platform. It addresses the growing need for trustable and verifiable information on the web by providing a decentralized way to confirm the validity of various claims, statements, and events. Instead of relying on traditional authorities or intermediaries, Sign Protocol leverages blockchain technology to create a future where information can be freely and securely verified.',
  },
  {
    image: '/sign-applicants-image.png',
    header: 'The Breakdown: Why it matters',
    // eslint-disable-next-line max-len
    paragraph: 'An attestation is a digitally signed confirmation that validates the truthfulness of a claim. In traditional systems, trust is often placed in third parties, such as notaries or banks, to verify information. However, this approach can be inefficient and costly. With Sign Protocol, attestations are created and verified digitally, allowing anyone to prove or validate information, such as completing a course, fulfilling a contract, or confirming identity, without needing centralized approval.',
  },
  {
    image: '/sign-how-image.png',
    header: 'How Sign Protocol Works',
    // eslint-disable-next-line max-len
    paragraph: 'Sign Protocol implements attestations by using digitally signed structured data that adheres to a registered schema. This ensures consistency and security, allowing attestations to be stored on-chain for transparency or off-chain for privacy. Users can create attestations that follow a defined schema in the protocol’s registry, making it possible to standardize claims across different use cases. The data can be verified easily by others, ensuring authenticity without compromising the users control over their information.',
  },
  {
    image: '/sign-why-image.png',
    header: 'Applications of Attestations',
    // eslint-disable-next-line max-len
    paragraph: 'Attestations powered by Sign Protocol have a wide range of applications. They can be used for tasks like reward distribution, where bounties are awarded based on verified actions, or loan approvals, where financial history is confirmed digitally. They also play a role in governance, identity verification, role assignment, and more, making them a flexible tool for reinforcing trust and accountability in both the digital and physical worlds.',
  },
];

// Questions for the quiz
const questions = [
  {
    question: 'What is the main purpose of Sign Protocol?',
    answers: [
      'To create digital signatures',
      'To enable creation and verification of attestations across blockchain networks'
    ],
    correct: 1
  },
  {
    question: 'How does Sign Protocol implement attestations?',
    answers: [
      'Using centralized databases',
      'Using digitally signed structured data adhering to a registered schema'
    ],
    correct: 1
  },
  {
    question: 'What is one application of attestations powered by Sign Protocol?',
    answers: [
      'Creating social media profiles',
      'Verifying actions for reward distribution'
    ],
    correct: 1
  }
];

export default function LessonPage() {
  const [stage, setStage] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleContinue = () => {
    if (stage < content.length - 1) {
      setStage(stage + 1);
    } else if (!quizStarted) {
      setQuizStarted(true);
    } else if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz finished
        alert(`Quiz completed! Your score: ${score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0)}/${questions.length}`);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white text-black">
      {/* Custom Header */}
      <header className="flex justify-between items-center px-4 h-[62px] bg-white shadow-sm">
        <Link href="/courses/sign" className="text-black">
          <Image src="/back-button.svg" alt="Back" width={24} height={24} />
        </Link>
        <div className="flex items-center">
          <Image
            src="/xp-icon.svg"
            alt="XP Icon"
            width={16}
            height={16}
            className="mr-2"
          />
          <span className="text-sm font-medium">12 XP</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-end">
        {!quizStarted ? (
          <>
            <Image
              src={content[stage].image}
              alt={content[stage].header}
              width={content[stage].image === '/sign-signatures-image.png' ? 361 : 400}
              height={content[stage].image === '/sign-signatures-image.png' ? 238 : 300}
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">{content[stage].header}</h2>
            <p className="mb-8">{content[stage].paragraph}</p>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h2>
            {questions[currentQuestion].answers.map((answer, index) => (
              <label key={index} className="block mb-4">
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={() => setSelectedAnswer(index)}
                  className="mr-2"
                />
                {answer}
              </label>
            ))}
          </div>
        )}
      </div>
      {((!quizStarted && stage < content.length) || (quizStarted && currentQuestion < questions.length)) && (
        <div className="p-4 flex justify-center">
          <button 
            onClick={handleContinue} 
            className={`w-[393px] h-[75px] relative ${quizStarted && selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={quizStarted && selectedAnswer === null}
          >
            <Image
              src="/continue-btn.svg"
              alt="Continue"
              fill
              style={{ objectFit: 'contain' }}
            />
          </button>
        </div>
      )}
    </div>
  );
}
