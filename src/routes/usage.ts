import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dataStore } from '../data';
import { UsageCustomer } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(dataStore.usageCustomers);
});

router.get('/:id', (req, res) => {
  const customer = dataStore.usageCustomers.find((c) => c.id === req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.post('/', (req, res) => {
  const customer: UsageCustomer = {
    id: uuidv4(),
    customerName: req.body.customerName,
    totalUsers: req.body.totalUsers || 0,
    activeUsers: req.body.activeUsers || 0,
    transactionsPct: req.body.transactionsPct || 0,
    loginFrequency: req.body.loginFrequency || 'Monthly',
  };
  dataStore.usageCustomers.push(customer);
  res.status(201).json(customer);
});

router.put('/:id', (req, res) => {
  const index = dataStore.usageCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.usageCustomers[index] = {
      ...dataStore.usageCustomers[index],
      ...req.body,
      id: req.params.id,
    };
    res.json(dataStore.usageCustomers[index]);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.delete('/:id', (req, res) => {
  const index = dataStore.usageCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.usageCustomers.splice(index, 1);
    res.json({ message: 'Customer deleted' });
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

export default router;
