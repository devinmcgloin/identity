import Link from 'next/link';
import { useState } from 'react';
import Transition from 'components/transition';

const BasicNavigation = ({ isMobileOpen, setMobileOpen }) => (
  <nav className="relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6">
    <div className="flex items-center justify-between flex-1">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center sm:w-full">
          <Link href="/">
            <a className="flex items-center">
              <img className="h-6 w-auto sm:h-8" src="/icon.svg" alt="" />
            </a>
          </Link>
        </div>
        <div className="-mr-2 flex items-center md:hidden">
          <button
            aria-label="Mobile Navigaton"
            onClick={() => setMobileOpen(!isMobileOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="hidden md:block md:mr-10">
        <Link href="/about">
          <a className="font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
            About
          </a>
        </Link>
        <Link href="/artwork">
          <a className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
            Artwork
          </a>
        </Link>
        <Link href="/photography">
          <a className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
            Photography
          </a>
        </Link>
        <Link href="/writing">
          <a className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
            Writing
          </a>
        </Link>
      </div>
    </div>
  </nav>
);

const MobileExpandedHeader = ({ isMobileOpen, setMobileOpen }) => (
  <Transition
    show={isMobileOpen}
    enter="duration-150 ease-out"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    leave="duration-100 ease-in"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-95"
  >
    <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
      <div className="rounded-lg shadow-md">
        <div className="rounded-lg bg-white shadow-xs overflow-hidden">
          <div className="px-5 pt-4 flex items-center justify-between">
            <Link href="/">
              <div>
                <img className="h-6 w-auto" src="/icon.svg" alt="" />
              </div>
            </Link>
            <div className="-mr-2">
              <button
                aria-label="Mobile Navigaton"
                onClick={() => setMobileOpen(!isMobileOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3">
            <Link href="/about">
              <a
                onClick={() => setMobileOpen(!isMobileOpen)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                About
              </a>
            </Link>
            <Link href="/artwork">
              <a
                onClick={() => setMobileOpen(!isMobileOpen)}
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                Artwork
              </a>
            </Link>
            <Link href="/photography">
              <a
                onClick={() => setMobileOpen(!isMobileOpen)}
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                Photography
              </a>
            </Link>
            <Link href="/writing">
              <a
                onClick={() => setMobileOpen(!isMobileOpen)}
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                Writing
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Transition>
);

const Header = ({ children }) => {
  const [isMobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative bg-white overflow-hidden border-gray-500 border-bottom">
      <div className="relative pt-6 pb-8">
        <BasicNavigation
          isMobileOpen={isMobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <MobileExpandedHeader
          isMobileOpen={isMobileOpen}
          setMobileOpen={setMobileOpen}
        />
        {children}
      </div>
    </div>
  );
};

export { Header, BasicNavigation, MobileExpandedHeader };
