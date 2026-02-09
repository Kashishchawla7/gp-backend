import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dataStore } from '../data';
import { DashboardCustomer } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(dataStore.dashboardCustomers);
});

router.get('/:id', (req, res) => {
  const customer = dataStore.dashboardCustomers.find((c) => c.id === req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.post('/', (req, res) => {
  const customer: DashboardCustomer = {
    id: uuidv4(),
    customerName: req.body.customerName,
    vertical: req.body.vertical,
    liveSince: req.body.liveSince,
    csOwner: req.body.csOwner,
    adoptionStatus: req.body.adoptionStatus || 0,
    issuesStatus: req.body.issuesStatus || 0,
    usageStatus: req.body.usageStatus || 0,
    crStatus: req.body.crStatus || 0,
    paymentStatus: req.body.paymentStatus || 0,
  };
  dataStore.dashboardCustomers.push(customer);
  res.status(201).json(customer);
});

router.put('/:id', (req, res) => {
  const index = dataStore.dashboardCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.dashboardCustomers[index] = {
      ...dataStore.dashboardCustomers[index],
      ...req.body,
      id: req.params.id,
    };
    res.json(dataStore.dashboardCustomers[index]);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.delete('/:id', (req, res) => {
  const index = dataStore.dashboardCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.dashboardCustomers.splice(index, 1);
    res.json({ message: 'Customer deleted' });
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

export default router;
