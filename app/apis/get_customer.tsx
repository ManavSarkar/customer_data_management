import { Customer } from "./../model/customer";

async function getAllCustomers(): Promise<Customer[]> {
  const response = await fetch("https://customer-api-9a8z.onrender.com/api/");
  const data = await response.json();

  var customers: Customer[] = [];
  data.forEach((customer: Customer) => {
    customers.push(customer);
  });

  return customers;
}

module.exports = {
  getAllCustomers,
};
