import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

type NavigationLink = {
  title: string;
  path: string;
};

type NavigationProps = {
  title: string;
  navigationLinks: NavigationLink[];
  children: React.ReactNode;
};

export default function Navigation({ ...props }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClicked() {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu opened?", isMenuOpen);
  }

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <FiMenu className="text-2xl" onClick={handleMenuClicked} />

        <Link className="text-3xl" to={`/`}>
          {props.title}
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
                className="text-lg"
                onClick={handleMenuClicked}
                to={`/${link.path}`}
              >
                {link.title}
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
