'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from "@account-kit/react";
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk'

const sdk = new CoinbaseWalletSDK({
  appName: 'Guides',
  appChainIds: [1, 11155111]
});

// Content for the four paragraphs
const content = [
  {
    image: '/coinbase-frame1.png',
    header: 'Understanding Wallets',
    // eslint-disable-next-line max-len
    paragraph: `Crypto wallets are essential tools for managing digital assets like Bitcoin and Ethereum. They use a combination of public and private keys: the public key serves as the wallet's address, allowing others to send assets to the wallet, while the private key acts like a secret password that gives the owner control over their funds. There are two main types of wallets: custodial wallets, where a third party manages the private keys on behalf of the user, and non-custodial wallets, where the user has complete control over their private keys, offering greater security but also more responsibility.`,
  },
  {
    image: '/coinbase-frame2.png',
    header: 'The Next Evolution in Crypto Storage',
    // eslint-disable-next-line max-len
    paragraph: 'Smart wallets represent the next generation of wallets, incorporating programmable functionalities made possible by smart contracts. These wallets can automate tasks, such as recurring payments, manage gas fees more efficiently, and set up features like multi-signature requirements or spending limits to enhance security.',
  },
  {
    image: '/coinbase-frame3.png',
    header: 'EIP-4337 and Account Abstraction',
    // eslint-disable-next-line max-len
    paragraph: 'The introduction of EIP-4337 took smart wallets a step further by enabling account abstraction, which decouples wallet functions from traditional account structures. This allows for more flexible customization, such as paying gas fees in tokens other than Ether, social recovery mechanisms for lost keys, and automated transaction rules. EIP-4337 significantly improves the user experience by adding these smart features while keeping compatibility.',
  }
];

// Questions for the quiz
const questions = [
  {
    question: 'What is the main purpose of a crypto wallet?',
    answers: [
      'To store and manage digital assets using private and public keys',
      'To convert cryptocurrency into tradition currency'
    ],
    correct: 1
  },
  {
    question: 'What distinguishes non-custodial wallets from custodial wallets?',
    answers: [
      'Non-custodial wallets give users full control over their private keys',
      'Non-custodial wallets are managed by exchanges'
    ],
    correct: 1
  },
  {
    question: 'What does EIP-4337 introduce to enhance wallets?',
    answers: [
      'Account abstraction for custom features like social recovery and paying gas fees in any token',
      'A new type of digital currency on Ethereum'
    ],
    correct: 1
  }
];

export default function LessonPage() {
  const user = useUser();
  const [stage, setStage] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [address, setAddress] = useState() as any;
  const [connected, setConnected] = useState() as any;
  console.log(user)
  const requestConnect = async () => {
    try {
      // Create provider
      const provider = sdk.makeWeb3Provider({ options: 'smartWalletOnly' });
      // Use provider
      const addresses = provider.request({ method: 'eth_requestAccounts' });
      const adress = await addresses
      setAddress(adress)
      setConnected(true)
      console.log({ adress })
    } catch (e) {
      console.log(e)
    }
  };

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
        setQuizFinished(true);
        alert(`Quiz completed! Your score: ${score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0)}/${questions.length}`);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white text-black">
      {/* Custom Header */}
      <header className="flex justify-between items-center px-4 h-[62px] bg-white shadow-sm">
        <Link href="/courses/coinbase" className="text-black">
          <Image src="/back-button-icon.svg" alt="Back" width={24} height={24} />
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

      <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-start">
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
        ) : quizFinished ? (
          <div className="flex flex-col items-center bg-course p-2">
            <Image
              src='/coinbase-end.svg'
              alt='coinbase-end'
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            {!connected && (
              <>
                <h2 className="text-2xl font-bold mb-4">Congratulations! You’ve unlocked a Smart Account Wallet!</h2>
                <p className="mb-8">Great job on completing the challenge! You're one step closer to becoming a Web3 power user. Now, let's set up your smart account wallet in just a few easy steps. This will give you seamless access to the world of Web3 and effortless transactions.</p>
                <p>Tap "Connect Wallet" below to start the setup with Coinbase’s Smart Account wallet flow.</p>
                {user && (
                  <button
                    className="btn btn-primary w-full max-w-[368px] mb-4 mt-4"
                    onClick={requestConnect}
                  >
                    Connect
                  </button>
                )}
              </>
            )}
            {connected && (
              <>
                <h2 className="text-2xl font-bold mb-4">You’re now connected to Web3!!</h2>
                <p className="mb-8">Great job on completing the challenge! You're one step closer to becoming a Web3 power user. Now, let's set up your smart account wallet in just a few easy steps. This will give you seamless access to the world of Web3 and effortless transactions.</p>
                <p>Your Smart Wallet address:</p>
                <p class="text-xs">{address}</p>
              </>
            )}
          </div>
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
        )
        }
      </div >
      {((!quizStarted && stage < content.length) || (quizStarted && currentQuestion < questions.length)) && (
        <div className="p-4 flex justify-center">
          <button
            onClick={handleContinue}
            className={`btn-continue w-[393px] h-[75px] relative ${quizStarted && selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''}`}
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
    </div >
  );
}
