import { useState } from 'react';
import Image from 'next/image';

interface SlideMenuProps {
  userEmail: string;
  onLogout: () => void;
}

export default function SlideMenu({ userEmail, onLogout }: SlideMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <Image
          src="/user-avater-icon.svg"
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Menu</h2>
              <p className="mb-4">{userEmail}</p>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}