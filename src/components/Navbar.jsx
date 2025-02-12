import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import { useWatchList } from "./UseWatchList"; // Import custom hook for watchlist

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // State to hold the signed-in user's email inital
  const { watchList } = useWatchList(); // Hook to access the watchlist

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-gray-300 bg-gray-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 drop-shadow-2xl">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Hamburger Button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo and Links */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start text-3xl">
                  <div className="flex shrink-0 items-center ">
                    <NavLink
                      to="/"
                      className="relative font-extrabold rounded-full bg-gray-800 text-gray-300 hover:text-white"
                    >
                      Movie
                      <span className="text-black font-extrabold hover:text-gray">
                        DOJO
                      </span>
                    </NavLink>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <NavLink to="/" className={linkClass}>
                        Home
                      </NavLink>
                      <NavLink to="/movies" className={linkClass}>
                        Movies
                      </NavLink>
                      <NavLink to="/tv-shows" className={linkClass}>
                        TV Shows
                      </NavLink>
                    </div>
                  </div>
                </div>

                {/* Watch List */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <NavLink
                    to="/WatchList"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none "
                  >
                    <span className="sr-only">Watch List</span>
                    <svg
                      className="w-8 h-8 text-gray-400 hover:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    {/* Watchlist count circle */}
                    {watchList.length > 0 && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
                    )}
                  </NavLink>

                  <div className="relative ml-3">
                    {userEmail ? (
                      // Display the first letter of the user's email
                      <div className="relative rounded-full bg-indigo-600 text-white text-center w-8 h-8 font-bold text-lg">
                        {userEmail[0].toUpperCase()}
                      </div>
                    ) : (
                      // Sign-in button
                      <button
                        onClick={openModal}
                        className="relative rounded-full text-gray-400 hover:text-white focus:outline-none"
                      >
                        <span className="sr-only">Sign In</span>
                        <svg
                          className="w-8 h-8 text-gray-400 hover:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/Movies" className={linkClass}>
                  Movies
                </NavLink>
                <NavLink to="/TV Shows" className={linkClass}>
                  TV Shows
                </NavLink>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Sign-In Modal */}
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          onSignIn={(email) => setUserEmail(email)} // Update user email
        />
      )}
    </>
  );
};

export default Navbar;
