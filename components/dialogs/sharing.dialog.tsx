import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import BaseDialog from "./base.dialog";
interface ISharingDialogProps {
  handleClose: () => void;
  show: boolean;
}
const SharingDialog: React.FC<ISharingDialogProps> = ({
  handleClose,
  show,
}) => {
  React.useEffect(() => {
    console.log("sharing.dialog", "show", show);
  }, [show]);
  return (
    <Transition appear show={show} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={show}
        onClose={handleClose}
      >
        <div className="modal modal-open">
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
            <div className="modal-box">
              <div>
                <h3 className="text-lg font-bold">
                  Congratulations random Interner user!
                </h3>
                <p className="py-4">
                  You've been selected for a chance to get one year of
                  subscription to use Wikipedia for free!
                </p>
                <div className="modal-action">
                  <label htmlFor="my-modal" className="btn">
                    Yay!
                  </label>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SharingDialog;
