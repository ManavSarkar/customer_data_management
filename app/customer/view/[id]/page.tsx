"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Customer } from "@/app/model/customer";
import Link from "next/link";

const ViewCustomer = () => {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>();
  const [loading, setLoading] = useState(true);
  const getCustomer = async () => {
    try {
      console.log(params.id);
      const response = await fetch(
        `https://customer-api-9a8z.onrender.com/api/${params.id}`
      );
      const data = await response.json();
      setCustomer(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://customer-api-9a8z.onrender.com/api/${params.id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      if (response.status == 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCustomer();
  }, []);

  if (loading) {
    return (
      <div>
        <div
          className="flex justify-center items-center"
          style={{ height: "80vh" }}
        >
          <div className="loader ease-linear rounded-3xl border-8 border-t-8 border-gray-200 h-32 w-32 animate-spin"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-4xl text-center">View Customer</h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-1/2 p-2">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-center"></div>
            <div className="text-center">
              <h2 className="text-xl font-bold">{customer?.name}</h2>
              <p className="text-md">{customer?.email}</p>
              <p className="text-lg">{customer?.phone}</p>
              <p className="text-lg">{customer?.address}</p>
            </div>
          </div>
        </div>
      </div>
      {/* edit and delete button */}
      <div className="flex justify-evenly">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href={`/customer/update/${customer?.id}`}
        >
          Edit
        </Link>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            var dialog: HTMLDialogElement = document.getElementById(
              "my_modal_1"
            ) as HTMLDialogElement;
            dialog.showModal();
          }}
        >
          Delete
        </button>

        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Are you sure, you want to delete this customer?
            </p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ViewCustomer;
