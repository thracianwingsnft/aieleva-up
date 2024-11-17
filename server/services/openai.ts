import OpenAI from 'openai';
import { prisma } from '../db/client';
import type { Category, Priority } from '@prisma/client';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface GenerateInsightParams {
  userId: string;
  businessContext?: string;
}

export async function generateInsight({ userId, businessContext }: GenerateInsightParams) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true }
  });

  const prompt = `Generate a business insight for a ${user?.plan.toLowerCase()} tier user.
    ${businessContext ? `Context: ${businessContext}` : ''}
    Format the response as JSON with the following structure:
    {
      "title": "Brief, actionable title",
      "description": "Detailed explanation (2-3 sentences)",
      "category": "BUSINESS|MARKETING|OPERATIONS",
      "priority": "LOW|MEDIUM|HIGH"
    }`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
  });

  const response = JSON.parse(completion.choices[0].message.content!) as {
    title: string;
    description: string;
    category: Category;
    priority: Priority;
  };

  const insight = await prisma.insight.create({
    data: {
      ...response,
      userId
    }
  });

  return insight;
}