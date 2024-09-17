import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import React, { useState } from "react";
import { GiMoneyStack } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SignOut } from "../form/SignOut";
import { Breadcrumb } from "./Breadcrumb";
import { NavigationButton } from "./NavigationButton";
import { IoIosLogIn } from "react-icons/io";

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
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  function handleMenuClicked() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <FiMenu className="text-2xl" onClick={handleMenuClicked} />
        <Link className="text-3xl flex p-4 mr-4 " to={`/home`}>
          <p className="text-2xl pr-2">{props.title}</p>
          <GiMoneyStack className="hidden md:flex" size={35} />
        </Link>
        {isLoggedIn ? (
          <SignOut />
        ) : (
          <NavigationButton path="/home" text={<IoIosLogIn size={35} />} />
        )}
      </nav>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform z-50 ${
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
      <Breadcrumb />
      <div className="relative z-30">{props.children}</div>
    </>
  );
}
