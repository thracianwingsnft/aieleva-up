import express from 'express';
import { z } from 'zod';
import { protect } from '../middleware/auth';
import { createCheckoutSession, handleSubscriptionChange } from '../services/stripe';
import { createNotification } from '../services/notifications';
import { AppError } from '../middleware/errorHandler';
import Stripe from 'stripe';

const router = express.Router();

const createCheckoutSchema = z.object({
  plan: z.enum(['PRO', 'ENTERPRISE'])
});

router.use(protect);

router.post('/create-checkout', async (req, res, next) => {
  try {
    const { plan } = createCheckoutSchema.parse(req.body);
    
    const session = await createCheckoutSession(req.userId!, plan);
    
    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16'
    });
    
    const signature = req.headers['stripe-signature']!;
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'customer.subscription.updated' || 
        event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(subscription);

      if (subscription.status === 'active') {
        await createNotification({
          userId: subscription.metadata.userId,
          title: 'Subscription Updated',
          message: `Your subscription has been updated to ${subscription.metadata.plan}`,
          type: 'SUCCESS'
        });
      }
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
});

export const billingRouter = router;