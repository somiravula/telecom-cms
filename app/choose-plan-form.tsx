'use client'
import { useFormState, useFormStatus } from 'react-dom';
import { ChangePlanRequest, changePlan } from './actions';
import Button from '@mui/material/Button';


export default function ChoosePlanForm({customerId, planId}: ChangePlanRequest) {
    const [state, formAction] = useFormState(changePlan, {message: '', success: false});
    const { pending } = useFormStatus();
  
    return (
      <form action={formAction}>
        <input type="hidden" name="customerId" value={customerId} />
        <input type="hidden" name="planId" value={planId} />
        <Button aria-disabled={pending} type="submit" disabled={pending} variant="contained">SEELCT</Button>
      </form>
    );
  }