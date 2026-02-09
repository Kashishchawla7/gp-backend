import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dataStore } from '../data';
import { PaymentCustomer } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(dataStore.paymentCustomers);
});

router.get('/:id', (req, res) => {
  const customer = dataStore.paymentCustomers.find((c) => c.id === req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.post('/', (req, res) => {
  const customer: PaymentCustomer = {
    id: uuidv4(),
    customerName: req.body.customerName,
    invoiceNo: req.body.invoiceNo,
    invoiceDate: req.body.invoiceDate,
    invoiceType: req.body.invoiceType,
    invoiceAmount: req.body.invoiceAmount,
    invoiceAmountINR: req.body.invoiceAmountINR,
    dueDate: req.body.dueDate,
    paymentStatus: req.body.paymentStatus || 'Pending',
    overallScore: 100,
  };
  dataStore.paymentCustomers.push(customer);
  res.status(201).json(customer);
});

router.put('/:id', (req, res) => {
  const index = dataStore.paymentCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.paymentCustomers[index] = {
      ...dataStore.paymentCustomers[index],
      ...req.body,
      id: req.params.id,
    };
    res.json(dataStore.paymentCustomers[index]);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

router.delete('/:id', (req, res) => {
  const index = dataStore.paymentCustomers.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.paymentCustomers.splice(index, 1);
    res.json({ message: 'Customer deleted' });
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

export default router;
