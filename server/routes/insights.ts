import express from 'express';
import { z } from 'zod';
import { protect } from '../middleware/auth';
import { prisma } from '../db/client';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

const createInsightSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.enum(['BUSINESS', 'MARKETING', 'OPERATIONS']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'])
});

router.use(protect);

router.post('/', async (req, res, next) => {
  try {
    const data = createInsightSchema.parse(req.body);
    const insight = await prisma.insight.create({
      data: {
        ...data,
        userId: req.userId!
      }
    });
    res.status(201).json(insight);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const insights = await prisma.insight.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(insights);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const insight = await prisma.insight.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!insight) {
      throw new AppError('Insight not found', 404);
    }

    res.json(insight);
  } catch (error) {
    next(error);
  }
});

export const insightsRouter = router;