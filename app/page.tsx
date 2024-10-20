"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import Image from 'next/image';
import BottomNav from '../components/BottomNav';
import SlideMenu from '../components/SlideMenu';
import Link from 'next/link';

// Define the course cards
const courseCards = [
  { id: 'coinbase', svgPath: '/coinbase-main-card.svg', href: '/courses/coinbase' },
  { id: 'polygon', svgPath: '/polygon-main-card.svg', href: '/courses/polygon' },
  { id: 'story', svgPath: '/story-main-card.svg', href: '/courses/story' },
  { id: 'chronicle', svgPath: '/chronicle-main-card.svg', href: '/courses/chronicle' },
  { id: 'alchemy', svgPath: '/alchemy-main-card.svg', href: '/courses/alchemy' },
];

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <main className="flex min-h-screen flex-col bg-white text-black items-center p-4 justify-start text-center">
      <div className="w-full flex max-w-[368px] justify-between items-center mb-4 mt-2 rounded-lg">
        <div className="flex items-center">
          {user ? (
            <SlideMenu userEmail={user.email ?? ''} onLogout={logout} />
          ) : (
            <Image
              src="/user-avater-icon.svg"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full mr-3"
            />
          )}
          <span className="font-semibold text-black ml-3">Welcome, {user?.email ?? "Learner"}!</span>
        </div>
        <div className="flex bg-gray-100 items-center rounded-full p-2 pl-3 pr-3">
          <Image
            src="/xp-icon.svg"
            alt="XP Icon"
            width={16}
            height={16}
            className="rounded-full mr-3"
          />
          <span>12 XP</span>
        </div>
      </div>
      <h1 className="text-2xl max-w-[368px] w-full justify-start text-left align-left font-bold mb-4">Trending</h1>
      <Link href="/courses/sign" className="cursor-pointer">
        <Image
          src="/flow-main-card.svg"
          alt="flow-main-card"
          width={368}
          height={198}
          className="rounded-[10px] mr-3"
        />
      </Link>
      {signerStatus.isInitializing ? (
        <div className="flex items-center justify-center h-screen w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : user ? (
        <div className="flex flex-col items-center gap-2 w-full max-w-[368px]">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-2 mt-4 text-left">Dive back in</h1>
          </div>
          <div className="w-full max-w-[368px]">

        <div className="overflow-x-auto w-full scrollbar-hide">
          <div className="flex space-x-[10px]">
            {courseCards.map((card) => (
              <Link key={card.id} href={card.href} className="flex-shrink-0 w-[333px] h-[329px] relative cursor-pointer">
                <Image
                  src={card.svgPath}
                  alt={`${card.id} card`}
                  layout="fill"
                  objectFit="contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center h-[80vh]">
          <p className="text-lg">Please log in to access our courses.</p>
          <button className="btn btn-primary" onClick={openAuthModal}>
            Login
          </button>
        </div>
      )}
      <BottomNav activePage="lesson" />
    </main>
  );
}
