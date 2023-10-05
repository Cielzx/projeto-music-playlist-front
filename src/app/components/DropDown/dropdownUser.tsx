import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  position,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { AuthContext, AuthProvider } from "@/context/authContext";
import { useUser } from "@/hook";

const DropDown = () => {
  const router = useRouter();
  const { user } = useUser();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleLogout = () => {
    destroyCookie(null, "user.Token");
    return router.push("/login");
  };

  if (!user) {
    return <></>;
  }

  let initials = "";
  const names = user.name.split(" ");

  if (names && names.length > 0) {
    const firstName = names[0];
    initials += firstName.charAt(0).toUpperCase();
  }

  if (names && names?.length > 1) {
    const lastName = names[names.length - 1];
    initials += lastName.charAt(0).toUpperCase();
  }
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <div className="w-[10%] flex items-center justify-start max-[920px]:w-[16%]">
        <Menu>
          <>
            <MenuButton as={Button}>
              <div className="w-full h-full flex gap-3   items-center">
                <div className="w-16 h-16 bg-pink-400 text-4xl  rounded-full bg-gray-900 max-[920px]:w-14 max-[920px]:h-14">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      className="rounded-full object-cover"
                      alt=""
                    />
                  ) : (
                    <p className="w-full h-full flex justify-center items-center  text-white">
                      {initials}
                    </p>
                  )}
                </div>
              </div>
            </MenuButton>
            <MenuList
              className=" shadow-xl transform translate-y-4"
              style={{
                background: "white",
                padding: "5px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                borderRadius: "10%",
                width: "100%",
                marginTop: "4px",
                paddingLeft: "40px",
                paddingRight: "40px",
                position: "relative",
                right: "14%",
              }}
            >
              <div className="flex flex-col gap-2">
                <>
                  <button
                    onClick={() => router.push("/profile")}
                    className="flex text-gray-400 text-base"
                  >
                    Meu perfil
                  </button>

                  <button
                    onClick={() => handleLogout()}
                    className="flex text-gray-400 text-base"
                  >
                    Sair
                  </button>
                </>
              </div>
            </MenuList>
          </>
        </Menu>
      </div>
    </>
  );
};

export default DropDown;
