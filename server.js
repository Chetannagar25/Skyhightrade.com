import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Backend is running' });
});

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount = 499900, currency = 'INR', receipt = `rcpt_${Date.now()}` } = req.body || {};
    const order = await razorpay.orders.create({ amount, currency, receipt });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create order' });
  }
});

app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
    const verified = expected === razorpay_signature;
    res.json({ verified });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Verification failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
