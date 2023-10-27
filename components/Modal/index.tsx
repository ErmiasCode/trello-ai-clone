"use client";
import { Fragment, useRef } from "react";

import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";

import TaskTypeRadioGroup from "../TaskTypeRadioGroup";
import Image from "next/image";

const Modal = () => {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [newTaskInput, setNewTaskInput, image, setImage] = useBoardStore((state) => [
    state.newTaskInput,
    state.setNewTaskInput,
    state.image,
    state.setImage,
  ]);
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="form" className="relative z-20" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                 {"Add Task"}  
                </Dialog.Title>
                <div className="mt-2">
                  <input value={newTaskInput} onChange={(e) => setNewTaskInput(e.target.value)} type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="Your task..." />
                </div>

                <TaskTypeRadioGroup />


                <div>
    
                  <button 
                    type="button"
                    onClick={() => imagePickerRef.current?.click()}
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                      {"Uplaod Image"}
                  </button>
                  {image && (
                    <Image
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                      src={URL.createObjectURL(image)}
                      alt="Upladed Task Image"
                      width={200}
                      height={200}

                      onClick={() => setImage(null)}
                    />
                  )}
           
                  <input type="file" ref={imagePickerRef} hidden onChange={(e) => {
                    // check if the file is an image
                    if (!e.target.files![0].type.startsWith("image/")) return;
                    setImage(e.target.files![0]);
                    }
                  } />
                 </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
