import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Modal = (props) => {
  const closeModal = () => {
    props.onClose();
  };

  return (
    <>
      <Transition appear show={props.visibility} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full min-h-[calc(100vh-2rem)] transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-700 dark:text-gray-200">
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-slate-500 dark:text-gray-200 dark:hover:bg-slate-600"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-200"
                  >
                    {props.title}
                  </Dialog.Title>

                  <div className="mt-2 min-h-[20rem]">{props.children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
