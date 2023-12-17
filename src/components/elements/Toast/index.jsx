"use client";

import React from "react";
import toast from "react-hot-toast";
import { HiMiniXMark, HiCheckCircle, HiXCircle } from "react-icons/hi2";

/**
 * @typedef {Object} ToastComponentProps
 * @property {"success" | "error" | "loading"} type
 * @property {string} [message]
 * @property {Object} t
 */

/**
 * @param {ToastComponentProps} props
 */
export const ToastComponent = ({ type, message, t }) => {
  const isSuccess = type === "success";
  return (
    <div className="text-black flex flex-row items-center">
      <div
        className={`w-[17px] h-full ${
          isSuccess ? "bg-success" : "bg-error"
        } rounded-tl-[20px] rounded-bl-[20px] absolute top-0 left-0`}
      />
      {type === "success" ? (
        <HiCheckCircle className="w-11 h-11 fill-success" />
      ) : (
        <HiXCircle className="w-11 h-11 fill-error" />
      )}
      <div className="flex flex-col mx-2">
        <p className="font-bold text-lg-mobile md:text-lg-desktop">{type === "success" ? "Sukses" : "Error"}</p>
        <p>{message}</p>
      </div>
      <div
        className={"absolute top-2 right-2 cursor-pointer text-lg"}
        onClick={() => toast.dismiss(t.id)}
      >
        <HiMiniXMark />
      </div>
    </div>
  );
};

/**
 * @param {string} id
 */
export const useCustomToast = (id) => {
  const config = {
    id: id,
    position: "top-right",
    duration: 3000,
    style: {
      borderRadius: "20px",
      padding: "1rem",
    },
  };

  /**
   * @param {Object} options
   * @param {"success" | "error" | "loading"} options.type
   * @param {string} [options.message]
   */
  const showToast = ({ type, message }) => {
    if (type === "loading") {
      toast.loading("Loading . . .", config);
    } else {
      toast(
        (t) => <ToastComponent type={type} message={message} t={t} />,
        config
      );
    }
  };

  return { showToast };
};