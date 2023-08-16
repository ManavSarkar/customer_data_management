"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Customer } from "./model/customer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { get } from "http";
export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const router = useRouter();
  // get all customers from backend
  const getAllCustomers = async () => {
    try {
      const response = await fetch(
        "https://customer-api-9a8z.onrender.com/api/"
      );
      const data = await response.json();
      let customers = [];
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        customers.push(data[i]);
      }
      setCustomers(customers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `https://customer-api-9a8z.onrender.com/api/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      if (response.status == 200) {
        getAllCustomers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <div className="mt-5">
      <div className="flex flex-wrap justify-center">
        {customers.map((customer) => (
          <div>
            <Link href={`/customer/view/${customer.id}`}>
              <div className="w-96 p-2">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-center"></div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{customer.name}</h2>
                    <p className="text-sm">{customer.email}</p>
                    <p className="text-sm">{customer.phone}</p>
                    <p className="text-sm">{customer.address}</p>
                  </div>
                </div>
              </div>
            </Link>
            {/* update and delete button */}
            <div className="flex justify-evenly"></div>
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
                        handleDelete(customer.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
