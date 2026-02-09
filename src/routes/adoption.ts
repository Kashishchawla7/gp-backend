import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dataStore } from '../data';
import { AdoptionCustomer } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(dataStore.adoptionCustomers);
});

router.get('/:id', (req, res) => {
  const customer = dataStore.adoptionCustomers.find((c) => c.id === req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.post('/', (req, res) => {
  const customer: AdoptionCustomer = {
    id: uuidv4(),
    customerName: req.body.customerName,
    planned: req.body.planned || 0,
    soldModules: req.body.soldModules || 0,
    liveModules: req.body.liveModules || 0,
    activelyUsed: req.body.activelyUsed || 'N',
  };
  dataStore.adoptionCustomers.push(customer);
  res.status(201).json(customer);
});

router.put('/:id', (req, res) => {
  const index = dataStore.adoptionCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.adoptionCustomers[index] = {
      ...dataStore.adoptionCustomers[index],
      ...req.body,
      id: req.params.id,
    };
    res.json(dataStore.adoptionCustomers[index]);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.delete('/:id', (req, res) => {
  const index = dataStore.adoptionCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.adoptionCustomers.splice(index, 1);
    res.json({ message: 'Customer deleted' });
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

export default router;
