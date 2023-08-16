"use client";
import { Customer } from "@/app/model/customer";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

const CreateCustomer = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const createCustomer = async (e: any) => {
    e.preventDefault();
    if (!isValidPhoneNumber(phone)) {
      var dialog: HTMLDialogElement = document.getElementById(
        "my_modal_1"
      ) as HTMLDialogElement;
      dialog.showModal();
      return;
    }
    try {
      const body = {
        name: name,
        email: email,
        phone: phone,
        address: address,
      };
      const response = await fetch(`http://localhost:5000/api/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      var customer: Customer = await response.json();

      if (response.status == 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-4xl text-center">Create Customer</h1>
      <div className="flex justify-center">
        {/* form  */}
        <form className="w-full max-w-lg" onSubmit={createCustomer}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-name"
              >
                Name
              </label>
              <input
                value={name}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-name"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                value={email}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-phone"
              >
                Phone
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => {
                  if (e) {
                    setPhone(e.toString());
                  }
                }}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-address"
              >
                Address
              </label>
              <input
                value={address}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-address"
                type="text"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
              <p className="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>

          {/* submit */}
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          </div>

          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Hey!</h3>
              <p className="py-4">Invalid phone number</p>
              <div className="modal-action">
                <button className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Close
                </button>
              </div>
            </form>
          </dialog>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;
