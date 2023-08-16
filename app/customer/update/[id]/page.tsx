"use client";
import { Customer } from "@/app/model/customer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import React, { useEffect, useState } from "react";

const UpdateCustomer = () => {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const getCustomer = async () => {
    try {
      console.log(params.id);
      const response = await fetch(
        `https://customer-api-9a8z.onrender.com/api/${params.id}`
      );
      const data = await response.json();
      setCustomer(data);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
    } catch (error) {
      console.log(error);
    }
  };
  const updateData = async (e: any) => {
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
      const response = await fetch(
        `https://customer-api-9a8z.onrender.com/api/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
      if (response.status == 200) {
        router.push("/customer/view/" + params.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center">Update Customer</h1>
      <div className="flex justify-center">
        {/* form  */}
        <form className="w-full max-w-lg" onSubmit={updateData}>
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
              />
              <p className="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>

          {/* submit */}
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </div>
        </form>
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
      </div>
    </div>
  );
};

export default UpdateCustomer;
