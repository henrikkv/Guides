import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { id: 'lead', icon: '/black-leadicon.svg', activeIcon: '/white-leadicon.svg', href: '/lead' },
  { id: 'lesson', icon: '/blacklessonicon.svg', activeIcon: '/whitelessonicon.svg', href: '/' },
  { id: 'wallet', icon: '/blackwallet.svg', activeIcon: '/whitewallet.svg', href: '/wallet' },
];

export default function BottomNav({ activePage = 'lesson' }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-between">
        {navItems.map((item) => (
          <Link key={item.id} href={item.href} className="w-1/3">
            <div className={`flex justify-center items-center py-4 ${activePage === item.id ? 'bg-black' : ''}`}>
              <Image
                src={activePage === item.id ? item.activeIcon : item.icon}
                alt={`${item.id} icon`}
                width={24}
                height={24}
              />
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}