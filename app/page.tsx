
import { RegisterForm } from "@/app/register-form";
import { Customer, getCustomers } from "./actions";
import CustomersList from "./customers-list";
import RegisterButton from "./register-button";

export default async function Home() {
  const customers: Customer[] = (await getCustomers());

  return (
    <main>
      <div className="registerBar mb-1">
        <h1 className="sr-only">Customer Management System</h1>
        <RegisterButton />
      </div>
      {/* <AddForm /> */}
      <CustomersList customers={customers}/>
    </main>
  );
}