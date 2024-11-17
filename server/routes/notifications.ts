import express from 'express';
import { protect } from '../middleware/auth';
import { prisma } from '../db/client';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

router.use(protect);

router.get('/', async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/read', async (req, res, next) => {
  try {
    const notification = await prisma.notification.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!notification) {
      throw new AppError('Notification not found', 404);
    }

    const updated = await prisma.notification.update({
      where: { id: req.params.id },
      data: { read: true }
    });
    
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

export const notificationsRouter = router;