import React from 'react';

import { SlMenu } from "react-icons/sl";
import { SlLogin } from "react-icons/sl";
import { MainMenu } from './MainMenu';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div>
        <MainMenu />
      </div>
      <div className="text-xl font-bold">Your App Title</div>
      <div>
        <SlLogin style={{ fontSize: '24px' }} />
      </div>
    </header>
  );
};

export default Header;
