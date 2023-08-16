"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Customer } from "@/app/model/customer";
import Link from "next/link";

const ViewCustomer = () => {
  const params = useParams();
  const [customer, setCustomer] = useState<Customer>();
  const getCustomer = async () => {
    try {
      console.log(params.id);
      const response = await fetch(
        `https://customer-api-9a8z.onrender.com/api/${params.id}`
      );
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCustomer();
  }, []);

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
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ViewCustomer;
