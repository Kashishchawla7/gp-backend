import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeDefaultData } from './data';
import authRoutes from './routes/auth';
import clientRoutes from './routes/clients';
import adoptionRoutes from './routes/adoption';
import usageRoutes from './routes/usage';
import issueRoutes from './routes/issues';
import crRoutes from './routes/cr';
import paymentRoutes from './routes/payment';
import dashboardRoutes from './routes/dashboard';
import ticketRoutes from './routes/tickets';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize default data
initializeDefaultData();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/adoption', adoptionRoutes);
app.use('/api/usage', usageRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/cr', crRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tickets', ticketRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BlueKaktus API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BlueKaktus Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
