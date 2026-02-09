import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dataStore } from '../data';
import { CRCustomer } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(dataStore.crCustomers);
});

router.get('/:id', (req, res) => {
  const customer = dataStore.crCustomers.find((c) => c.id === req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.post('/', (req, res) => {
  const customer: CRCustomer = {
    id: uuidv4(),
    customerName: req.body.customerName,
    openCRs: req.body.openCRs || 0,
    closedCRs: req.body.closedCRs || 0,
    repeatCRs: req.body.repeatCRs || 0,
  };
  dataStore.crCustomers.push(customer);
  res.status(201).json(customer);
});

router.put('/:id', (req, res) => {
  const index = dataStore.crCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.crCustomers[index] = {
      ...dataStore.crCustomers[index],
      ...req.body,
      id: req.params.id,
    };
    res.json(dataStore.crCustomers[index]);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.delete('/:id', (req, res) => {
  const index = dataStore.crCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.crCustomers.splice(index, 1);
    res.json({ message: 'Customer deleted' });
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

export default router;
