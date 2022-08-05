import { Dialog, Tab, Transition } from "@headlessui/react";
import { PodcastEntry } from "models";
import React from "react";
import { ISharingDialogProps } from "../sharing-dialog.props";
import SharingEmbedComponent from "./sharing-embed.component";

const SharingEmbedDialog: React.FC<ISharingDialogProps> = ({
  handleClose,
  episode,
  show,
}) => {
  return (
    <Dialog
      as="div"
      open={show}
      onClose={handleClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="w-3/4 mx-auto rounded bg-base-100 lg:w-1/2 ">
          <Dialog.Title>
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold">Share Episode</h3>
              <button
                type="button"
                onClick={handleClose}
                className="bg-transparent hover:bg-accent hover:accent-content rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </Dialog.Title>
          <SharingEmbedComponent episode={episode} />{" "}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SharingEmbedDialog;
