import { useState, useEffect, React, createRef } from "react";
import { createPopper } from "@popperjs/core";
import { useRouter } from "next/router";

// components
import Loading from "../Loading/Loading.js";
import Modal from "../../components/Modal/Modal.js";

// services
import { userService } from "../../../services/UserServices.js";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const [showModal, setShowModal] = useState(false);

  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const doLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const request = {
        username: userService.userValue.username,
      };
      userService.logout(request);
    } catch (e) {
      console.log(e);
    }
  };

  const openProfile = async (e) => {
    router.push("/admin/SettingProfile");
  };

  return (
    <>
     <Modal show={showModal} statusModal={'Sukses'} 
        messageModal={'ANJING'} onClose={null}></Modal>
      {/* <Loading open={loading}></Loading> */}
      <a
        className="text-blueGray-500 py-1 px-3"
        href=""
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          openDropdownPopover();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fa-solid fa-users"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href=""
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => setShowModal(true)}
        >
          Profile
        </a>
        <a
          href=""
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => setShowModal(true)}
        >
          Profile
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href=""
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-[#F15A2A]"
          }
          onClick={(e) => doLogout(e)}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
