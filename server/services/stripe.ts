import Stripe from 'stripe';
import { Plan } from '@prisma/client';
import { prisma } from '../db/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

const PLAN_PRICES = {
  PRO: process.env.STRIPE_PRO_PRICE_ID,
  ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID
} as const;

export async function createCheckoutSession(userId: string, plan: Plan) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const priceId = PLAN_PRICES[plan as keyof typeof PLAN_PRICES];
  
  if (!priceId) {
    throw new Error('Invalid plan selected');
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.FRONTEND_URL}/settings/billing?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/settings/billing?canceled=true`,
    metadata: {
      userId,
      plan
    }
  });

  return session;
}

export async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId;
  const status = subscription.status;

  if (status === 'active') {
    await prisma.user.update({
      where: { id: userId },
      data: { plan: subscription.metadata.plan as Plan }
    });
  } else if (status === 'canceled' || status === 'unpaid') {
    await prisma.user.update({
      where: { id: userId },
      data: { plan: 'FREE' }
    });
  }
}