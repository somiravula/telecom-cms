"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registerCustomer } from "@/app/actions";

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" disabled={pending} variant="contained">Register</Button>
  );
}

export function RegisterForm({cancelHandler}: {cancelHandler: () => void}) {
  const [state, formAction] = useFormState(registerCustomer, initialState);
  const { pending } = useFormStatus();

  return (
    <form className="register" action={formAction}>
        <h2>Register</h2>

            <TextField id="outlined-basic" name="name" label="Full Name" variant="outlined"/>
        
            <TextField id="outlined-basic" name="email" label="Email" variant="outlined" />
        
            <TextField id="outlined-basic"  name="mobile" label="Mobile Number" variant="outlined" />
        
            <TextField id="outlined-basic"  name="aadhaar" label="Aadhar Number" variant="outlined"/>
        
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date Of Birth"  name="dob" disableFuture />
            </LocalizationProvider>
        
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Registration Date"  name="registrationDate" disableFuture/>
            </LocalizationProvider>

            <SubmitButton />

            <Button type="button" disabled={pending} variant="outlined" onClick={cancelHandler}>Cancel</Button>
    </form>
  );
}