import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import React, { useState } from "react";
import { GiMoneyStack } from "react-icons/gi";

type NavigationLink = {
  title: string;
  path: string;
  logo?: React.ReactNode;
};

type NavigationProps = {
  title: string;
  navigationLinks: NavigationLink[];
  children: React.ReactNode;
};

export function Navigation({ ...props }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClicked() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <FiMenu className="text-2xl" onClick={handleMenuClicked} />

        <Link className="text-3xl flex p-4 mr-4 " to={`/`}>
          <p className="pr-4">{props.title}</p> <GiMoneyStack size={35} />
        </Link>
      </nav>
      <div
        className={`fixed top-18 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col space-y-4 p-4">
          {props.navigationLinks.map((link) => (
            <li key={link.title}>
              <Link
                className="text-lg flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
                onClick={handleMenuClicked}
                to={`/${link.path}`}
              >
                {link.logo && <p>{link.logo}</p>}
                <p>{link.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75 z-40"
          onClick={handleMenuClicked}
        ></div>
      )}
      <div className="relative z-30">{props.children}</div>
    </>
  );
}
