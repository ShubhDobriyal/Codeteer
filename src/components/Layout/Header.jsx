import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import NewSnippetForm from "../Snippets/NewSnippetForm";
import Logo from "../UI/Logo";
import Modal from "../UI/Modal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <>
      <Modal
        visibility={isOpen}
        onClose={closeModal}
        title="Add a new code snippet"
      >
        <NewSnippetForm />
      </Modal>
      <header className="border-b border-gray-200 dark:bg-slate-800 dark:text-gray-200 dark:border-slate-700">
        <div className="container mx-auto">
          <nav className="px-5 py-3 flex justify-between align-middle ">
            <Logo />
            <div className="flex align-middle gap-2">
              <div className="inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={openModal}
                  className="rounded-md bg-indigo-500  px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-200 group-hover:text-indigo-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Add new codeet
                </button>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium border border-indigo-400 ">
                    Shubham
                    <ChevronDownIcon
                      className="ml-2 -mr-1 h-5 w-5 text-indigo-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-slate-600 "
                        >
                          Profile
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          onClick={logoutHandler}
                          className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-slate-600  w-full text-left"
                        >
                          Logout
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
