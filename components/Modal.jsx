"use client";
import React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Modal = ({
  selectedPrompt,
  isOpen,
  handleCloseModal,
  handleEdit,
  handleDelete,
}) => {
  console.log("selectedPrompt:", selectedPrompt);

  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, handleCloseModal]);

  const handleCopy = () => {
    setCopied(selectedPrompt.prompt);
    navigator.clipboard.writeText(selectedPrompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    isOpen && (
      <div className="modal-container">
        <div className="modal" ref={modalRef}>
          {/* Profile */}
          <div className="flex justify-between items-start gap-5 ">
            <div
              className="flex justify-start items-center gap-3 cursor-pointer hover:underline decoration-1 w-fit"
              //   onClick={handleProfileClick}
            >
              <Image
                src={selectedPrompt.creator.image}
                alt="userImg"
                width={40}
                height={40}
                className="rounded-full object-contain"
              />
              <div className="flex flex-col">
                <h3 className="font-satoshi font-semibold text-gray-900">
                  {selectedPrompt.creator.username}
                </h3>
              </div>
            </div>
            <div>
              <Image
                className="cursor-pointer"
                src="/assets/icons/close.svg"
                alt="closeBtn"
                width={50}
                height={50}
                onClick={handleCloseModal}
              />
            </div>
          </div>
          {/* Title */}
          <div>
            <h2 className="prompt-title text-justify pt-4 pb-2">
              {selectedPrompt.title}
            </h2>
          </div>

          {/* Promppt */}
          <div className="modal-prompt">
            <div className="bg-slate-50 h-10 rounded-t border border-solid border-gray-200 flex justify-end items-center">
              <div className="copy_btn mr-5" onClick={handleCopy}>
                <Image
                  src={
                    copied === selectedPrompt.prompt
                      ? "/assets/icons/tick.svg"
                      : "/assets/icons/copy.svg"
                  }
                  alt="copy-btn"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className="bg-slate-950 text-white p-6 rounded-b whitespace-pre-wrap overflow-y-auto max-h-[600px]">
              {selectedPrompt.prompt}
            </div>
          </div>

          <p
            className="tag"
          >
            #{selectedPrompt.tag}
          </p>

          {session?.user.id === selectedPrompt.creator._id &&
            pathName === "/profile" && (
              <div className="flex mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                <p
                  className="font-inter text-sm text-green-600 cursor-pointer"
                  onClick={handleEdit}
                >
                  Editar
                </p>
                <p
                  className="font-inter text-sm text-red-600 cursor-pointer"
                  onClick={handleDelete}
                >
                  Deletar
                </p>
              </div>
            )}
        </div>
      </div>
    )
  );
};

export default Modal;
