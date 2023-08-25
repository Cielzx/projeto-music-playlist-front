import CustomModal from "@/app/components/Modal";
import { useMusic, useUser } from "@/hook";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa";

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadProfileImageModal = ({ isOpen, onClose }: modalProps) => {
  const { mode } = useMusic();
  const { user, setProfileImage, profileImage, uploadPhoto } = useUser();

  const onDrop = useCallback((files: File[]) => {
    setProfileImage(files[0]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg"],
    },
  });

  if (!user) {
    return <></>;
  }

  const onSubFunction = () => {
    uploadPhoto(user.id, profileImage!);
  };

  const { getRootProps, getInputProps } = dropzone;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      MaxWidthBody="100%"
      MaxWidthHeader="100%"
      widthBody="45%"
      widthHeader="45%"
      heightBody="70%"
    >
      {mode === "profile" ? (
        <div className="flex justify-center items-center w-full text-white">
          <div className="w-full">
            <p className="text-4xl my-6 font-semibold text-center">
              Alterar foto
            </p>
            <div className="w-full flex flex-row ">
              <div
                {...getRootProps()}
                className=" flex flex-col w-[100%] h-[410px] bg-blue-900 rounded-lg border-dashed border-2 border-gray-400"
              >
                <label
                  htmlFor="dropzone-file"
                  className="cursor-pointer w-full h-full"
                >
                  <div className="flex flex-col items-center pt-5 pb-6 w-full h-full gap-2">
                    <FaImage className="fill-gray-200 w-24 h-20 m-4" />
                    <p className="text-3xl">Arrasta e solte a capa aqui</p>
                    <p className="text-3xl mt-4">- OU -</p>
                    <button
                      className="user-form-button w-48 my-8"
                      onClick={(e) => e.preventDefault()}
                    >
                      Busque aqui
                    </button>
                    <p className="text-lg italic font-gray-200">
                      Formatos suportados: jpg
                    </p>
                  </div>
                </label>
                <input className="hidden" {...getInputProps()} />
              </div>
            </div>
            <div className=" w-[97%] flex items-center justify-end">
              <div className="flex flex-row gap-2 ">
                <button
                  className="user-form-button w-64 text-xl my-8"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubFunction();
                  }}
                >
                  Atualizar perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </CustomModal>
  );
};

export default UploadProfileImageModal;
