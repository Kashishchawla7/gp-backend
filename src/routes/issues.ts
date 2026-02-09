import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dataStore } from '../data';
import { IssueCustomer } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(dataStore.issueCustomers);
});

router.get('/:id', (req, res) => {
  const customer = dataStore.issueCustomers.find((c) => c.id === req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.post('/', (req, res) => {
  const customer: IssueCustomer = {
    id: uuidv4(),
    customerName: req.body.customerName,
    openTickets: req.body.openTickets || 0,
    closedTickets: req.body.closedTickets || 0,
    repeatIssues: req.body.repeatIssues || 0,
  };
  dataStore.issueCustomers.push(customer);
  res.status(201).json(customer);
});

router.put('/:id', (req, res) => {
  const index = dataStore.issueCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.issueCustomers[index] = {
      ...dataStore.issueCustomers[index],
      ...req.body,
      id: req.params.id,
    };
    res.json(dataStore.issueCustomers[index]);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.delete('/:id', (req, res) => {
  const index = dataStore.issueCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.issueCustomers.splice(index, 1);
    res.json({ message: 'Customer deleted' });
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

export default router;
