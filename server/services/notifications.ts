import { prisma } from '../db/client';
import type { NotificationType } from '@prisma/client';

interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
}

export async function createNotification({
  userId,
  title,
  message,
  type
}: CreateNotificationParams) {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type
    }
  });
}