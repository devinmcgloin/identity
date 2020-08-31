import Link from 'next/link';
import { useState } from 'react';
import Transition from 'components/transition';

const BasicNavigation = ({ isMobileOpen, setMobileOpen }) => (
  <nav className="relative flex items-center justify-between max-w-screen-xl px-4 mx-auto sm:px-6">
    <div className="flex items-center justify-between flex-1">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center sm:w-full">
          <Link href="/">
            <a className="flex items-center">
              <img className="w-auto h-6 sm:h-8" src="/icon.svg" alt="" />
            </a>
          </Link>
        </div>
        <div className="flex items-center -mr-2 md:hidden">
          <button
            aria-label="Mobile Navigaton"
            onClick={() => setMobileOpen(!isMobileOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
          >
            <svg
              className="w-6 h-6"
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
          <a className="font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900">
            About
          </a>
        </Link>
        <Link href="/artwork">
          <a className="ml-10 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900">
            Artwork
          </a>
        </Link>
        <Link href="/photography">
          <a className="ml-10 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900">
            Photography
          </a>
        </Link>
        <Link href="/writing">
          <a className="ml-10 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900">
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
    <div className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden">
      <div className="rounded-lg shadow-md">
        <div className="overflow-hidden bg-white rounded-lg shadow-xs">
          <div className="flex items-center justify-between px-5 pt-4">
            <Link href="/">
              <div>
                <img className="w-auto h-6" src="/icon.svg" alt="" />
              </div>
            </Link>
            <div className="-mr-2">
              <button
                aria-label="Mobile Navigaton"
                onClick={() => setMobileOpen(!isMobileOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
              >
                <svg
                  className="w-6 h-6"
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
                className="block px-3 py-2 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
              >
                About
              </a>
            </Link>
            <Link href="/artwork">
              <a
                onClick={() => setMobileOpen(!isMobileOpen)}
                className="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
              >
                Artwork
              </a>
            </Link>
            <Link href="/photography">
              <a
                onClick={() => setMobileOpen(!isMobileOpen)}
                className="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
              >
                Photography
              </a>
            </Link>
            <Link href="/writing">
              <a
                onClick={() => setMobileOpen(!isMobileOpen)}
                className="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
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
    <div className="relative overflow-hidden bg-white border-gray-500 border-bottom">
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
