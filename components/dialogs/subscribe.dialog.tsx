import React from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { Podcast, PodcastEntry } from "models";

interface ISharingDialogProps {
  handleClose: () => void;
  podcast: Podcast;
  episode: PodcastEntry;
  show: boolean;
}

const SubscribeDialog: React.FC<ISharingDialogProps> = ({
  handleClose,
  podcast,
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
            <div className="p-6 border-2 bg-base-200">
              <h3 className="pb-1 text-lg font-bold border-b-2">
                Choose your favourite podcatcher!
              </h3>
              <div className="px-4 pt-8">
                <div className="flex items-center justify-center mx-8 space-x-3">
                  {podcast.aggregators?.map((aggregator) => (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={aggregator.url}
                      key={aggregator.name}
                      className="inline-flex items-center px-4 py-2 space-x-2 font-semibold rounded btn btn-outline btn-accent"
                    >
                      <Image
                        className="w-5 h-5 fill-current"
                        src={aggregator.imageUrl}
                        alt={aggregator.name}
                        width={20}
                        height={20}
                      />
                      {/* <svg
                        className="w-5 h-5 fill-current"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg> */}
                      <span>{aggregator.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="modal-action text-base-content">
                <label
                  htmlFor="my-modal"
                  className="btn btn-primary"
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

export default SubscribeDialog;
