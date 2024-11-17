export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  plan: 'free' | 'pro' | 'enterprise';
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'business' | 'marketing' | 'operations';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  features: string[];
  recommended?: boolean;
}