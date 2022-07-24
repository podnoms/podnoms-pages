import { Dialog, Tab, Transition } from "@headlessui/react";
import { PodcastEntry } from "models";
import React from "react";
import SharingEmbedComponent from "./sharing-embed.component";
import SharingShareComponent from "./sharing-share.component";

interface ISharingDialogProps {
  handleClose: () => void;
  episode: PodcastEntry;
  show: boolean;
}

const SharingDialog: React.FC<ISharingDialogProps> = ({
  handleClose,
  episode,
  show,
}) => {
  return (
    <Transition appear show={show} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={show}
        onClose={handleClose}
      >
        <div className="w-1/2 modal modal-open ">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="p-6 border-2 bg-base-200">
              <Tab.Group>
                <Tab.List>
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "text-black  border-b-2 border-gray-600"
                        : "text-gray-500"
                    }
                  >
                    <div className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                      Share
                    </div>
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "text-black  border-b-2 border-gray-600"
                        : "text-gray-500"
                    }
                  >
                    <div className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                      Embed
                    </div>
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <SharingShareComponent episode={episode} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <SharingEmbedComponent episode={episode} />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

              <div className="modal-action text-base-content">
                <label
                  htmlFor="my-modal"
                  className="btn btn-outline btn-primary"
                  onClick={handleClose}
                >
                  Done.
                </label>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SharingDialog;
