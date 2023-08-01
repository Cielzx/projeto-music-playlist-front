"use client";

import { IoIosClose } from "react-icons/io";

import { ModalHeader, Modal, ModalOverlay, ModalBody } from "@chakra-ui/react";

interface ModalChildren {
  children: React.ReactNode;
  isOpen: boolean;
  headerText?: string;
  onClose: () => void;
  MaxWidthHeader: string;
  MaxWidthBody: string;
  widthHeader: string;
  widthBody: string;
  heightBody?: string;
}

const CustomModal = ({
  isOpen,
  onClose,
  children,
  headerText,
  MaxWidthHeader,
  MaxWidthBody,
  widthHeader,
  widthBody,
  heightBody,
}: ModalChildren) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        style={{
          flexGrow: 0,
          flexShrink: 0,
        }}
        className="flex flex-col items-center justify-center bg-opacity-70 bg-black"
      >
        <ModalHeader
          style={{
            maxWidth: MaxWidthHeader,
            width: widthHeader,
            flexGrow: 0,
            flexShrink: 0,
            height: "30px",
            padding: "5px",
          }}
          className="bg-gray-800 flex justify-between text-white  p-4"
        >
          <p>{headerText}</p>
          <button onClick={onClose}>
            <IoIosClose className="text-4xl" />
          </button>
        </ModalHeader>
        <ModalBody
          style={{
            padding: "1rem",
            maxWidth: MaxWidthBody,
            width: widthBody,
            height: heightBody,
            flexGrow: 0,
            flexShrink: 0,
          }}
          className="bg-gray-800 flex  justify-start p-8"
        >
          {children}
        </ModalBody>
      </ModalOverlay>
    </Modal>
  );
};

export default CustomModal;
