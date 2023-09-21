"use client";

import { IoIosClose } from "react-icons/io";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";

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
    <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        style={{
          flexGrow: 0,
          flexShrink: 0,
        }}
        className="flex flex-col items-center justify-center bg-black bg-opacity-70 "
      >
        <ModalBody
          style={{
            padding: "1rem",
            maxWidth: MaxWidthBody,
            height: heightBody,
            flexGrow: 0,
            flexShrink: 0,
          }}
          className="bg-gray-800 flex w-[90%] flex-col  justify-start p-5 max-[920px]:w-[100%] "
        >
          <ModalHeader
            style={{
              maxWidth: MaxWidthHeader,
              flexGrow: 0,
              flexShrink: 0,
              height: "30px",
              padding: "5px",
            }}
            className="bg-gray-800 w-[100%] flex justify-between text-white  p-4 max-[920px]:w-[100%]"
          >
            <p>{headerText}</p>
            <button onClick={onClose}>
              <IoIosClose className="text-4xl" />
            </button>
          </ModalHeader>
          {children}
        </ModalBody>
      </ModalOverlay>
    </Modal>
  );
};

export default CustomModal;
