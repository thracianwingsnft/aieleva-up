import express from 'express';
import { z } from 'zod';
import { protect } from '../middleware/auth';
import { generateInsight } from '../services/openai';
import { createNotification } from '../services/notifications';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

const generateInsightSchema = z.object({
  businessContext: z.string().optional()
});

router.use(protect);

router.post('/generate-insight', async (req, res, next) => {
  try {
    const { businessContext } = generateInsightSchema.parse(req.body);
    
    const insight = await generateInsight({
      userId: req.userId!,
      businessContext
    });

    await createNotification({
      userId: req.userId!,
      title: 'New AI Insight Generated',
      message: `Check out your new insight: ${insight.title}`,
      type: 'INFO'
    });

    res.status(201).json(insight);
  } catch (error) {
    next(error);
  }
});

export const aiRouter = router;