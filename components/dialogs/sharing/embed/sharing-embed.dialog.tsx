import React from "react";
import { Dialog } from "@headlessui/react";
import { ISharingDialogProps } from "../sharing-dialog.props";
import SharingEmbedComponent from "./sharing-embed.component";
import { IoIosCloseCircleOutline } from "react-icons/io";
const SharingEmbedDialog: React.FC<ISharingDialogProps> = ({
  handleClose,
  domain,
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
                <IoIosCloseCircleOutline className="w-5 h-5" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </Dialog.Title>
          <SharingEmbedComponent domain={domain} episode={episode} />{" "}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SharingEmbedDialog;
