"use client"
// components/ui/ProductDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const PRODUCT_LINKS = [
  { name: 'Customer Support Chatbot', href: '/ai-customer-support' },
  { name: 'WhatsApp AI Chatbot', href: '/whatsapp-ai-chatbot' },
  { name: 'Conversational AI Bot', href: '/conversational-ai-chatbot' }
];

export default function ProductDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-medium link flex items-center gap-1"
      >
        Product
        <span className="inline-block transform transition-transform duration-200" aria-hidden>
          {open ? '▴' : '▾'}
        </span>
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-48 bg-black border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          {PRODUCT_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-4 py-2 text-sm text-white-700 hover:bg-gray-900"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
