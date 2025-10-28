// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Hak do sprawdzania, na której stronie jesteśmy

  const handleLogout = () => {
    logout();
    router.push('/'); // Po wylogowaniu przekieruj na stronę logowania
  };

  const navLinks = [
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white shadow-md h-16 flex items-center">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Lewa strona - Logo */}
          <Link href="/chat" className="text-xl font-bold text-blue-600">
            AI Chat App
          </Link>
          
          {/* Środek - Linki nawigacyjne */}
          <div className="flex items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${ 
                    isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <link.icon className={`w-5 h-5 mr-2 ${isActive ? 'text-blue-600' : ''}`} />
                  {link.label}
                </Link>
              );
            })}
          </div>
          
          {/* Prawa strona - Przycisk wylogowania */}
          <button 
            onClick={handleLogout} 
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}