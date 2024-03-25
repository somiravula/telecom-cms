"use server";

import fs from 'fs';

import { revalidatePath } from "next/cache";

function createData(id: string, name: string, cost: string, validity: string, status: boolean) {
    return { id, name, cost, validity, status };
  }
  
  export type Plan = ReturnType<typeof createData>;
  
  const plans: Plan[] = [
    createData('plan_1', 'Platinum365', 'Rs.499/-', '365 Days', true),
    createData('plan_2', 'Gold180', 'Rs.299/-', '180 Days', true),
    createData('plan_3', 'Silver90', 'Rs.199/-', '90 Days', true),
  ];

type Store = {
    customers: {
        id: string,
        dob: string,
        registrationDate: string,
        name: string,
        email: string,
        mobile: string,
        aadhaar: string,
        currentPlanId?: string,
    }[],
}

export type ChangePlanRequest = {customerId: string, planId: string};


const fn = (d: any, keys: string[]) => {
    return keys.reduce((acc: any, i) => {
        acc[i] = d.get(i);
        return acc;
    }, {});
}

export type Customer = Store['customers'][number];

export type GetCustomersResponse = (Customer & {currentPlan?: Plan})[];

export async function getCustomers(): Promise<GetCustomersResponse> {
    const d = await fs.promises.readFile('./db.json', 'utf8');
    const x = d ? (JSON.parse(d) as Store) : {customers: []};
    return x.customers.map(i => {
        const obj: GetCustomersResponse[number] = {...i};
        if (i.currentPlanId) {
            obj.currentPlan = plans.find(p => p.id === i.currentPlanId);
        }
        return obj;
    })
}

export async function getJsonStore(): Promise<Store> {
    const d = await fs.promises.readFile('./db.json', 'utf8');
    return d ? (JSON.parse(d) as Store) : {customers: []};
}

export async function registerCustomer(
  prevState: {},
  formData: FormData,
) {
    const data = fn(formData, ['dob', 'registrationDate', 'name', 'email', 'mobile', 'aadhaar',]) as Customer;
  
  try {
    const store = await getJsonStore();
    store.customers.push({...data, id: store.customers.length + ''});
    await fs.promises.writeFile('db.json', JSON.stringify(store));

    revalidatePath("");
    return { message: JSON.stringify(store), success: true };
  } catch (e) {
    return { message: "Failed to register customer", success: false };
  }
}

export async function changePlan(
    prevState: {},
    formData: FormData,
  ) {
      const reqBody = fn(formData, ['customerId', 'planId']) as ChangePlanRequest;
    
    try {
      const store = await getJsonStore();
      store.customers = store.customers.map(i => {
        if (i.id === reqBody.customerId) {
            return {...i, currentPlanId: reqBody.planId};
        } else {
            return i;
        }
      });
      await fs.promises.writeFile('db.json', JSON.stringify(store));
  
      revalidatePath("");
      return { message: 'Plan changed successfully', success: true };
    } catch (e) {
      return { message: "Failed to change the plan", success: false };
    }
  }
