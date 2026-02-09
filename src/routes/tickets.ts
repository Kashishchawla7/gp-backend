import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dataStore } from '../data';
import { Ticket } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  const { clientName } = req.query;
  let tickets = dataStore.tickets;

  if (clientName) {
    tickets = tickets.filter((t) => t.clientName === clientName);
  }

  res.json(tickets);
});

router.get('/:id', (req, res) => {
  const ticket = dataStore.tickets.find((t) => t.id === req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).json({ error: 'Ticket not found' });
  }
});

router.post('/', (req, res) => {
  const ticket: Ticket = {
    id: uuidv4(),
    ticketNo: req.body.ticketNo,
    reportDate: req.body.reportDate,
    ticketType: req.body.ticketType,
    module: req.body.module,
    ticketPriority: req.body.ticketPriority,
    callDesc: req.body.callDesc,
    clientName: req.body.clientName,
    ticketStatus: req.body.ticketStatus || 'Open',
    entryBy: req.body.entryBy,
    currOwner: req.body.currOwner,
    targetDate: req.body.targetDate,
    clientTargetDate: req.body.clientTargetDate,
    entryDate: req.body.entryDate || new Date().toISOString(),
  };
  dataStore.tickets.push(ticket);
  res.status(201).json(ticket);
});

router.put('/:id', (req, res) => {
  const index = dataStore.tickets.findIndex((t) => t.id === req.params.id);
  if (index !== -1) {
    dataStore.tickets[index] = {
      ...dataStore.tickets[index],
      ...req.body,
      id: req.params.id,
    };
    res.json(dataStore.tickets[index]);
  } else {
    res.status(404).json({ error: 'Ticket not found' });
  }
});

router.delete('/:id', (req, res) => {
  const index = dataStore.tickets.findIndex((t) => t.id === req.params.id);
  if (index !== -1) {
    dataStore.tickets.splice(index, 1);
    res.json({ message: 'Ticket deleted' });
  } else {
    res.status(404).json({ error: 'Ticket not found' });
  }
});

export default router;
