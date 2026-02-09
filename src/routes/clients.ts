import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dataStore } from '../data';
import { Client } from '../types';

const router = express.Router();

// Get all clients
router.get('/', (req, res) => {
  res.json(dataStore.clients);
});

// Get client by ID
router.get('/:id', (req, res) => {
  const client = dataStore.clients.find((c) => c.id === req.params.id);
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ error: 'Client not found' });
  }
});

// Create client
router.post('/', (req, res) => {
  const client: Client = {
    id: uuidv4(),
    companyName: req.body.companyName,
    contactPerson: req.body.contactPerson,
    email: req.body.email,
    adoptionRate: req.body.adoptionRate || 50,
    usageFrequency: req.body.usageFrequency || 'weekly',
    openIssues: req.body.openIssues || 0,
    pendingCRs: req.body.pendingCRs || 0,
    paymentStatus: req.body.paymentStatus || 'current',
    healthScore: req.body.healthScore || 75,
    createdAt: new Date().toISOString(),
  };

  dataStore.clients.push(client);
  res.status(201).json(client);
});

// Update client
router.put('/:id', (req, res) => {
  const index = dataStore.clients.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.clients[index] = {
      ...dataStore.clients[index],
      ...req.body,
      id: req.params.id, // Ensure ID doesn't change
    };
    res.json(dataStore.clients[index]);
  } else {
    res.status(404).json({ error: 'Client not found' });
  }
});

// Delete client
router.delete('/:id', (req, res) => {
  const index = dataStore.clients.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    dataStore.clients.splice(index, 1);
    res.json({ message: 'Client deleted' });
  } else {
    res.status(404).json({ error: 'Client not found' });
  }
});

export default router;
