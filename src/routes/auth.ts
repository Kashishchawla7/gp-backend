import express from 'express';
import { dataStore } from '../data';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = dataStore.users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true, username: user.username });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router;
