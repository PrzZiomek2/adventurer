"use client"
import React, { useState } from 'react';
import { SlMenu } from 'react-icons/sl';

export const MainMenu: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 p-4 cursor-pointer" onClick={toggleMenu}>
        {isMenuOpen ? (
          <div className="text-white text-2xl">&times;</div>
        ) : (
          <SlMenu className="text-white text-2xl" />
        )}
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={closeMenu}
          role="presentation"
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} bg-blue-500 text-white p-8 w-64 transition-transform ease-in-out duration-300`}
      >
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul>
          <li className="mb-2">Menu Item 1</li>
          <li className="mb-2">Menu Item 2</li>
          <li className="mb-2">Menu Item 3</li>
        </ul>
      </div>
    </div>
  );
};

