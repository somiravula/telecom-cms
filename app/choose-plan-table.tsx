'use client'

import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


import ChoosePlanForm from './choose-plan-form';

function createData(id: string, name: string, cost: string, validity: string, status: boolean) {
  return { id, name, cost, validity, status };
}

export type Plan = ReturnType<typeof createData>;

const rows = [
  createData('plan_1', 'Platinum365', 'Rs.499/-', '365 Days', true),
  createData('plan_2', 'Gold180', 'Rs.299/-', '180 Days', true),
  createData('plan_3', 'Silver90', 'Rs.199/-', '90 Days', true),
];

export default function ChoosePlanTable({customerId}: {customerId: string}) {
  
  return (
    <>
    <Typography id="transition-modal-title" variant="h6" component="h2">
        Available Plans
      </Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Plan Name</TableCell>
            <TableCell align="right">Plan Cost</TableCell>
            <TableCell align="right">Validity</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.cost}</TableCell>
              <TableCell align="right">{row.validity}</TableCell>
              <TableCell align="right">
                <ChoosePlanForm customerId={customerId} planId={row.id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}